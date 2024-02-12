const express = require('express');
const FoundItem = require('../models/FoundItem');
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
      const foundItem = await FoundItem.create(newFoundItem);

      return res.sendStatus(200);
    } catch (error) {
      console.error('Error submitting found item form:', error);
      res.sendStatus(500).send({ messsage: error.messsage });
    }
  }
);

// fetch all found items
router.get('/getAllItems', async (req, res) => {
  try {
    let items = await FoundItem.find({ user: req.user.id });
    res.json(items);
  } catch (error) {
    console.log('error', error);
  }
});

//claiming id(cannot do a  post ,has to be a  get request if you are using id)
router.get('/claimItem/:id',  async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await FoundItem.findById(itemId).populate('user');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(200).json(item);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//delete
router.delete('/delete/:id',  async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await FoundItem.findById(tutorialId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Implement additional authorization checks
    if (item.user.toString() !== req.user.id && req.user.role !== 'admin') {
      // If the user is neither the tutorial creator nor an admin, deny access
      return res
        .status(403)
        .send({ message: 'Unauthorized to delete this tutorial' });
    }

    await FoundItem.findByIdAndDelete(itemId);
    res.send({ message: 'Tutorial deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
});

module.exports = router;
