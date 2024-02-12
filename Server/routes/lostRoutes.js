const express = require('express');
const LostItem = require('../models/LostItem');
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
  '/submitLostItem',
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

// fetch lost items
router.get('/getLostItems', async (req, res) => {
  try {
    let items = await LostItem.find();
    res.json(items);
  } catch (error) {
    console.log('error', error);
  }
});

router.delete('/deleteLostItems/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await LostItem.findByIdAndDelete(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.status(200);
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
});

module.exports = router;
