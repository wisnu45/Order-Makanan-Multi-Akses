$( document ).ready(function() {
  // SUBMIT FORM
    $("#updateForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    ajaxPostUpdate();
  });

  $("#addressForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    ajaxPostAddress();
  });
  $("#areas_select").click(function(event){
    event.preventDefault();
    
    ajaxGetAreas("#areas");
  });

  $("#areas_select_m").click(function(event){
    event.preventDefault();
    
    ajaxGetAddresses();
  });

   $("#del").click(function(event){
    event.preventDefault();
    
    ajaxDelAddress();
  });
    
    
    function ajaxPostUpdate(){
      
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
      url :window.location.origin+"/user/changeInfo",
      data : JSON.stringify(formData),
      dataType : 'json',
      success : function(response) {
       
        alert("Info Updated!") 
      },
      error : function(e) {
        alert("Error!")
        console.log("ERROR: ", e);
      }
    });
      
 
    }
    

   function ajaxPostAddress(){
      
      // PREPARE FORM DATA
      var formData = {
        areaName :  $("#areas_s").val(),
        address1 : $("#addtext").val()
      }
      //alert(JSON.stringify(formData))
      // DO POST
      $.ajax({
      type : "POST",
      contentType : "application/json",
      url : window.location.origin+"/user/address/add",
      data : JSON.stringify(formData),
      dataType : 'json',
      success : function(response) {
        
        $("#addRes").html("<p> Address Added! <br> </p>"); 
      },
      error : function(e) {
        alert("Error!")
        console.log("ERROR: ", e);
      }
    });
      
 
    } 
  function ajaxGetAreas(field){
    $.ajax({
      type : "GET",
      url : window.location.origin+"/user/areas",
      success: function(result){
        var in_field = field+"_s"
        //alert(field+" "+in_field)
        $(field).empty();
        $(field).append("<label for='areas'>Select Area:</label><select class='form-control' id='"+in_field.slice(1)+"'>")
       
        $.each(result, function(i, area){
          $(in_field).append($('<option>', {
                    text: area.areaName,
                    val: area.areaName
                }));
        });
        
        $(field).append("</select>")
        $('#add1').empty();
        $('#add1').append("<label >Address</label> <input type='text' class='form-control' id='addtext' placeholder='address desciption' required></input>");
      
      },
      error : function(e) {
        alert("ERROR "+JSON.stringify(e));
        console.log("ERROR: ", e);
      }
    });  
  }
  function ajaxGetAddresses(){
    var url =window.location.origin+"/user/address/all/"+$("#uname").val()
    //alert(url)
    $.ajax({
      type : "GET",
      url : url, 
      success: function(result){
        
        $("#areas_m").empty();
        $("#areas_m").append("<label for='areas'>Select Address:</label><select class='form-control' id='areas_m_select'>")
    
        $.each(result, function(i, area){
          $("#areas_m_select").append($('<option>', {
                    text: area.areaName +" - "+ area.addressLine1,
                    val: area.areaName+" - " + area.addressLine1
                }));
        });
        
        $("#areas_m").append("</select>")
        
        },
      error : function(e) {
        alert("ERROR "+JSON.stringify(e));
        console.log("ERROR: ", e);
      }
    });  
  }
  function ajaxDelAddress(){
    var area = $("#areas_m_select").val().split(" - ")[0]
    var desc = $("#areas_m_select").val().slice(area.length+3)
    var url =window.location.origin+"/user/address/remove/"+$("#uname").val()+"/"+area+"/"+desc
    //alert(url)
    $.ajax({
      type : "POST",
      url : url, 
      success: function(result){
        $("#modRes").empty()
        $("#modRes").html("<p>Deleted!</p>")    
        ajaxGetAddresses()    
      },
      error : function(e) {
        alert("ERROR "+JSON.stringify(e));
        console.log("ERROR: ", e);
      }
    });  
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