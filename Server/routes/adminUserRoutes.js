const express = require('express');
const User = require('../models/User');
// const { authenticateToken } = require('../middleware/authMiddleware'); // Update middleware imports
const router = express.Router();

function isAdmin(req, res, next) {
  if (req.isAuthenticated()) return next();
  // res.status(401).send('Not authenticated');
  res.redirect('/admin');
}

router.post('/', async (req, res) => {
  try {
    const newUser = {
      name: req.body.name,
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

router.get('/', async (req, res) => {
  // Existing logic remains the same
  try {
    const users = await User.find({});
    console.log(users)
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

// const express = require('express');
// const router = express.Router();
// const passport = require('passport');

// // Register route (redirects to Google Sign-In)
// router.get('/register', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Callback route after successful Google Sign-In
// router.get('/register/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
//   // Successful authentication, redirect to user's profile or dashboard
//   res.redirect('/api/users/profile');
// });

// // Login route (redirects to Google Sign-In)
// router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Callback route after successful Google Sign-In
// router.get('/login/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
//   // Successful authentication, redirect to user's profile or dashboard
//   res.redirect('/api/users/profile');
// });

// // Profile route (protected, requires authentication)
// router.get('/profile', isAuthenticated, (req, res) => {
//   // Access user information through req.user
//   res.json({ user: req.user });
// });

// // Logout route
// router.get('/logout', (req, res) => {
//     req.logout(); // Passport.js function to log the user out
//     res.redirect('/'); // Redirect to the home page or wherever you want after logout
//   });

// module.exports = router;
