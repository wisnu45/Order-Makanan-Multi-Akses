
$( document ).ready(function() {
  rest.value = rest.value.replace(/_/g,' ')
  $("#menuSelect").change(function() {
    
    ajaxGet($("input[name='msel']:checked").val());
  });

// Add to Cart Buttons
 $(document).on("click", 'button[id$="_b"]', function(){
   //event.preventDefault();
   
  addItemPost(this.id);
})
// Remove from Cart Buttons
 $(document).on("click", 'button[id$="_ib"]', function(){
   //event.preventDefault();
   
  removeItemPost(this);
})
 $(document).on("click", '#placeOrder', function(){
   //event.preventDefault();
  placeOrderPost();
})

$(document).on("click", '#calcOrder', function(){
   //event.preventDefault();
  calcOrderPost();
  })

// GET REQUEST
$("#restSearch").submit(function(event){
  event.preventDefault();
  ajaxGet();
});

$("#areas_select").click(function(event){
    event.preventDefault();
    
    ajaxGetAddresses();
  });

$("#cuisines_select").click(function(event){
  event.preventDefault();
  ajaxGetCuisines();
});

$("#cartForm").submit(function(event){
  event.preventDefault();
  ajaxCreateCart();
});

// DO GET
function ajaxGet(menu){
  
  //alert(restaurantName)
  var formData = {
      restaurantName :  rest.value,
      menuType : menu
    }
  $.ajax({
    type : "POST",
    contentType : "application/json",
    url : window.location.origin+"/user/restaurant/items",
    data : JSON.stringify(formData),
    dataType : 'json',
    success: function(result){
      $('#itemrest').empty();
      $.each(result, function(i, item){
        
        var formData2 ={ 
           restaurantName : rest.value,
           menuType : menu, 
           itemName : item.menuItemName
        }
        var id = menu.replace(/\s/g, '_')+"_"+item.menuItemName.replace(/\s/g, '_')
        $.ajax({
          type : "POST",
          contentType : "application/json",
          url : window.location.origin+"/user/restaurant/itemConfigs",
          data : JSON.stringify(formData2),
          dataType : 'json',
          success: function(result){
            var dd="";
           dd+="<tr> <th scope='row'> <a href='user/restaurantMenu/'> "+
        item.menuItemName + "</a></th> <td > "+
        item.basePrice + "</td><td >"
        
            dd+="<select id='"+id+"'>";
           
            $.each(result, function(i, config){
             dd+="<option value'"+config.configName+ "'>"+config.configName+"</option>"
            });
            
            dd+="</select></td>"
          dd+="<td><input type='number' min=0 style='width:40px;' id='"+id+"_q' placeholder='0'></input></td>" 
          var cur_id = id+"_b"         
          dd+="<td><input type='text' id='"+id+"_c'> </input></td>"
          dd+="<td><button class='btn btn-primary' id='"+cur_id+"'> Add </button></td></tr>"
          $('#itemrest').append(dd)
          },
          error : function(e) {
            alert("Error in select")
          }
      }); 

      });
      console.log("Success: ", result);
    },
    error : function(e) {
      $("#searchResults").html("<strong>Error</strong>");
      console.log("ERROR: ", e);
    }
  });  
}



  });  

function addItemPost(id){
  var str = id.substr(0, id.length-2)  
  var str_p = str.split('_')
  var menuType = str_p[0]
  
  var itemName=""
  str_p.forEach(function(s, i) {
    if(i!=0)
      itemName+=" "+s
  });
  itemName = itemName.slice(1)
  var quantity =  $("#"+str+"_q").val()  
  var comment =  $("#"+str+"_c").val()  
  var cartID =  $("#cartID").val() 
  var configName =  $("#"+str).val()
  var restaurantName = $("#rest").val() 
  var url = window.location.origin+"/user/restaurant/menu/addToCart/"
  var formData = {
    menuType : menuType,
    restaurantName : restaurantName,
    cartID  : cartID, 
    configName : configName, 
    itemName : itemName, 
    quantity : quantity, 
    comment : comment
  }
   $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'text',
        success: function(result){

          var item_id = menuType.replace(/\s/g, '_')+"#"+itemName.replace(/\s/g, '_')+"#"+configName.replace(/\s/g, '_')
         // alert(item_id)
          if(result=='ok'){
            $('#cartItems').append("<tr id='"+item_id+"'> <td scope='col'>"+itemName+"</td><td scope='col'>"+configName+"</td><td scope='col'>"+
            comment+"</td><td scope = 'col> <input id='"+item_id+"_q' type='number' disabled>"+quantity+"</input></td><td scope='col'><button class='btn btn-danger' id='"+item_id+"_ib'>Remove</button></td></tr>")
          }
          else alert("remove item and re add")
        },
        error : function(e) {
          alert("Error connecting to server")
        }
    }); 
  
}

function removeItemPost(row){
  var id = row.id
  id = id.substr(0, id.length-3)
  var menuType = id.substr(0, id.indexOf('#')); 
  menuType = menuType.replace(/_/g, '')
  var itemName = id.slice(menuType.length + 1)
  itemName = itemName.substr(0, itemName.indexOf('#')); 
  itemName = itemName.replace(/_/g,' ')
  var configName =  id.slice(menuType.length + 1 +itemName.length + 1)
  configName = configName.replace(/_/g,' ')
  var cartID =  $("#cartID").val() 
  var restaurantName = $("#rest").val() 
  var url = window.location.origin+"/user/restaurant/menu/removeFromCart/"
  var formData = {
    menuType : menuType,
    restaurantName : restaurantName,
    cartID  : cartID, 
    configName : configName, 
    itemName : itemName
  }
  //alert(JSON.stringify(formData))
   $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'text',
        success: function(result){
            if(result=="Success"){
               $(row).closest('tr').remove();
            }
            else{
              alert("Something went wrong")
            }
        },
        error : function(e) {
          alert("Couldn't send the request to server")
        }
    }); 
  
}

function ajaxCreateCart(){
  
  var areaName = $("#areas_select").val().split(" - ")[0]
  var address = $("#areas_select").val().slice(areaName.length+3)
  
  var restaurantName = $("#rest").val()
  var discountID = $("#discountCode").val()
  var url =window.location.origin+"/user/restaurant/menu/createCart/"
  
  var formData = {
    areaName : areaName,
    address : address, 
    restaurantName : restaurantName, 
    discountID : discountID
  }
   $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'json',
        success: function(result){
        $('#cartForm').empty();
        $('#cartForm').append("<input type='text' id='cartID' value='"+result[0].cartID+"' hidden></input><h2> My Cart </h2>"+
        "<table class='container py-5 table' id='cartItems'> <thead><tr> <th scope='col'>Name</th> <th scope='col'>Config</th> "+
        "<th scope='col'>Comment</th> <th scope='col'>Quantity</th><th scope='col'></th></tr> </thead><tbody id='cartItems'> </tbody> </table>" +
        "<div class='container py-1'><button class=' form-control btn btn-primary' id='calcOrder'>Calculate Total</button></div>"+
        "<div id='calcRes'></div><div class='container py-1'><button type='submit'"+
        " class='form-control btn btn-warning' id='placeOrder'>Place Order</button></div>");
  
        },
        error : function(e) {
          alert("Error in select")
        }
    }); 
  
}


function placeOrderPost(){
  
  var cartID =  $("#cartID").val() 
  var url = window.location.origin+"/user/restaurant/menu/placeOrder/"
  var formData = {
    cartID  : cartID
  }
   $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'json',
        success: function(result){

          window.location.href = window.location.origin + "/order"
        },
        error : function(e) {
          alert("Error connecting to server")
        }
    }); 
  
}

function calcOrderPost(){
  
  var cartID =  $("#cartID").val() 
  var url = window.location.origin+"/user/restaurant/menu/getCartTotal/"
  var formData = {
    cartID  : cartID
  }
   $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'json',
        success: function(result){
          //alert(JSON.stringify(result[0]))
          $('#calcRes').empty();
          $('#calcRes').html("<div class='container'><p> Total = "+result[0].total+"</p></div>");
          
        },
        error : function(e) {
          alert("Error connecting to server")
        }
    }); 
  
}


function ajaxGetAddresses(){
    var url =window.location.origin+"/user/address/byRestaurant/"+$("#rest").val()
    //alert(url)
    $.ajax({
      type : "GET",
      url : url, 
      success: function(result){
        
        $("#areas").empty();
        $("#areas").append("<label for='areas'>Select Address:</label><select class='form-control' id='areas_select' required>")
        
        $.each(result, function(i, area){
          $("#areas_select").append($('<option>', {
                    text: area.areaName +" - "+ area.addressLine1,
                    val: area.areaName+" - " + area.addressLine1
                }));
        });
        
        $("#areas_select").append("</select>")
        
        },
      error : function(e) {
        alert("ERROR "+JSON.stringify(e));
        console.log("ERROR: ", e);
      }
    });  
  }