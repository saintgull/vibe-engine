const express = require('express');
const router = express.Router();
const vibeController = require('../controllers/vibeController');
const auth = require('../middleware/auth'); // To be implemented

// Public routes
router.get('/', vibeController.getVibes);
router.get('/search', vibeController.searchVibes);
router.get('/:id', vibeController.getVibe);
router.get('/:id/similar', vibeController.getSimilarVibes);

// Protected routes - require authentication
router.post('/', auth, vibeController.createVibe);
router.put('/:id', auth, vibeController.updateVibe);
router.delete('/:id', auth, vibeController.deleteVibe);

module.exports = router;