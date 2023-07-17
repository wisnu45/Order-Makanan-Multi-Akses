var jwt = require('jsonwebtoken');
var config = require('./config');

function verifyToken(req, res, next) {
  var token = req.cookies["cookieToken"];
  //console.log("in verify token " +token)
  if (!token)
    res.redirect('/');

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err){
      console.log(err)
      
    res.redirect('/');
    }
    
  });
  next();
}
function getUserInfo(token, callback){

  if (!token)
      return callback({});

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err){
      console.log(err)
       return callback({});
    }
    console.log("decoded ", JSON.stringify(decoded.user))
    return callback(decoded);
    
  });
}

module.exports = {
  verifyToken : verifyToken,
  getUserInfo : getUserInfo
};