const User = require('../models/userModel');
const UserAction = require('../models/userActionModel');

exports.registerUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        res.json("Already registered");
      } else {
        User.create(req.body)
          .then(user => {
            UserAction.create({ userId: user._id, actionType: 'register' });
            res.json("Registration successful");
          })
          .catch(err => res.json(err));
      }
    });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          UserAction.create({ userId: user._id, actionType: 'login' });
          res.json("Success");
        } else {
          res.json("Wrong password");
        }
      } else {
        res.json("No records found!");
      }
    });
};
