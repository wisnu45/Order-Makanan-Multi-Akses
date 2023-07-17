

$( document ).ready(function() {

$("#refresh").click(function(event){
  
  event.preventDefault();
  ajaxGet();
});
$(document).on("click", 'button[id$="_ch"]', function(){
   //event.preventDefault();
  changeStatusPost(this);
})

// DO GET
function ajaxGet(){
  
  $.ajax({
    type : "POST",
    contentType : "application/json",
    data : JSON.stringify({}),
    dataType : 'json',
    url : window.location.origin + "/staff/viewOrders",
    success: function(result){
     

      $('#tracking').empty();
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
             var dd="";
            var button_id = order.cartID.toString()+'_ch'
            var select_id = order.cartID.toString()+'_s'
            var restName=result[0].restaurantName
            dd+="<tr> <th scope='row'>"+order.cartID + "</th> <td> "+restName+ "</td><td> "+order.orderedByName + "</td><td> "+order.statusName + "</td>"
            dd+="<td> <select id ='"+select_id+"'> <option value='Received'>Received</option>"
            dd+="<option value='Preparing'>Preparing</option>"
            dd+="<option value='Out For Delivery'>Out For Delivery</option>"
            dd+="<option value='Delivered'>Delivered</option>"
            dd+="<option value='Cancelled'>Cancelled</option></td>"
            dd+="<td> <button class= 'btn btn-success' id= '"+button_id+"'> Submit</button></td>"+
            "<td><a class = 'btn btn-primary' href='/user/restaurant/menu/getCart/"+order.cartID+"'> View Details</a></td></tr>"
            $('#tracking').append(dd)
            $("#"+select_id).val(order.statusName)
          },
          error : function(e) {
            
            console.log("ERROR: ", e);
          }
        })
        
      });
      console.log("Success: ", result);
    },
    error : function(e) {
      $("#searchResults").html("<strong>Error</strong>");
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
