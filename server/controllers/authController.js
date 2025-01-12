const User = require('../models/User');
const UserAction = require('../models/UserAction');

const register = (req, res) => {
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

const login = (req, res) => {
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

module.exports = { register, login };