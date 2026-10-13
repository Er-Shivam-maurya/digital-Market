const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json({ rfqs: [] }));
module.exports = router;
