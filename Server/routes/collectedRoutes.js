const express = require('express');
const multer = require('multer');
const CollectedItem = require('../models/CollectedItem');
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

router.post(
  '/collectedItem',
  foundItemUpload.single('itemImage'),
  async (req, res) => {
    console.log('req=', req.body);
    try {
      if (req.file) {
        const reqitemImage = req.file.filename;
      }

      const userCollectedItem = {
        description: req.body.description,
        date: req.body.date,
        category: req.body.category,
        subcategory: req.body.subcategory,
        itemName: req.body.itemName,
        place: req.body.place,
        ownerName: req.body.ownerName,
        details: req.body.details,
        isIdentifiable: req.body.isIdentifiable,
        itemImage: req.body.itemImage,
        details: req.body.details,
        name: req.body.name,
        email: req.body.email,
        sapId: req.body.sapId,
        branch: req.body.branch,
        year: req.body.year,
        contactNumber: req.body.contactNumber,
        user: req.user.id, // Use req.user.id from JWT
      };
      const receivedItem = await CollectedItem.create(userCollectedItem);

      return res.sendStatus(200);

      // const userCollectedItem = await new CollectedItem ({
      //   description: req.body.description,
      //   date: req.body.date,
      //   category: req.body.category,
      //   subcategory: req.body.subcategory,
      //   itemName: req.body.itemName,
      //   place: req.body.place,
      //   ownerName: req.body.ownerName,
      //   details: req.body.details,
      //   isIdentifiable: req.body.isIdentifiable,
      //   itemImage: req.body.itemImage,
      //   details: req.body.details,
      //   name: req.body.name,
      //   email: req.body.email,
      //   sapId: req.body.sapId,
      //   branch: req.body.branch,
      //   year: req.body.year,
      //   contactNumber: req.body.contactNumber,
      //   user: req.user.id, // Use req.user.id from JWT
      // }).save();
      // res.status(201).json(userCollectedItem);
    } catch (error) {
      console.error('Error submitting found item form:', error);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
