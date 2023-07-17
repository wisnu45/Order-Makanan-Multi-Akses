

$( document ).ready(function() {
      ajaxGet();
      $("#refresh").click(function(event){
        
        event.preventDefault();
        ajaxGet();
      });
// DO GET
function ajaxGet(){
  
  $.ajax({
    type : "POST",
    contentType: "application/json",
    data : JSON.stringify({}),
    dataType : 'json',
    url : window.location.origin + "/user/restaurant/menu/getCart/"+cartID.value,
    success: function(result){
     
      $('#items').empty();
      $.each(result, function(i, order){
       
        var formData = {
          restaurantID : order.restaurantID
        }
        $.ajax({
          type : "POST",
          contentType: 'application/json',
          data : JSON.stringify(formData),
          dataType: 'json',
          url : window.location.origin + "/user/getName",
          success: function(result){
            var restName=result[0].restaurantName
            $('#items').append("<tr> <th scope='row'>"+restName+ "</th> <td> "+order.menuType+ "</td><td> "+
            order.menuItemName + "</td><td> "+order.configName + "</td><td> "+order.quantity + "</td><td> "
            +order.comment + "</td></tr>")
        
          },
          error : function(e) {
            alert("err")
            console.log("ERROR: ", e);
          }
        })
        
      });
      console.log("Success: ", result);
    },
    error : function(e) {
      
      console.log("ERROR: ", e);
    }
  }); 

  $.ajax({
    type : "POST",
    contentType : 'application/json',
    data : JSON.stringify({cartID:cartID.value}),
    dataType : 'json',
    url : window.location.origin + "/user/restaurant/menu/getCartTotal/",
    success: function(result){
     

      $('#total').empty();
     $('#total').html("<p>Total: "+ result[0].total+"</p>");
      console.log("Success: ", result);
    },
    error : function(e) {
      
      console.log("ERROR: ", e);
    }
  });
} 


function changeStatusPost(row){
  var cartID = row.id.substr(0,row.id.length-3)
  var statusName = $("#"+cartID+"_s").val()
  var formData = {
      cartID : cartID,
      statusName : statusName
  }
  $.ajax({
    type : "POST",
    contentType : "application/json",
    data : JSON.stringify(formData),
    dataType : 'json',
    url : window.location.origin + "/staff/changeOrderStatus",
    success: function(result){
          alert("Done!");
    },
    error : function(e) {
      $("#searchResults").html("<strong>Error</strong>");
      console.log("ERROR: ", e);
    }
  }); 
} 



});
