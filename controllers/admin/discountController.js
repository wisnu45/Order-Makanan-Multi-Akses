var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


// add discount
router.post('/add', function (req, res) {
  console.log("got post request add discount"); 
  
  let code = db.NullCheckChar(req.body.discountCode)
  let date =  db.NullCheckDate(req.body.day, req.body.month, req.body.year ) 
  let rate = req.body.rate
  
  if(rate<0 || rate>1)res.send("inv");
  
  let sql = "insert into discount values ( " + code+ "," + date + "," + rate +")"
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
  console.log("got post request update discount rate"); 
  
  let code =  req.body.discountCode
  let date =  db.NullCheckDate(req.body.day, req.body.month, req.body.year ) 
  let rate = req.body.rate

  if(rate<0 || rate>1)res.send("inv");

  let sql = "update discount set rate = " + rate + ", expiryDate = "+ date+" where discountID = " + code;
  console.log(sql);
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send("no");
    }else {
      res.send("ok");  
    }
      });
  });

 router.post('/remove', function (req, res) {
  console.log("got post request remove discount"); 
  
  let code = req.body.discountCode
  let sql = "delete from discount where discountID = " + code;
  db.mycon.query(sql, function (err, result) {
    console.log(sql+"Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      res.send(result);  
    }
      });
  }); 

// get all discounts
router.get('/all', function (req, res) {
  console.log("got get request all discounts"); 
  let sql = "select * from discount";
  db.mycon.query(sql, function (err, result) {
   
    if(err){
      res.send(err);
    } else {
     
     res.json(result);  
    }
  });
});

module.exports = router;
