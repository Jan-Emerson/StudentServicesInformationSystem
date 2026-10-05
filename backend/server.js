const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth',      require('./routes/authRoutes'));
app.use('/api/student',   require('./routes/studentRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));

// Health check
app.get('/api/ping', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`SSIS backend running at http://localhost:${PORT}`);
});
