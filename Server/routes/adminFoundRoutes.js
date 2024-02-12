const express = require('express');
const Found = require('../models/FoundItem');
const multer = require('multer');
// const { authenticateToken, isAdmin } = require('../middleware/authMiddleware'); // Update middleware imports
const router = express.Router();

// Set up multer storage configuration for found items
const foundItemStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './foundItemImages');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname);
  },
});

// Set up multer upload configuration for found items
const foundItemUpload = multer({ storage: foundItemStorage });

// Define the route to handle found item form submission with image upload
router.post(
  '/submitFoundItem',
  foundItemUpload.single('itemImage'),
  async (req, res) => {
    console.log('req=', req.body);
    try {
      let reqitemImage = null;

      if (req.file) {
        reqitemImage = req.file.filename;
      }

      const newFoundItem = {
        description: req.bodydescription,
        date: req.body.date,
        category: req.body.category,
        subcategory: req.body.subcategory,
        itemName: req.body.itemName,
        place: req.body.place,
        ownerName: req.body.ownerName,
        details: req.body.details,
        isIdentifiable: req.body.isIdentifiable,
        itemImage: reqitemImage,
        user: req.user.id, // Use req.user.id from JWT
      };
      const foundItem = await Found.create(newFoundItem);

      return res.sendStatus(200);
    } catch (error) {
      console.error('Error submitting found item form:', error);
      res.sendStatus(500).send({ messsage: error.messsage });
    }
  }
);
// GET all found items
router.get('/adminfound', async (req, res) => {
  try {
    const foundItems = await Found.find({});
    res.json(foundItems);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET all found items
router.get('/:id', async (req, res) => {
  try {
    const foundItems = await Found.findById(req.params.id);
    res.json(foundItems);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT update a found item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Found.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE a found item
router.delete('/:id', async (req, res) => {
  try {
    await Found.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
