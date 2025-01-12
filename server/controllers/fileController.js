const multer = require('multer');
const path = require('path');
const UploadedFile = require('../models/uploadedFileModel');
const UserAction = require('../models/userActionModel');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /geojson|kml|tiff|json/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype || extname) {
    return cb(null, true);
  }
  cb(new Error('File type not supported'));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

exports.uploadFile = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    const user = req.user;
    UploadedFile.create({
      userId: user._id,
      filename: req.file.filename,
      filepath: req.file.path
    }).then(uploadedFile => {
      UserAction.create({ userId: user._id, actionType: 'upload' });
      res.status(200).send({ message: 'File uploaded successfully', file: uploadedFile });
    }).catch(err => {
      res.status(500).send({ message: 'Error saving file information', error: err });
    });
  });
};
