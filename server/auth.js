const jwt = require('jsonwebtoken');

exports.checkToken = (req, res, next) => {
  const token = req.headers.Authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(403).json({
          message: 'Failed to authenticate token.'
        });
      }
      req.user = decoded.userDetails;
      next();
    });
  } else {
    return res.status(400).json({
      message: 'No token provided.'
    });
  }
};
