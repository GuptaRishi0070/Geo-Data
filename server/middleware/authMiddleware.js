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
    })
    .catch(err => {
      console.error('Error during authentication:', err);
      res.status(500).json("Internal Server Error");
    });
};