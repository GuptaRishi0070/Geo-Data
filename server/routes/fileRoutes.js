const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const authenticate = require('../middleware/authenticate'); 

router.post('/upload', authenticate, fileController.uploadFile);

module.exports = router;
