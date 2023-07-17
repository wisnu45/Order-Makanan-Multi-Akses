$( document ).ready(function() {
  
  // SUBMIT FORM
    $("#loginForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    ajaxPost();
  });
    
    
    function ajaxPost(){
      
      // PREPARE FORM DATA
      var formData = {
        username : $("#uname").val(),
      }
      
      // DO POST
      $.ajax({
      type : "POST",
      contentType : "application/json",
      url : "./user/forgotPassword",
      data : JSON.stringify(formData),
      dataType : 'json',
      success : function(response) {
        window.location.href = "./"
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
      $("#uname").val("");
    
    }
})