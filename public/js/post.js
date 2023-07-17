$( document ).ready(function() {
  
  // SUBMIT FORM
    $("#customerForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    ajaxPost();
  });
    
    
    function ajaxPost(){
      
      // PREPARE FORM DATA
      var formData = {
        firstname : $("#firstname").val(),
        lastname :  $("#lastname").val()
      }
      
      // DO POST
      $.ajax({
      type : "POST",
      contentType : "application/json",
      url : window.location + "api/customers/save",
      data : JSON.stringify(formData),
      dataType : 'json',
      success : function(customer) {
        $("#postResultDiv").html("<p>" + 
          "Post Successfully! <br>" +
          "--->" + JSON.stringify(customer)+ "</p>"); 
      },
      error : function(e) {
        alert("Error!")
        console.log("ERROR: ", e);
      }
    });
      
      // Reset FormData after Posting
      resetData();
 
    }
    
    function resetData(){
      $("#firstname").val("");
      $("#lastname").val("");
    }
})