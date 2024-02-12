const express = require('express');
const User = require('../models/User');
// const {
//   authenticateToken,
//   isLoggedIn,
// } = require('../middleware/authMiddleware'); // Update middleware imports
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newUser = {
      username: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
    const createdUser = await User.create(newUser);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error submitting lost item form:', error);
    res.sendStatus(500).send({ message: error.message });
  }
});

router.get('/adminuser', async (req, res) => {
  // Existing logic remains the same
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//get singleid
router.get('/:id', async (req, res) => {
  // Existing logic remains the same

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//PUT Update a User (Admin Only)
router.put('/:id', async (req, res) => {
  // Existing logic remains the same
  const updates = req.body; // Consider validating and sanitizing this input
  try {
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  // Existing logic remains the same
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
