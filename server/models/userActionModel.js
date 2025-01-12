const mongoose = require('mongoose');

const userActionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  actionType: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserAction', userActionSchema);
