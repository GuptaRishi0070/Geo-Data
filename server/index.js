const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

console.log('Starting server...');


const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  console.log('Creating uploads directory...');
  fs.mkdirSync(uploadsDir);
}

const app = express();
app.use(express.json());
app.use(cors());
console.log('Middleware setup complete');


mongoose.connect('mongodb://127.0.0.1:27017/userManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

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
console.log('User schema defined');

const User = mongoose.model('User', userSchema);
console.log('User model created');


const uploadedFileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  filepath: String,
  uploadDate: { type: Date, default: Date.now }
});
console.log('UploadedFile schema defined');

const UploadedFile = mongoose.model('UploadedFile', uploadedFileSchema);
console.log('UploadedFile model created');


const userActionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  actionType: String,
  timestamp: { type: Date, default: Date.now }
});
console.log('UserAction schema defined');

const UserAction = mongoose.model('UserAction', userActionSchema);
console.log('UserAction model created');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Setting file upload destination');
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    console.log('Setting file upload filename');
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  console.log('Filtering file upload');
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
console.log('Multer setup complete');


const authenticate = (req, res, next) => {
  const email = req.headers['x-user-email'];
  console.log(`Authenticating user with email: ${email}`);
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        req.user = user;
        console.log(`User authenticated: ${user.email}`);
        next();
      } else {
        console.log('Unauthorized access attempt');
        res.status(401).json("Unauthorized");
      }
    });
};


app.get('/', (req, res) => {
  console.log('Root route accessed');
  res.send('Welcome to the User Management API');
});


app.post('/register', (req, res) => {
  const { email, password } = req.body;
  console.log(`Registering user with email: ${email}`);
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        console.log('User already registered');
        res.json("Already registered");
      } else {
        User.create(req.body)
          .then(user => {
            UserAction.create({ userId: user._id, actionType: 'register' });
            console.log('User registered successfully');
            res.json("Registration successful");
          })
          .catch(err => {
            console.error('Error registering user:', err);
            res.json(err);
          });
      }
    });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(`Logging in user with email: ${email}`);
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          UserAction.create({ userId: user._id, actionType: 'login' });
          console.log('User logged in successfully');
          res.json("Success");
        } else {
          console.log('Wrong password');
          res.json("Wrong password");
        }
      } else {
        console.log('No records found');
        res.json("No records found!");
      }
    });
});


app.post('/upload/file', authenticate, (req, res) => {
  console.log('Uploading file');
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Error uploading file:', err.message);
      return res.status(400).send({ message: err.message });
    }
    const user = req.user;
    UploadedFile.create({
      userId: user._id,
      filename: req.file.filename,
      filepath: req.file.path
    }).then(uploadedFile => {
      UserAction.create({ userId: user._id, actionType: 'upload' });
      console.log('File uploaded successfully');
      res.status(200).send({ message: 'File uploaded successfully', file: uploadedFile });
    }).catch(err => {
      console.error('Error saving file information:', err);
      res.status(500).send({ message: 'Error saving file information', error: err });
    });
  });
});


app.post('/markers', authenticate, (req, res) => {
  const { lng, lat, description } = req.body;
  console.log(`Adding marker at lng: ${lng}, lat: ${lat}`);
  const user = req.user;
  user.markers.push({ lng, lat, description });
  user.save()
    .then(() => {
      console.log('Marker added successfully');
      res.status(200).send({ message: 'Marker added successfully' });
    })
    .catch(err => {
      console.error('Error adding marker:', err);
      res.status(500).send({ message: 'Error adding marker', error: err });
    });
});


app.delete('/markers/:id', authenticate, (req, res) => {
  const user = req.user;
  const markerId = req.params.id;
  console.log(`Deleting marker with id: ${markerId}`);
  user.markers.id(markerId).remove();
  user.save()
    .then(() => {
      console.log('Marker deleted successfully');
      res.status(200).send({ message: 'Marker deleted successfully' });
    })
    .catch(err => {
      console.error('Error deleting marker:', err);
      res.status(500).send({ message: 'Error deleting marker', error: err });
    });
});


app.get('/markers', authenticate, (req, res) => {
  const user = req.user;
  console.log('Fetching markers');
  res.status(200).send(user.markers);
});

app.listen(3001, () => {
  console.log("Server listening on http://127.0.0.1:3001");
});