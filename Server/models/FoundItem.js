 const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  itemName: { type: String, required: true },
  place: { type: String, required: true },
  ownerName: { type: String, required: true },
  details: { type: String, required: true },
  isIdentifiable: { type: Boolean, required: true },
  itemImage: { type: String, required: true },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('FoundItem', foundItemSchema);
