const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../middleware/auth');

// GET /api/student/profile  — own profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT s.student_id, s.student_number, s.full_name, s.email,
              s.contact_number, s.address, s.year_level, s.status,
              c.course_name, c.course_code
       FROM students s
       LEFT JOIN courses c ON s.course_id = c.course_id
       WHERE s.student_id = ?`,
      [req.user.student_id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Student not found.' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/student/grades
router.get('/grades', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT sub.subject_code, sub.subject_name, sub.units,
              g.midterm, g.finals, g.final_grade, g.remarks,
              e.semester, e.school_year
       FROM enrollments e
       JOIN subjects sub ON e.subject_id = sub.subject_id
       LEFT JOIN grades g ON g.enrollment_id = e.enrollment_id
       WHERE e.student_id = ?
       ORDER BY e.school_year DESC, e.semester DESC`,
      [req.user.student_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/student/enrollment
router.get('/enrollment', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT sub.subject_code, sub.subject_name, sub.units,
              e.schedule, e.room, e.instructor, e.semester, e.school_year
       FROM enrollments e
       JOIN subjects sub ON e.subject_id = sub.subject_id
       WHERE e.student_id = ?
       ORDER BY sub.subject_code`,
      [req.user.student_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/student/clearance
router.get('/clearance', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT d.department_name, cl.status, cl.cleared_by, cl.cleared_date,
              cl.semester, cl.school_year
       FROM clearances cl
       JOIN departments d ON cl.department_id = d.department_id
       WHERE cl.student_id = ?
       ORDER BY d.department_name`,
      [req.user.student_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/student/dashboard  — summary stats
router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    const sid = req.user.student_id;

    // Total units enrolled (latest school year)
    const [[{ total_units }]] = await db.query(
      `SELECT COALESCE(SUM(sub.units), 0) AS total_units
       FROM enrollments e
       JOIN subjects sub ON e.subject_id = sub.subject_id
       WHERE e.student_id = ?`,
      [sid]
    );

    // GWA
    const [[gwaRow]] = await db.query(
      `SELECT ROUND(SUM(CAST(g.final_grade AS DECIMAL(4,2)) * sub.units) / SUM(sub.units), 2) AS gwa
       FROM enrollments e
       JOIN subjects sub ON e.subject_id = sub.subject_id
       JOIN grades g     ON g.enrollment_id = e.enrollment_id
       WHERE e.student_id = ?`,
      [sid]
    );
    const gwa = gwaRow.gwa || 'N/A';

    // Pending document requests
    const [[{ pending_docs }]] = await db.query(
      `SELECT COUNT(*) AS pending_docs FROM document_requests
       WHERE student_id = ? AND status IN ('Pending','Processing')`,
      [sid]
    );

    // Clearance status
    const [[{ pending_clearance }]] = await db.query(
      `SELECT COUNT(*) AS pending_clearance FROM clearances
       WHERE student_id = ? AND status = 'Pending'`,
      [sid]
    );
    const clearance_status = pending_clearance === 0 ? 'CLEARED' : 'PENDING';

    // Activity feed — last 5 document requests as feed
    const [feed] = await db.query(
      `SELECT request_id, document_type, status, request_date
       FROM document_requests
       WHERE student_id = ?
       ORDER BY request_id DESC LIMIT 5`,
      [sid]
    );

    res.json({ total_units, gwa, pending_docs, clearance_status, feed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
