var User = require('../models/UserModel');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var acitveUserId = '';

exports.registerUser = function (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({ name: req.body.name, email: req.body.email, password: hashedPassword },
        function (err, user) {
            if (err)
                return res.status(500).send("There was a problem registering the user.")
            var token = jwt.sign({ id: user._id }, config.secretkey, { expiresIn: 86400 }); //creating a token, expires in 24 hours
            res.status(200).send({ auth: true, token: token })
        });
}

exports.currentUser = function (req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // verify method called if token exists
    jwt.verify(token, config.secretkey, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        //res.status(200).send(decoded);  // see the whole decoded object after passing the token in headers, TODO: need to pass this in front end in x-access-token 
        User.findById(decoded.id, { password: 0 }, function (err, user) { // added a projection to the query to omit the password field
            if (err)
                return res.status(500).send("There was a problem finding the user.");
            if (!user)
                return res.status(404).send("No user found.");
            res.status(200).send(user);
        });   // we can see the whole user object pertaining to that id, TODO: hit this api once in front end before adding new books 
    });
}

exports.loginUser = function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err)
            return res.status(500).send('Error on the server.');
        if (!user)
            return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password); // compares password sent with the one saved in the database
        if (!passwordIsValid)
            return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user._id }, config.secretkey, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token: token });
    });
}

exports.logoutUser = function (req, res){
    res.status(200).send({ auth: false, token: null }); // logout can be handled in client side it self by clearing the local storage to which we set the token when logging in
}