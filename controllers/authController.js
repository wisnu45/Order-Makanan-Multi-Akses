var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

router.post('/register', function(req, res) {
  var username = req.body.user[0];
  var usertype = req.body.user[1];

  console.log("got auth register"+username+" "+usertype)
  var token = jwt.sign({user:username, type:usertype}, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.cookie("cookieToken", token); 
    res.send(JSON.stringify({token:token}));
  
});

router.get('/me', function(req, res) {

  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
 
  res.status(200).send(decoded.id);
  });
});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});


router.use(function (user, req, res, next) {
  res.status(200).send(user);
});


module.exports = router;