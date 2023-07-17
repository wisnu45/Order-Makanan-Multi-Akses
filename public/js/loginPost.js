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
        password :  $("#pwd").val()
      }
      // DO POST
      $.ajax({
      type : "POST",
      contentType : "application/json",
      url : window.location + "user/login",
      data : JSON.stringify(formData),
      dataType : 'json',
      success : function(response) {
        if(response.length){            
         
          var formData2 = {
            user : [response[0].username, response[0].userType]
          }
          $.ajax({
            type : "POST",
            contentType : "application/json",
            url : window.location + "auth/register",
            data : JSON.stringify(formData2),
            dataType : 'json',
            success : function(response2) {
              //  $("#postresult").html("<p>" + 
              //     "Current Reponse " + response.token +  "</p>");
              if(response2.token){
                var formData3 = {
                  token : response2.token
                }
                 $.ajax({
                    type : "POST",
                    contentType : "application/json",
                    url : window.location + "home",
                    data : JSON.stringify(formData3),
                    dataType : 'json',
                    success : function(response3) {
                        window.location.href = "home"
                    },
                    error : function(e) {        $("#postresult").html("<p>" + 
                "Something went wrong "+ "</p>"); 
                    }
                  });
              
              }
              else
                $("#postresult").html("<p>" + 
                  "Failed to register token" + response +  "</p>");
              },            
            error : function(e2) {
              console.log("ERROR: ", e2);
              alert("Error22!")
            }
          }); 
        }
        else  $("#postresult").html("<p>" + 
                "Login Unsuccessful "+ "</p>"); 
      }, 
        error : function(e3) {
              alert("Error2!")
              console.log("ERROR: ", e3);
        }
      });
              
      
      // Reset FormData after Posting
     $("#uname").val("");
      $("#pwd").val("");
      $("#postresult").val("");
 
    }
});
  
    
  