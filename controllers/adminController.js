var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
var app = express();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var pp = require('path');
var path= pp.resolve('./views');

router.get('/admins', function (req, res) {
  var current_admin = db.NullCheckChar(req.cookies["user"])
  
  let sql = "select * from user where userStatusName='alive' and usertype='admin' and username not in ("+current_admin+")";

  db.mycon.query(sql, function (err, result) {
    console.log(sql, "Result: " + JSON.stringify(result));
    if(err){
      console.log(err)
      res.send(err.sqlMessage);
    }else {
      res.send(result);
    }
      });
  });

  router.get('/staffs', function (req, res) {
  
  let sql = "select * from user where userStatusName='alive' and usertype='staff'";

  db.mycon.query(sql, function (err, result) {
    console.log(sql, "Result: " + JSON.stringify(result));
    if(err){
      console.log(err)
      res.send(err.sqlMessage);
    }else {
      res.send(result);
    }
      });
  });

router.post('/CreateAdmin', function (req, res) {
  console.log("got post request add admin"); 
  
  var current_admin = req.cookies["user"]
  let username = db.NullCheckChar(req.body.username)
  let password = db.NullCheckChar(req.body.password)  //HASH IT HERE 
  let userType = "'admin'"
  let phoneNo = db.NullCheckChar(req.body.phoneNo)
  let email = db.NullCheckChar(req.body.email)
  let Fname = db.NullCheckChar(req.body.Fname)
  let Lname = db.NullCheckChar(req.body.Lname)  
  let date = db.NullCheckDate(req.body.day, req.body.month, req.body.year ) 
  let sql = "insert into user values( " + username + "," + userType+ "," +  phoneNo+  "," +
           email + "," + Fname + "," + Lname + "," + password + "," + date+ " , 'alive')";

  db.mycon.query(sql, function (err, result) {
    console.log(sql, "Result: " + JSON.stringify(result));
    if(err){
      console.log(err)
      res.send(err.sqlMessage);
    }else {
      let sql2 = "insert into log values( current_timestamp(), 'create_admin', " + db.NullCheckChar(current_admin) + " , " + username + ")";
      db.mycon.query(sql2, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err)
        res.send(err.sqlMessage);
        });
  
       res.send(result);  
    }
      });
  });

router.post('/ChangeAdminPassword', function (req, res) {
  console.log("got post request change admin password"); 
  
  var current_admin = req.cookies["user"]
  let username = db.NullCheckChar(req.body.username)
  let password = db.NullCheckChar(req.body.password)  //HASH IT HERE 
  let userType = "'admin'"
  let sql = "update user set hashedPwd = " + password + " where username = " + username + " and userType = " + userType;

  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
      let sql2 = "insert into log values( current_timestamp(), 'modifyPassword_admin', " + db.NullCheckChar(current_admin) + " , " + username + ")";
      db.mycon.query(sql2, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err)
        res.send(err.sqlMessage);
        });
  
       res.send(result);  
    }
      });
  });

router.post('/RemoveAdmin', function (req, res) {
  console.log("got post request remove admin"); 
  
  var current_admin = req.cookies["user"]
  let username = db.NullCheckChar(req.body.username)
  let userType = "'admin'"
  let sql = "update user set userStatusName = 'dead' where username = " + username + " and userType = " + userType;

  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
      let sql2 = "insert into log values( current_timestamp(), 'remove_admin', " + db.NullCheckChar(current_admin) + " , " + username + ")";
      db.mycon.query(sql2, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err)
        res.send(err.sqlMessage);
        });
  
       res.send(result);  
    }
      });
  });



router.post('/CreateStaff', function (req, res) {
  console.log("got post request add staff"); 
  
  
  var current_admin = req.cookies["user"]
  let username = db.NullCheckChar(req.body.username)
  let password = db.NullCheckChar(req.body.password)  //HASH IT HERE 
  let userType = "'staff'"
  let phoneNo = db.NullCheckChar(req.body.phoneNo)
  let email = db.NullCheckChar(req.body.email)
  let Fname = db.NullCheckChar(req.body.Fname)
  let Lname = db.NullCheckChar(req.body.Lname)  
  let date = db.NullCheckDate(req.body.day, req.body.month, req.body.year ) 
  let sql = "insert into user values( " + username + "," + userType+ "," +  phoneNo+ "," +
           email + "," + Fname + "," + Lname + "," + password + "," + date+ ", 'alive')";

  db.mycon.query(sql, function (err, result) {
    console.log(sql+"Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
      let sql2 = "insert into log values( current_timestamp(), 'create_staff', " + db.NullCheckChar(current_admin) +
       " , " + username + ")";
      db.mycon.query(sql2, function (err, result) {
        console.log("Result: " + JSON.stringify(result));
        if(err)   
          res.send(err.sqlMessage);
        else 
        res.send(result);  
      });
    }
    
      });
  });

router.post('/ChangeStaffPassword', function (req, res) {
  console.log("got post request change staff password"); 

  var current_admin = req.cookies["user"]
  let username = db.NullCheckChar(req.body.username)
  let password = db.NullCheckChar(req.body.password)  //HASH IT HERE 
  let userType = "'staff'"
  let sql = "update user set hashedPwd = " + password + " where username = " + username + " and userType = " + userType;

  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
      let sql2 = "insert into log values( current_timestamp(), 'modifyPassword_staff', " + db.NullCheckChar(current_admin) + " , " + username + ")";
      db.mycon.query(sql2, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err)
        res.send(err.sqlMessage);
        });
  
       res.send(result);  
    }
      });
  });


router.post('/RemoveStaff', function (req, res) {
  console.log("got post request remove staff"); 
  
  var current_admin = req.cookies["user"]
  let username = db.NullCheckChar(req.body.username)
  let userType = "'staff'"
  let sql = "update user set userStatusName = 'dead'  where username = " + username + " and userType = " + userType;

  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
      let sql2 = "insert into log values( current_timestamp(), 'remove_staff', " + db.NullCheckChar(current_admin) + " , " + username + ")";
      db.mycon.query(sql2, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err)
        res.send(err.sqlMessage);
        });
  
       res.send(result);  
    }
      });
  });

router.get('/all_logs', function (req, res) {

  console.log("got get request all logs"); 
  let sql = "select * from log";
  db.mycon.query(sql, function (err, result) {
   
    if(err){
      res.send(err);
    } else {
     
     res.json(result);  
    }
  });
});



//importing admin controllers
var restaurantController = require('./admin/restaurantController');
var discountController = require('./admin/discountController');

//creating the route for the controllers
router.use('/restaurant', restaurantController);
router.use('/discount', discountController);

module.exports = router;
