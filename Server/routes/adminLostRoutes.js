const express = require('express');
const Lost = require('../models/LostItem');
const multer = require('multer');
// const { authenticateToken, isAdmin } = require('../middleware/authMiddleware'); // Update middleware imports
const router = express.Router();

// Set up multer storage configuration for lost items
const lostItemStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './lostItemImages');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname);
  },
});

// Set up multer upload configuration for lost items
const lostItemUpload = multer({ storage: lostItemStorage });

// Define the route to handle lost item form submission with image upload
router.post(
  '/adminsubmitLost',
  lostItemUpload.single('itemImage'),
  async (req, res) => {
    try {
      let reqitemImage = null;

      if (req.file) {
        reqitemImage = req.file.filename;
      }

      const newLostItem = {
        description: req.body.description,
        date: req.body.date,
        phone: req.body.phone,
        name: req.body.name,
        sapId: req.body.sapId,
        category: req.body.category,
        subcategory: req.body.subcategory,
        itemName: req.body.itemName,
        itemImage: reqitemImage,
        place: req.body.place,
      };
      const lostItem = await LostItem.create(newLostItem);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error submitting lost item form:', error);
      res.sendStatus(500).send({ message: error.message });
    }
  }
);

// GET all lost items
router.get('/adminlost', async (req, res) => {
  try {
    const lostItems = await Lost.find({});
    res.json(lostItems);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET all lost items
router.get('/:id', async (req, res) => {
  try {
    const lostItems = await Lost.findById(req.params.id);
    res.json(lostItems);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT update a lost item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Lost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE a lost item
router.delete('/:id', async (req, res) => {
  try {
    await Lost.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
