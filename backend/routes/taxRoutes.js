const express = require('express');
const router = express.Router();
const taxController = require('../controllers/taxController');

// POST /api/calculate - Calculate optimal tax distribution
router.post('/calculate', taxController.calculateTax);

// GET /api/history - Get calculation history
router.get('/history', taxController.getHistory);

// GET /api/health - Health check
router.get('/health', taxController.healthCheck);

module.exports = router;
