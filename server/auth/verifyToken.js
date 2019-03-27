const jwt = require('jsonwebtoken');
const config = require('./config');

function verifyToken(req, res, next) {
  const token = req.headers.authorization || req.headers.Authorization;

  if (!token) {
    return res
      .status(403)
      .send({
        auth: false,
        message: 'No token provided. ' +
        'Please provide Authorization header with jwt token',
      });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({
          auth: false,
          message: 'Failed to authenticate token.',
        });
    }

    req.userId = decoded.userId;

    next();
  });
}

module.exports = verifyToken;
