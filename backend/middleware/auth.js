const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'ssis_secret_key_2024';

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided.' });

  const token = authHeader.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: 'Malformed token.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

module.exports = { verifyToken, JWT_SECRET };
