const User = require('../models/userModel');

exports.addMarker = (req, res) => {
  const { lng, lat, description } = req.body;
  const user = req.user;
  user.markers.push({ lng, lat, description });
  user.save()
    .then(() => res.status(200).send({ message: 'Marker added successfully' }))
    .catch(err => res.status(500).send({ message: 'Error adding marker', error: err }));
};

exports.deleteMarker = (req, res) => {
  const user = req.user;
  const markerId = req.params.id;
  user.markers.id(markerId).remove();
  user.save()
    .then(() => res.status(200).send({ message: 'Marker deleted successfully' }))
    .catch(err => res.status(500).send({ message: 'Error deleting marker', error: err }));
};

exports.getMarkers = (req, res) => {
  const user = req.user;
  res.status(200).send(user.markers);
};
