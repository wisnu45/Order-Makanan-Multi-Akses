var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
var pp = require('path');
var path= pp.resolve('./views');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/viewOrders/:user', function (req, res) {
  if(req.cookies["user"]!=req.params["user"]) //not the best way to do this
    {
      res.redirect("/denied");
    }
  console.log("got staff view order");
  var sql = "select * from Cart where statusName not in ('Pending') order by CartID" 
  db.mycon.query(sql, function (err, result) {
    var json = JSON.stringify(result)
    console.log("Result: " + json);
    if(err){
      res.send(err);
    }else {
      res.render(path+"/staff.html");
    }
      });
  });

router.post('/viewOrders/', function (req, res) {
  
  console.log("got staff view order");
  var sql = "select * from Cart where statusName not in ('Pending') order by CartID" 
  db.mycon.query(sql, function (err, result) {
    var json = JSON.stringify(result)
    console.log("Result: " + json);
    if(err){
      res.send(err);
    }else {
      res.send(result);
    }
      });
  });

router.post('/changeOrderStatus', function (req, res) {
  console.log("got staff change order ");
  var cartID = db.NullCheckNum(req.body.cartID)
  var statusName = db.NullCheckChar(req.body.statusName)
  var sql = "update Cart set statusName = "+statusName+" where CartID= "+cartID; 
  db.mycon.query(sql, function (err, result) {
    var json = JSON.stringify(result)
    console.log("Result: " + json);
    if(err){
      res.send(err);
    }else {
      res.send(result);
    }
      });
  });



module.exports = router;
