const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  actions: [{
    type: String,
    timestamp: { type: Date, default: Date.now }
  }],
  uploadedFiles: [{
    filename: String,
    filepath: String,
    uploadDate: { type: Date, default: Date.now }
  }],
  markers: [{
    lng: Number,
    lat: Number,
    description: String,
    createdAt: { type: Date, default: Date.now }
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;