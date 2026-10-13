const express = require('express');
const { seedDatabase } = require('../utils/seedData');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const result = await seedDatabase();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Seeding failed', error: error.message });
  }
});

module.exports = router;
