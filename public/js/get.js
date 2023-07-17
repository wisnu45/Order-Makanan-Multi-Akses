$( document ).ready(function() {
  
  // GET REQUEST
  $("#allCustomers").click(function(event){
    event.preventDefault();
    ajaxGet();
  });
  
  // DO GET
  function ajaxGet(){
    $.ajax({
      type : "GET",
      url : window.location + "api/customers/all",
      success: function(result){
        $('#getResultDiv ul').empty();
        var custList = "";
        $.each(result, function(i, customer){
          $('#getResultDiv .list-group').append(customer.firstname + " " + customer.lastname + "<br>")
        });
        console.log("Success: ", result);
      },
      error : function(e) {
        $("#getResultDiv").html("<strong>Error</strong>");
        console.log("ERROR: ", e);
      }
    });  
  }
})