const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
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
  }]
});

const FormDataModel = mongoose.model('User', FormDataSchema);

module.exports = FormDataModel;