const express = require('express');
const { uploadFile } = require('../controllers/uploadController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/file', authenticate, uploadFile);

module.exports = router;