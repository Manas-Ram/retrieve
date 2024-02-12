 const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    date: { type: String, required: true },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    sapId: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    itemName: { type: String, required: true },
    itemImage: { type: String, required: true },
    place: { type: String, required: true },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  }
  //   { collection: foundItemCollectionName }
);

module.exports = mongoose.model('LostItem', lostItemSchema);
