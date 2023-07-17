var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



router.get('/viewMenu', function (req, res) {
  console.log("got get restaurantMenu"); 
  var restaurantName = db.NullCheckChar(req.body.restaurantName)
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        var restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "select * from restaurantMenu where restaurantID = " + restaurantID;
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
  

router.post('/addMenu', function (req, res) {
  console.log("add Menu"); 
  var restaurantName = db.NullCheckChar(req.body.restaurantName)
  var menuType= db.NullCheckChar(req.body.menuType)
  var startHour= db.NullCheckChar(req.body.startHour)
  var endHour= db.NullCheckChar(req.body.endHour)
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        var restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "insert into restaurantMenu values(" + menuType+","+restaurantID+","+startHour+","+endHour+");";
         db.mycon.query(sql2, function (err, result) {
            console.log( "Result: " + JSON.stringify(result));
            if(err){
              res.send(err);
            }
            
            else {
              res.send(result);
            }
              });
      }
        });
  });

  router.post('/modifyMenu', function (req, res) {
  console.log("add Menu"); 
  var restaurantName = db.NullCheckChar(req.body.restaurantName)
  var menuType= db.NullCheckChar(req.body.menuType)
  var startHour= db.NullCheckChar(req.body.startHour)
  var endHour= db.NullCheckChar(req.body.endHour)
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err || result==undefined){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "update restaurantMenu set startHour= "+startHour+", endHour = "+endHour+" where menuType= " + menuType+" and restaurantID= "+restaurantID+";";
         db.mycon.query(sql2, function (err, result) {
            console.log("Result: " + JSON.stringify(result));
            if(err){
              res.send(err);
            }
            else if(result.length==0)res.send("");
            else {
              res.send(result);
            }
              });
      }
        });
  });
  
  router.post('/removeMenu', function (req, res) {
  console.log("remove Menu"); 
  var restaurantName = db.NullCheckChar(req.body.restaurantName)
  var menuType= db.NullCheckChar(req.body.menuType)
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "delete from restaurantMenu where menuType= " + menuType+" and restaurantID= "+restaurantID+";";
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


router.post('/addItem', function (req, res) {
  console.log("add Menu Item"); 
  var restaurantName = db.NullCheckChar(req.body.restaurantName)
  var menuType= db.NullCheckChar(req.body.menuType)
  var itemName = db.NullCheckChar(req.body.itemName)
  var basePrice = db.NullCheckNum(req.body.basePrice)
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "insert into restaurantMenuItem values(" + menuType+","+restaurantID+"," + itemName + "," + basePrice+");";
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

router.post('/modifyItem', function (req, res) {
  console.log("add Menu Item"); 
  var restaurantName = db.NullCheckChar(req.body.restaurantName)
  var menuType= db.NullCheckChar(req.body.menuType)
  var itemName = db.NullCheckChar(req.body.itemName)
  var basePrice= db.NullCheckChar(req.body.basePrice)
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "update  restaurantMenuItem set basePrice = "+basePrice+ "where restaurantID = " + restaurantID + " and menuType = " + menuType +
            "and menuItemName = "+ itemName;
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


router.post('/removeItem', function (req, res) {
  console.log("add Menu Item"); 
  var restaurantName = db.NullCheckChar(req.body.restaurantName)
  var menuType= db.NullCheckChar(req.body.menuType)
  var itemName = db.NullCheckChar(req.body.itemName)
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "delete from restaurantMenuItem where restaurantID = " + restaurantID + " and menuType = " + menuType +
            "and menuItemName = "+ itemName;
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


  router.get('/items', function (req, res) {
  console.log("get Menu Item"); 
  var restaurantName = db.NullCheckChar(req.body.restaurantName)
  var menuType= db.NullCheckChar(req.body.menuType)
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "select * from restaurantMenuItem where restaurantID ="+restaurantID+" and menuType= "+menuType+";";
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


  

router.post('/addItemConfig', function (req, res) {
  console.log("add Menu Item Config"); 
  var restaurantName = db.NullCheckChar(req.body.restaurantName)
  var menuType= db.NullCheckChar(req.body.menuType)
  var itemName = db.NullCheckChar(req.body.itemName)
  var configName = db.NullCheckChar(req.body.configName)
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "insert into restaurantMenuItemConfig values(" + menuType+","+restaurantID+"," + itemName + "," + configName+");";
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

router.post('/removeItemConfig', function (req, res) {
  console.log("add Menu Item"); 
  var restaurantName = db.NullCheckChar(req.body.restaurantName)
  var menuType= db.NullCheckChar(req.body.menuType)
  var itemName = db.NullCheckChar(req.body.itemName)
  var configName = db.NullCheckChar(req.body.configName)
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "delete from restaurantMenuItemConfig where restaurantID = " + restaurantID + " and menuType = " + menuType +
            "and menuItemName = "+ itemName + " and configName ="+ configName;
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

  
  router.get('/itemConfigs', function (req, res) {
  console.log("get Menu Item Config"); 
  var restaurantName = db.NullCheckChar(req.body.restaurantName)
  var menuType= db.NullCheckChar(req.body.menuType)
  var itemName = db.NullCheckChar(req.body.itemName)
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "select * from restaurantMenuItemConfig where restaurantID ="+restaurantID+" and menuType= "+menuType+" and menuItemName = "+itemName+";";
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

module.exports = router;
