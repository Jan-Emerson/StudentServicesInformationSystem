const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { JWT_SECRET } = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { student_number, password } = req.body;

  if (!student_number || !password) {
    return res.status(400).json({ message: 'Student number and password are required.' });
  }

  try {
    const [rows] = await db.query(
      `SELECT s.*, c.course_name, c.course_code
       FROM students s
       LEFT JOIN courses c ON s.course_id = c.course_id
       WHERE s.student_number = ?`,
      [student_number.trim()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid student number or password.' });
    }

    const student = rows[0];
    const match = await bcrypt.compare(password, student.password_hash);

    if (!match) {
      return res.status(401).json({ message: 'Invalid student number or password.' });
    }

    const payload = {
      student_id:     student.student_id,
      student_number: student.student_number,
      full_name:      student.full_name,
      course_name:    student.course_name,
      year_level:     student.year_level,
      email:          student.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

    return res.json({
      token,
      user: payload,
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

module.exports = router;
