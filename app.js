var express = require('express');

var app = express();
var db = require('./db');
var verifyToken = require('./verifyToken')
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

var engines = require('consolidate');
app.engine('html', engines.mustache);


app.use(express.static('public'));
 
var path = __dirname + '/views/';
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });

app.get("/",function(req,res){
  res.sendFile(path+"login.html");
});

app.get("/forgotPassword",function(req,res){
  res.sendFile(path + "forgot.html");
});
 
app.get("/signup",function(req,res){
  res.sendFile(path + "signup.html");
});
 
 
//importing the controllers
var adminController = require('./controllers/adminController');
var userController = require('./controllers/userController');
var staffController = require('./controllers/staffController');
var authController = require('./controllers/authController');

//creating the route for the controllers
app.use('/admin', adminController);
app.use('/user', userController);
app.use('/staff', staffController);
app.use('/auth', authController);


router.use(function (req,res,next) {
  console.log("/" + req.method + " "+ req.url);
  next();
});
app.use("/",router);

app.get("/home" , function(req,res){  
 var user = verifyToken.getUserInfo(req.cookies["cookieToken"], function(decoded){
    console.log("in home get "+decoded.user+" "+decoded.type)
    if(decoded.type==undefined)
      res.redirect("/")
    else 
    {

      res.cookie("user", decoded.user);
     res.sendFile(path+"home.html")
    }
 })

});


app.get("/order", function(req,res){  
 var user = verifyToken.getUserInfo(req.cookies["cookieToken"], function(decoded){
    if(decoded.type==undefined)
      res.redirect("/")
    else {
      res.cookie("user", decoded.user);
      res.redirect('/user/myOrders/'+decoded.user)
    }

 })

});

app.get("/staff", function(req,res){  
 var user = verifyToken.getUserInfo(req.cookies["cookieToken"], function(decoded){
    if(decoded.type==undefined)
      res.redirect("/")
    else if(decoded.type!='staff'){
      res.redirect("/denied")
    }
    else {
      res.cookie("user", decoded.user);
      res.redirect('/staff/viewOrders/'+decoded.user)
    }

 })

});

app.get("/admin", function(req,res){  
 var user = verifyToken.getUserInfo(req.cookies["cookieToken"], function(decoded){
    if(decoded.type==undefined)
      res.redirect("/")
    else if(decoded.type!='admin'){
      res.redirect("/denied")
    }
    else {
      res.cookie("user", decoded.user);
      res.render(path+'admin.html',{user:decoded.user})
    }

 })

});

app.get("/manageOthers", function(req,res){  
 var user = verifyToken.getUserInfo(req.cookies["cookieToken"], function(decoded){
    if(decoded.type==undefined)
      res.redirect("/")
    else if(decoded.type!='admin'){
      res.redirect("/denied")
    }
    else {
      res.cookie("user", decoded.user);
      res.render(path+"/admin_users.html", {user:decoded.user})
    }

 })

});


app.get("/manageMenus", function(req,res){  
 var user = verifyToken.getUserInfo(req.cookies["cookieToken"], function(decoded){
    if(decoded.type==undefined)
      res.redirect("/")
    else if(decoded.type!='admin'){
      res.redirect("/denied")
    }
    else {
      res.cookie("user", decoded.user);
      res.render(path+"/admin_menus.html", {user:decoded.user})
    }

 })

});



app.get("/manageRests", function(req,res){  
 var user = verifyToken.getUserInfo(req.cookies["cookieToken"], function(decoded){
    if(decoded.type==undefined)
      res.redirect("/")
    else if(decoded.type!='admin'){
      res.redirect("/denied")
    }
    else {
      res.cookie("user", decoded.user);
      res.render(path+"/admin_restaurants.html", {user:decoded.user})
    }

 })

});


app.get("/manageDiscounts", function(req,res){  
 var user = verifyToken.getUserInfo(req.cookies["cookieToken"], function(decoded){
    if(decoded.type==undefined)
      res.redirect("/")
    else if(decoded.type!='admin'){
      res.redirect("/denied")
    }
    else {
      res.cookie("user", decoded.user);
      res.render(path+"/admin_discounts.html", {user:decoded.user})
    }

 })

});



app.get("/profile", function(req,res){  
 var user = verifyToken.getUserInfo(req.cookies["cookieToken"], function(decoded){
    if(decoded.type==undefined)
      res.redirect("/")
    else {
      res.redirect('/user/profile/'+decoded.user)
    }

 })

});




app.get("/logout" , function(req,res){  
 res.clearCookie("cookieToken");
 res.clearCookie("user");
 res.redirect("/")

});

app.post("/home" ,verifyToken.verifyToken, function(req,res){
  
  res.send({});
});

app.use("/denied",function(req,res){
  res.sendFile(path + "denied.html");
});


app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});


module.exports = app