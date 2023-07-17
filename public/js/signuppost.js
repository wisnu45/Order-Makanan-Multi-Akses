$( document ).ready(function() {
  
  // SUBMIT FORM
    $("#signUpForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    ajaxPost();
  });
    
    
    function ajaxPost(){
      
      // PREPARE FORM DATA
      var formData = {
        username : $("#uname").val(),
        password :  $("#pwd").val(), 
        phoneNo:    $("#num").val(),
        addressLine1: $("#add").val(),
        email: $("#email").val(),
        Fname : $("#fname").val(),
        Lname: $("#lname").val(),
        day: $("#day").val(),
        month: $("#month").val(),
        year: $("#year").val()
      }
      
      // DO POST
      $.ajax({
      type : "POST",
      contentType : "application/json",
      url :"./user/signup",
      data : JSON.stringify(formData),
      dataType : 'json',
      success : function(response) {
       window.location.href = "./home"
      },
      error : function(e) {
        alert("Something went wrong")
      }
    });
      
      // Reset FormData after Posting
      resetData();
 
    }
    
    function resetData(){
      $("#uname").val("");
      $("#pwd").val("");
      $("#num").val("");
      $("#add").val("");
      $("#email").val("")
      $("#fname").val("");
      $("#lname").val("");
      $("#day").val("");
      $("#month").val("");
      $("#year").val("");
    }
})