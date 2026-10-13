const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json({ deliveries: [] }));
module.exports = router;
