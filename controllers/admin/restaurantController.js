var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



router.get('/all', function (req, res) {
  console.log("got get all restaurant");
  var sql = "select * from restaurant";
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      res.send(result);
    }
      });
  });


router.post('/add', function (req, res) {
  console.log("got post add restaurant");
  var name = db.NullCheckChar(req.body.restaurantName); 
  var cuisine = db.NullCheckChar(req.body.cuisine); 
  var deliveryFee = db.NullCheckNum(req.body.deliveryFee); 
  var address = db.NullCheckChar(req.body.address); 
  var taxPercent = db.NullCheckNum(req.body.taxPercent); 
  var startHour = db.NullCheckChar(req.body.startHour);
  var endHour = db.NullCheckChar(req.body.endHour);
  if(taxPercent<0.0 || taxPercent>1.0){
    res.send("wrong");
    return;
  }
  var sql = "insert into restaurant Values(null, "+name +","+cuisine +","+deliveryFee +","+address +","+taxPercent +","+
        startHour + ","+ endHour +");";
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send("no");
    }else {
      res.send("ok");
    }
      });
  });

router.post('/modify', function (req, res) {
  console.log("got post modify restaurant");

  var restaurantName = db.NullCheckChar(req.body.restaurantName);
  var cuisine = db.NullCheckChar(req.body.cuisine); 
  var deliveryFee = db.NullCheckNum(req.body.deliveryFee); 
  var address = db.NullCheckChar(req.body.address); 
  var taxPercent = db.NullCheckNum(req.body.taxPercent); 
  var startHour = db.NullCheckChar(req.body.startHour);
  var endHour = db.NullCheckChar(req.body.endHour);
  if(taxPercent<0.0 || taxPercent>1.0){
    res.send("wrong");
    return;
  }
  var sql = "select restaurantID from restaurant where restaurantName = "+restaurantName;
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send("no");
    }else {
      var restaurantID = result[0].restaurantID
      var sql2 = "update restaurant set cuisine = "+cuisine +", deliveryFee = "+
                deliveryFee +", rest_add = "+address +", taxPercent = "+taxPercent +
                ", startHour = "+         startHour+", endHour = "+endHour+
                " where restaurantID = "+restaurantID;
          db.mycon.query(sql2, function (err, result) {
            console.log(sql2, "Result: " + JSON.stringify(result));
            if(err){
              res.send("no");
            }else {
              res.send("ok");
            }
              });
         
    }
      });
  });


router.post('/remove', function (req, res) {
  console.log("got post remove restaurant");
  var restaurantName = db.NullCheckChar(req.body.restaurantName);
  var sql = "delete from restaurant where restaurantName = " + restaurantName;
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      res.send(result);
    }
      });
  });
  


router.post('/addArea', function (req, res) {
  console.log("got post add area");
  var areaName = db.NullCheckChar(req.body.areaName);
  var restaurantID;
  var restaurantName = db.NullCheckChar(req.body.restaurantName);
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "insert into restaurantDeliveryArea values(" + areaName+","+restaurantID+");";
         db.mycon.query(sql2, function (err, result) {
            console.log("Result: " + JSON.stringify(result));
            if(err){
              res.send(err);
            }else {
              res.send(result);
            }
              });
      }
        });
});

router.get('/areas', function (req, res) {
  console.log("got get areas");
  var restaurantName = db.NullCheckChar(req.body.restaurantName);
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        var sql2 = "select areaName from restaurantDeliveryArea where restaurantID ="+restaurantID;
         db.mycon.query(sql2, function (err, result) {
            console.log("Result: " + JSON.stringify(result));
            if(err){
              res.send(err);
            }else {
              res.send(result);
            }
              });
      }
        });
});
  
 router.post('/removeArea', function (req, res) {
  console.log("got post remove area");
  var areaName = db.NullCheckChar(req.body.areaName);
  var restaurantID;
  var restaurantName = db.NullCheckChar(req.body.restaurantName);
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "delete from restaurantDeliveryArea where restaurantID="+restaurantID+" and areaName="+areaName;
         db.mycon.query(sql2, function (err, result) {
            console.log("Result: " + JSON.stringify(result));
            if(err){
              res.send(err);
            }else {
              res.send(result);
            }
              });
      }
        });
});
  
//importing admin controllers
var menuController = require('./menuController');

//creating the route for the controllers
router.use('/menu', menuController);

module.exports = router;
