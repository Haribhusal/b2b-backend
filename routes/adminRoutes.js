const express = require('express');
const { registerAdmin, authAdmin } = require('../controllers/adminController');
const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', authAdmin);

// Add other admin-related routes here

module.exports = router;
