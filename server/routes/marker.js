const express = require('express');
const { addMarker, deleteMarker, getMarkers } = require('../controllers/markerController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, addMarker);
router.delete('/:id', authenticate, deleteMarker);
router.get('/', authenticate, getMarkers);

module.exports = router;