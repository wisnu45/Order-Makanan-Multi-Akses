var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');
var path = require('path')
var verifyToken = require((path.resolve('')+'/verifyToken'))
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var pp = require('path');
var path= pp.resolve('./views');
function CheckActive(value){
  if(value== null || value==undefined)
    return "starthour=starthour";
  return "startHour<=" + value + " and endhour>="+value;
};
function CheckZeros(value){
  val = value.toString();
  if(val.length==2)return value;
  else if(val.length==1)return "0"+value;
  else return "00";
};
 

// GET MENU ITEMS (ACTIVE)
router.post('/items', verifyToken.verifyToken,function (req, res) {
  console.log("get Menu Item"); 
  var today = new Date();
  var time = CheckActive(CheckZeros(today.getHours())+""+ CheckZeros(today.getMinutes())+""+ CheckZeros(today.getSeconds()))

  var restaurantName = db.NullCheckChar(req.body.restaurantName)
  var menuType = db.NullCheckChar(req.body.menuType)
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "select I.* from restaurantmenu M, restaurantMenuItem I where M.restaurantID = I.restaurantID and I.restaurantID = "+
        restaurantID + " and M.menuType=I.menutype and I.menuType= " + menuType + " and "+time;
         db.mycon.query(sql2, function (err, result) {
            console.log(sql2+"\nResult: " + JSON.stringify(result));
            if(err){
              res.send(err);
            }else {
              res.send(result);
            }
              });
      }
        });
  });


  

// GET MENU ITEMS CONFIGS  
  router.post('/itemConfigs', function (req, res) {
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



router.post('/menu/createCart', function (req, res) {
  console.log("got post create cart"); 
  
  var cur_user = db.NullCheckChar(req.cookies["user"] )
  var areaName = db.NullCheckChar(req.body.areaName);
  var address = db.NullCheckChar(req.body.address);
  var restaurantName = db.NullCheckChar(req.body.restaurantName);
  var discountID = req.body.discountID
  if(discountID==undefined || discountID==null || discountID=='') 
      discountID = "NULL"
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "select userAddNo from UserAddress where username="+cur_user+" and areaName =" + areaName
        + " and addressLine1 = "+ address;
        db.mycon.query(sql2, function (err, result) {
            console.log("Result: " + JSON.stringify(result));
            if(err){
              res.send(err);

            }else {
              address_num=result[0].userAddNo
              console.log("got id: "+restaurantID);
              var sql3 = "insert into Cart values(null, "+cur_user+", "+ address_num+","+restaurantID+","+discountID+", 'Pending');";
              db.mycon.query(sql3, function (err, result) {
                  console.log(sql3+"Result: " + JSON.stringify(result));
                  if(err){
                    res.send(err);
                  }else {
                     var sql4 = "SELECT LAST_INSERT_ID() as cartID;";
                      db.mycon.query(sql4, function (err, result) {
                          console.log("Result: " + JSON.stringify(result));
                          if(err){
                            res.send(err);
                          }else {
                            res.send(result);
                          }
                            });
                  }
                    });
            }
              });
      }
        });
});

router.post('/menu/addToCart', function (req, res) {
  console.log("got post add to cart"); 
  
  var menuType = db.NullCheckChar(req.body.menuType); 
  var restaurantName = db.NullCheckChar(req.body.restaurantName); 
  var cartID = req.body.cartID;

  var configName = db.NullCheckChar(req.body.configName);
  var itemName = db.NullCheckChar(req.body.itemName);
  var quantity = db.NullCheckNum(req.body.quantity)
  var comment = db.NullCheckChar(req.body.comment)
  if(comment=='')comment="NULL"
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName;
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        var restaurantID = result[0].restaurantID
        var sql2 = "insert into CartItem values ("+cartID+","+menuType+","+restaurantID+","+itemName+","+configName+","+quantity+","+comment+")";
        db.mycon.query(sql2, function (err, result) {
            console.log(sql2+"Result: " + JSON.stringify(result));
            if(err){
              res.send("no")

            }else {
              res.send("ok");
            }
              });
            }
        });
});

router.post('/menu/removeFromCart', function (req, res) {
  console.log("got post remove from cart"); 
  
  var menuType = db.NullCheckChar(req.body.menuType); 
  var restaurantName = db.NullCheckChar(req.body.restaurantName);  
  var cartID = req.body.cartID 

  var configName = db.NullCheckChar(req.body.configName);
  var itemName = db.NullCheckChar(req.body.itemName);
  
  var sql = "select restaurantID from restaurant where restaurantName = " + restaurantName;
    db.mycon.query(sql, function (err, result) {
        console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send('no');

      }else {
        var restaurantID = result[0].restaurantID
         var sql2 = "delete from CartItem where cartID ="+cartID+" and menuType = "+menuType+
         " and restaurantID = "+restaurantID+" and menuItemName = "+itemName+" and configName = "+configName+";"
         db.mycon.query(sql2, function (err, result) {
          console.log("Result: " + JSON.stringify(result));
          if(err){
            res.send('no');

          }else {
            res.send("Success")
          }
            });
      }
        });
});


router.get('/menu/getCart/:cartID', function (req, res) {
  console.log("got cart"); 
  

  var cartID = req.params["cartID"]
  var sql = "select * from CartItem where cartID ="+cartID;
    db.mycon.query(sql, function (err, result) {
        console.log("Result: " + JSON.stringify(result));
      if(err){
        res.redirect("/404");

      }else {
        res.render(path+"/viewCart.html",{cartID:cartID});
      }
        });
});

router.post('/menu/getCart/:cartID', function (req, res) {
  console.log("got cart"); 
  

  var cartID = req.params["cartID"]
  var sql = "select * from CartItem where cartID ="+cartID;
    db.mycon.query(sql, function (err, result) {
        console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        res.send(result)
      }
        });
});
router.post('/menu/getCartTotal', function (req, res) {
  console.log("got cart  total"); 
  

  var cartID = req.body.cartID
  
  var sql = "select * from CartTotal where cartID ="+cartID+";"
    db.mycon.query(sql, function (err, result) {
        console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        res.send(result)
      }
        });
});

router.post('/menu/placeOrder', function (req, res) {
  console.log("got cart"); 
  

  var cartID = req.body.cartID
  
  var sql = "update Cart set statusName='Received' where cartID ="+cartID+";"
    db.mycon.query(sql, function (err, result) {
        console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        res.send(result)
      }
        });
});
module.exports = router;
