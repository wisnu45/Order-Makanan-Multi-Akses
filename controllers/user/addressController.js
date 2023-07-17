var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());




router.get('/all/:user', function (req, res) {
  console.log("got get user addresses "+req.params["user"]); 
  let sql = "select * from userAddress where username = " + db.NullCheckChar(req.params["user"]);
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
       if(result.length >0)
        res.send(result)
      else 
         res.send('Fail')  
    }
      });
  });

router.get('/byRestaurant/:rest/', function (req, res) {
  console.log("got get user addresses"); 
  var restaurantName = db.NullCheckChar(req.params["rest"])
  var cur_user = db.NullCheckChar(req.cookies["user"])
  var sql = "select restaurantID from restaurant where restaurantName = "+restaurantName;
  
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
      var restaurantID = result[0].restaurantID
       var sql2 = "select * from userAddress where username = " + cur_user + " and areaname IN("+
        "Select areaname from restaurantDeliveryarea where restaurantID = "+restaurantID +");";
         db.mycon.query(sql2, function (err, result) {
        console.log("Result: " + JSON.stringify(result));
        if(err){
          res.send(err.sqlMessage);
        }else {
            res.send(result)
        }
          });
      }
    
      });
  });


router.post('/add', function (req, res) {
  console.log("got post user add address"); 
  var area = req.body.areaName;  
  var cur_user = req.cookies["user"]
  var address1 = req.body.address1;  
  var address2 = req.body.address2;
  let sql = "insert into UserAddress Values (null,"+  db.NullCheckChar(cur_user) +","+ db.NullCheckChar(area)+","+db.NullCheckChar(address1)+","+db.NullCheckChar(address2)+");";
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
      res.send(result);
    }
      });
  });

router.post('/remove/:user/:area/:add', function (req, res) {
  console.log("got post user remove address " +req.params["add"]); 
  var num = req.body.address_no;
  let sql = "delete from userAddress where username = " + db.NullCheckChar(req.params["user"])+ " and areaName="+
    db.NullCheckChar(req.params["area"])+" and addressLine1= "+ db.NullCheckChar(req.params["add"])
  db.mycon.query(sql, function (err, result) {
    console.log(sql+"\nResult: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
      res.send(result);
    }
      });
  });

module.exports = router;
