const Calculation = require('../models/Calculation');
const { optimizeTaxDistribution } = require('../utils/taxCalculator');

/**
 * Calculate optimal tax distribution
 * @route POST /api/calculate
 */
exports.calculateTax = async (req, res) => {
    try {
        const { numEmployees, totalPay } = req.body;

        // Validation
        if (!numEmployees || !totalPay) {
            return res.status(400).json({
                error: 'Please provide both number of employees and total pay'
            });
        }

        if (numEmployees < 1) {
            return res.status(400).json({
                error: 'Number of employees must be at least 1'
            });
        }

        if (totalPay < 0) {
            return res.status(400).json({
                error: 'Total pay must be a positive number'
            });
        }

        // Calculate optimal distribution
        const result = optimizeTaxDistribution(numEmployees, totalPay);

        // Save to database
        try {
            const calculation = new Calculation({
                numEmployees,
                totalPay,
                result
            });

            await calculation.save();
        } catch (dbError) {
            console.log('Database save failed, returning results anyway:', dbError.message);
        }

        res.json(result);
    } catch (error) {
        console.error('Calculation error:', error);
        res.status(500).json({
            error: 'Server error during calculation. Please try again.'
        });
    }
};

/**
 * Get calculation history
 * @route GET /api/history
 */
exports.getHistory = async (req, res) => {
    try {
        const history = await Calculation.find()
            .sort({ createdAt: -1 })
            .limit(10);

        res.json(history);
    } catch (error) {
        console.error('History fetch error:', error);
        res.status(500).json({
            error: 'Server error fetching history'
        });
    }
};

/**
 * Health check endpoint
 * @route GET /api/health
 */
exports.healthCheck = (req, res) => {
    res.json({
        status: 'OK',
        message: 'Tax Calculator API is running',
        timestamp: new Date().toISOString()
    });
};
