const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const taxRoutes = require('./routes/taxRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// API Routes
app.use('/api', taxRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Tax Optimization Calculator API',
        version: '1.0.0',
        endpoints: {
            calculate: 'POST /api/calculate',
            history: 'GET /api/history',
            health: 'GET /api/health'
        }
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API available at http://localhost:${PORT}`);
});
