const express = require('express');
const Collected = require('../models/CollectedItem');
// const { authenticateToken, isAdmin } = require('../middleware/authMiddleware'); // Update middleware imports
const router = express.Router();

// GET all collected items
router.get('/admincollected', async (req, res) => {
  try {
    const collectedItems = await Collected.find({});
    res.json(collectedItems);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET all collected items
router.get('/:id', async (req, res) => {
  try {
    const collectedItems = await Collected.findById(req.params.id);
    res.json(collectedItems);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT update a collected item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Collected.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE a collected item
router.delete('/:id', async (req, res) => {
  try {
    await Collected.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
