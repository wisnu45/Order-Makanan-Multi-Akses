$( document ).ready(function() {
  
   

  // GET REQUEST
  $("#restSearch").submit(function(event){
    event.preventDefault();
    ajaxGet();
  });

  $("#areas_select").click(function(event){
    event.preventDefault();
    ajaxGetAreas();
  });
  $("#cuisines_select").click(function(event){
    event.preventDefault();
    ajaxGetCuisines();
  });
  
  // DO GET
  function ajaxGet(){
    var formData = {
        search : $("#search").val(),
        password :  $("#pwd").val(),
        areaName :  $("#areas_s").val(),
        cuisine :  $("#cuisines_s").val()
      }
     // alert(JSON.stringify(formData))
    $.ajax({
      type : "POST",
      contentType : "application/json",
      url : "./user/restaurants",
      data : JSON.stringify(formData),
      dataType : 'json',
      success: function(result){
        $('#rests').empty();
        $.each(result, function(i, restaurant){
          $('#rests').append("<tr> <th scope='row'> <a href='user/restaurantMenu/"+restaurant.restaurantName+"''> "+
          restaurant.restaurantName + "</a></th> <td> "+
          restaurant.cuisine + "</td> <td> "+
          restaurant.startHour + "</td> <td> "+
          restaurant.endHour + "</td></tr>")
        });
        console.log("Success: ", result);
      },
      error : function(e) {
        $("#searchResults").html("<strong>Error</strong>");
        console.log("ERROR: ", e);
      }
    });  
  }

  function ajaxGetAreas(){

    $.ajax({
      type : "GET",
      url : "./user/areas",
      success: function(result){
        $('#areas').empty();
        $('#areas').append("<label for='areas'>Select area:</label><select class='form-control 'id='areas_s'>")
        $('#areas_s').append($('<option>', {
                    text: "",
                    val: ""
                }));
        $.each(result, function(i, area){
          $('#areas_s').append($('<option>', {
                    text: area.areaName,
                    val: area.areaName
                }));
        });
        
        $('#areas').append("</select>")
      },
      error : function(e) {
        alert("ERROR "+JSON.stringify(e));
        console.log("ERROR: ", e);
      }
    });  
  }
  function ajaxGetCuisines(){

    $.ajax({
      type : "GET",
      url : "./user/cuisines",
      success: function(result){
        $('#cuisines').empty();
        $('#cuisines').append("<label for='cuisines'>Select cuisine:</label><select class='form-control 'id='cuisines_s'>")
         $('#cuisines_s').append($('<option>', {
                    text: "",
                    val: ""
                }));
        $.each(result, function(i, cuisine){
          $('#cuisines_s').append($('<option>', {
                    text: cuisine.cuisineName
                }));
        });
        
        $('#cuisines').append("</select> ")
      },
      error : function(e) {
        alert("ERROR "+JSON.stringify(e));
        console.log("ERROR: ", e);
      }
    });  
  }
})