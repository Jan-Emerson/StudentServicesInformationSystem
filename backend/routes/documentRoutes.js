const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../middleware/auth');

// Document type price list
const DOCUMENT_PRICES = {
  TOR:         150,
  COR:          50,
  COE:          50,
  COG:         200,
  DIPLOMA:     500,
  GOOD_MORAL:   50,
  HONORABLE:   100,
  CERT:        150,
};

// GET /api/documents  — own requests
router.get('/', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT request_id, document_type, quantity, amount, status,
              request_date, release_date, purpose, payment_method
       FROM document_requests
       WHERE student_id = ?
       ORDER BY request_id DESC`,
      [req.user.student_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/documents  — submit new request
router.post('/', verifyToken, async (req, res) => {
  const { document_type, quantity, purpose, payment_method } = req.body;

  if (!document_type || !quantity) {
    return res.status(400).json({ message: 'Document type and quantity are required.' });
  }

  const price = DOCUMENT_PRICES[document_type.toUpperCase()] ?? 0;
  const amount = price * Number(quantity);

  try {
    const [result] = await db.query(
      `INSERT INTO document_requests
         (student_id, document_type, quantity, purpose, payment_method, amount, status, request_date)
       VALUES (?, ?, ?, ?, ?, ?, 'Pending', CURDATE())`,
      [
        req.user.student_id,
        document_type.toUpperCase(),
        Number(quantity),
        purpose || '',
        payment_method || 'Cash',
        amount,
      ]
    );

    const [rows] = await db.query(
      'SELECT * FROM document_requests WHERE request_id = ?',
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/documents/types  — price list
router.get('/types', (req, res) => {
  const types = Object.entries(DOCUMENT_PRICES).map(([value, price]) => {
    const labels = {
      TOR:        'Transcript of Records',
      COR:        'Certificate of Registration',
      COE:        'Certificate of Enrollment',
      COG:        'Certificate of Graduation',
      DIPLOMA:    'Diploma',
      GOOD_MORAL: 'Good Moral Certificate',
      HONORABLE:  'Honorable Dismissal',
      CERT:       'Certification',
    };
    return { value, label: labels[value] || value, price };
  });
  res.json(types);
});

module.exports = router;
