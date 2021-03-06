var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token']; // send token from front end to the headers for this request
  if (!token) 
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  // verifies secretkey and checks token validity
  jwt.verify(token, config.secretkey, function(err, decoded) {      
    if (err) 
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    

    // if everything is good, save to request for use in other routes and for adding a new book by authenticated user
    req.userId = decoded.id;
    next();
  });

}

module.exports = verifyToken;