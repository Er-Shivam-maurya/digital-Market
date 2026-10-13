const express = require('express');
const router = express.Router();
router.get('/recommend', (req, res) => res.json({ recommendations: [] }));
module.exports = router;
