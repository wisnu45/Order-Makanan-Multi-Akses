

$( document ).ready(function() {
   $("#aaf").submit(function(event) {
    event.preventDefault();
    ajaxAddUser(this.id)
  });
  
  $("#asf").submit(function(event) {
    event.preventDefault();
    ajaxAddUser(this.id)
  });

   $("#cap").submit(function(event) {
    event.preventDefault();
   
    ajaxChangePass(this.id)
  });
  
  $("#csp").submit(function(event) {
    event.preventDefault();
  
    ajaxChangePass(this.id)
  });

  $("#raf").submit(function(event) {
    event.preventDefault();
   
    ajaxRemoveUser(this.id)
  });
  
  $("#rsf").submit(function(event) {
    event.preventDefault();
  
    ajaxRemoveUser(this.id)
  });

  $("#arf").submit(function(event) {
    event.preventDefault();
  
    ajaxAddRestaurant(this.id)
  });


  $("#mrf").submit(function(event) {
    event.preventDefault();
  
    ajaxAddRestaurant(this.id)
  });

  $("#rrf").submit(function(event) {
      event.preventDefault();
    
      ajaxRemoveRestaurant(this.id)
    });

    $("#drf").submit(function(event) {
      event.preventDefault();
    
      ajaxDelivery(this.id)
    });

     $("#daf").submit(function(event) {
      event.preventDefault();
    
      ajaxDelivery(this.id)
    });


    $("#amf").submit(function(event) {
    event.preventDefault();
  
    ajaxAddMenu(this.id)
  });


  $("#mmf").submit(function(event) {
    event.preventDefault();
  
    ajaxAddMenu(this.id)
  });

  $("#rmf").submit(function(event) {
      event.preventDefault();
    
      ajaxRemoveMenu(this.id)
    });


     $("#aif").submit(function(event) {
    event.preventDefault();
    
    ajaxAddMenuItem(this.id)
  });


  $("#mif").submit(function(event) {
    event.preventDefault();
  
    ajaxAddMenuItem(this.id)
  });

  $("#rif").submit(function(event) {
      event.preventDefault();
    
      ajaxRemoveMenuItem(this.id)
    });

 $("#aic").submit(function(event) {
    event.preventDefault();
    
    ajaxMenuItemConfig(this.id)
  });

  $("#ric").submit(function(event) {
      event.preventDefault();
    
      ajaxMenuItemConfig(this.id)
    });

    $("#adc").submit(function(event) {
    event.preventDefault();
    
    ajaxAddDiscount(this.id)
  });


  $("#mdc").submit(function(event) {
    event.preventDefault();
  
    ajaxAddDiscount(this.id)
  });

  $("#rdc").submit(function(event) {
      event.preventDefault();
    
      ajaxRemoveDiscount(this.id)
    });



  $("[id^='admins_select_']").click(function(event){
       ajaxSelectUsers(this.id, "admins")
  });

   $("[id^='staffs_select_']").click(function(event){
    
      ajaxSelectUsers(this.id, "staffs")
  });
   $("[id^='rests_select_']").click(function(event){
     
       ajaxSelectRestaurant(this.id)
  });
  $("[id^='cuisines_select_']").click(function(event){
     
       ajaxSelectCuisines(this.id)
  });
   $("[id^='codes_select_']").click(function(event){
     
       ajaxSelectCodes(this.id)
  });

  $("[id^='areas_select_']").click(function(event){
     
       ajaxSelectAreas(this.id)
  });

    function ajaxAddUser(id){
      
      // PREPARE FORM DATA
      var formData = {
        username : $("#uname_"+id).val(),
        password :  $("#pwd_"+id).val(), 
        phoneNo:    $("#num_"+id).val(),
        addressLine1: $("#add_"+id).val(),
        email: $("#email_"+id).val(),
        Fname : $("#fname_"+id).val(),
        Lname: $("#lname_"+id).val(),
        day: $("#day_"+id).val(),
        month: $("#month_"+id).val(),
        year: $("#year_"+id).val()
      }
      var url;
      if(id=='aaf'){
        url=window.location.origin+"/admin/CreateAdmin"
      }
      else if(id=='asf'){
        url=window.location.origin+"/admin/CreateStaff"

      }
      // DO POST
      $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(response) {
        var res = "res_"+id;
        $("#"+res).empty();
        $("#"+res).html("<p>Added!<p>")
        clearAddForm(id);
        
        },
        error : function(e) {
          alert("Something went wrong!")
          console.log("ERROR: ", e);
        }
      });
    }
    
    function ajaxChangePass(id){
      
      var username_select;
      if(id=="cap"){
        url = window.location.origin+"/admin/ChangeAdminPassword"
        username_select = "#admins_select_"+id
      }
      else{
        url = window.location.origin+"/admin/ChangeStaffPassword"
        username_select = "#staffs_select_"+id
      }
      var username = $(username_select).val()       
      var password = $("#pwd_"+id).val()

      // PREPARE FORM DATA
      var formData = {
        username : username,
        password : password
      }
     
      // DO POST
      $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(response) {
        var res = "res_"+id;
        $("#"+res).empty();
        $("#"+res).html("<p>Done!<p>")
        
        },
        error : function(e) {
          alert("Something went wrong!")
          console.log("ERROR: ", e);
        }
      });
    }

     function ajaxRemoveUser(id){
      
      var username_select;
      if(id=="cap"){
        url = window.location.origin+"/admin/RemoveAdmin"
        username_select = "#admins_select_"+id
      }
      else{
        url = window.location.origin+"/admin/RemoveStaff"
        username_select = "#staffs_select_"+id
      }
      var username = $(username_select).val()    

      // PREPARE FORM DATA
      var formData = {
        username : username
      }
     
      // DO POST
      $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(response) {
        var res = "res_"+id;
        $("#"+res).empty();
        $("#"+res).html("<p>Done!<p>")
        
        },
        error : function(e) {
          alert("Something went wrong!")
          console.log("ERROR: ", e);
        }
      });
    }

    function ajaxAddRestaurant(id){
      
      // PREPARE FORM DATA
      var url;
      var restaurantName;
      if(id=='arf'){
        url = window.location.origin+"/admin/restaurant/add"
        restaurantName = $("#name_"+id).val();
      }
      else{
        url = window.location.origin+"/admin/restaurant/modify"
        restaurantName = $("#rests_select_"+id).val();
      }
      
      var cuisine = $("#cuisines_select_"+id).val();
      var deliveryFee = $("#dfee_"+id).val();
      var address = $("#add_"+id).val();
      var taxPercent = $("#tax_"+id).val();
      var startHour = $("#sh_"+id).val();
      var endHour = $("#eh_"+id).val();
      
      var formData = {
        restaurantName : restaurantName,
        cuisine : cuisine,
        deliveryFee : deliveryFee,
        address : address,
        taxPercent : taxPercent,
        startHour : startHour,
        endHour : endHour
      }
      
      // DO POST
      $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'text',
        success : function(response) {
        var res = "res_"+id;
        if(response=="ok"){
          $("#"+res).empty();
          $("#"+res).html("<p>Done!<p>")
        }
        else if(response=="wrong")
        {
          $("#"+res).empty();
          $("#"+res).html("<p>Wrong fields!<p>")
        }
        else{
          $("#"+res).empty();
          $("#"+res).html("<p>Something went wrong!<p>")
        }
        },
        error : function(e) {
          alert("Something went wrong!")
          console.log("ERROR: ", e);
        }
      });
    }

    function ajaxRemoveRestaurant(id){
      
      // PREPARE FORM DATA
      var restaurantName = $("#rests_select_"+id).val();     
      
      var url = window.location.origin + "/admin/restaurant/remove"
      var formData = {
        restaurantName : restaurantName
      }
      
      // DO POST
      $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(response) {
        var res = "res_"+id;
       
        $("#"+res).empty();
        $("#"+res).html("<p>Done!<p>")
       
        },
        error : function(e) {
          alert("Something went wrong!")
          console.log("ERROR: ", e);
        }
      });
    }

     function ajaxDelivery(id){
      
      // PREPARE FORM DATA
      var restaurantName = $("#rests_select_"+id).val();  
      var areaName =  $("#areas_select_"+id).val(); 
      var url;
      if(id=="daf"){
        url = window.location.origin + "/admin/restaurant/addArea"
      }
      else{
        url = window.location.origin + "/admin/restaurant/removeArea"
      }
      
      var formData = {
        restaurantName : restaurantName,
        areaName : areaName
      }
      // DO POST
      $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(response) {
        var res = "res_"+id;
       
        $("#"+res).empty();
        $("#"+res).html("<p>Done!<p>")
       
        },
        error : function(e) {
          alert("Something went wrong!")
          console.log("ERROR: ", e);
        }
      });
    }

    function ajaxAddMenu(id){
      
      // PREPARE FORM DATA
      var url;
      var restaurantName = $("#rests_select_"+id).val();
      var menuType = $("#select_mtype_"+id).val();
      var startHour = $("#sh_"+id).val();
      var endHour = $("#eh_"+id).val();
      if(id=='amf'){
        url = window.location.origin+"/admin/restaurant/menu/addMenu"
        
      }
      else{
        url = window.location.origin+"/admin/restaurant/menu/modifyMenu"
      }
      
      var formData = {
        restaurantName : restaurantName,
        menuType : menuType,
        startHour : startHour,
        endHour : endHour
      }
      //alert(JSON.stringify(formData))
      
      
      // DO POST
      $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(response) {
        var res = "res_"+id;
       // alert(response.errno)
        if(response.errno || response.affectedRows==0){
            $("#"+res).empty();
            $("#"+res).html("<p>Something went wrong!<p>")
        }
        else{
         $("#"+res).empty();
         $("#"+res).html("<p>Done!<p>")
        }
        
        },
        error : function(e) {
          alert("Something went wrong!")
          console.log("ERROR: ", e);
        }
      });
    }

    function ajaxRemoveMenu(id){
      
      // PREPARE FORM DATA
      var url;
      var restaurantName = $("#rests_select_"+id).val();
      var menuType = $("#select_mtype_"+id).val();
      url = window.location.origin+"/admin/restaurant/menu/removeMenu"
      
      
      var formData = {
        restaurantName : restaurantName,
        menuType : menuType
      }
      //alert(JSON.stringify(formData))
      
      
      // DO POST
      $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(response) {
        var res = "res_"+id;
       // alert(response.errno)
        if(response.errno){
            $("#"+res).empty();
            $("#"+res).html("<p>Something went wrong!<p>")
        }
        else{
         $("#"+res).empty();
         $("#"+res).html("<p>Done!<p>")
        }
        
        },
        error : function(e) {
          alert("Something went wrong!")
          console.log("ERROR: ", e);
        }
      });
    }

    function ajaxAddMenuItem(id){
      
      // PREPARE FORM DATA
      
      var url;
      var restaurantName = $("#rests_select_"+id).val();
      var menuType = $("#select_mtype_"+id).val();
      var itemName = $("#in_"+id).val();
      var basePrice = $("#bp_"+id).val();
    
      if(id=='aif'){
        url = window.location.origin+"/admin/restaurant/menu/addItem"
        
      }
      else{
        url = window.location.origin+"/admin/restaurant/menu/modifyItem"
      }
      
      var formData = {
        restaurantName : restaurantName,
        menuType : menuType,
        itemName : itemName,
        basePrice : basePrice
      }
      
      
      // DO POST
      $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(response) {
        var res = "res_"+id;
       // alert(response.errno)
        if(response.errno || response.affectedRows == 0){
            $("#"+res).empty();
            $("#"+res).html("<p>Something went wrong!<p>")
        }
        else{
         $("#"+res).empty();
         $("#"+res).html("<p>Done!<p>")
        }
        
        },
        error : function(e) {
          alert("Something went wrong!")
          console.log("ERROR: ", e);
        }
      });
    }

     function ajaxRemoveMenuItem(id){
      
      // PREPARE FORM DATA
      var url;
      var restaurantName = $("#rests_select_"+id).val();
      var menuType = $("#select_mtype_"+id).val();
      var itemName = $("#in_"+id).val();
      url = window.location.origin+"/admin/restaurant/menu/removeItem"
      
      
      var formData = {
        restaurantName : restaurantName,
        menuType : menuType,
        itemName : itemName
      }
      //alert(JSON.stringify(formData))
      
      
      // DO POST
      $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(response) {
        var res = "res_"+id;
       // alert(response.errno)
        if(response.errno){
            $("#"+res).empty();
            $("#"+res).html("<p>Something went wrong!<p>")
        }
        else{
         $("#"+res).empty();
         $("#"+res).html("<p>Done!<p>")
        }
        
        },
        error : function(e) {
          alert("Something went wrong!")
          console.log("ERROR: ", e);
        }
      });
    }

    function ajaxMenuItemConfig(id){
      
      // PREPARE FORM DATA
      
      var url;
      var restaurantName = $("#rests_select_"+id).val();
      var menuType = $("#select_mtype_"+id).val();
      var itemName = $("#in_"+id).val();
      var configName = $("#select_cn_"+id).val();
    
      if(id=='aic'){
        url = window.location.origin+"/admin/restaurant/menu/addItemConfig"
        
      }
      else{
        url = window.location.origin+"/admin/restaurant/menu/removeItemConfig"
      }
      
      var formData = {
        restaurantName : restaurantName,
        menuType : menuType,
        itemName : itemName,
        configName : configName
      }
      
      
      // DO POST
      $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(response) {
        var res = "res_"+id;
       // alert(response.errno)
        if(response.errno || response.affectedRows == 0){
            $("#"+res).empty();
            $("#"+res).html("<p>Something went wrong!<p>")
        }
        else{
         $("#"+res).empty();
         $("#"+res).html("<p>Done!<p>")
        }
        
        },
        error : function(e) {
          alert("Something went wrong!")
          console.log("ERROR: ", e);
        }
      });
    }

    function ajaxAddDiscount(id){
      
      // PREPARE FORM DATA
      
      var url;
      var discountCode = $("#code_"+id).val();
      var day = $("#day_"+id).val();
      var month = $("#month_"+id).val();
      var year = $("#year_"+id).val();
      var rate = $("#rate_"+id).val();
    
      if(id=='adc'){
        url = window.location.origin+"/admin/discount/add"
        
      }
      else{
        url = window.location.origin+"/admin/discount/modify"
      }
      
      var formData = {
        discountCode : discountCode,
        day : day,
        month : month,
        year : year,
        rate : rate
      }
      
      
      // DO POST
      $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'text',
        success : function(response) {
        var res = "res_"+id;
       // alert(response.errno)
        if(response=="no"){
            $("#"+res).empty();
            $("#"+res).html("<p>Something went wrong!<p>")
        }
        else if(response=="inv"){
          $("#"+res).empty();
            $("#"+res).html("<p>Invalid rate (should be between 0 and 1)!<p>")
        }
        else{
         $("#"+res).empty();
         $("#"+res).html("<p>Done!<p>")
        }
        
        },
        error : function(e) {
          alert("Something went wrong!")
          console.log("ERROR: ", e);
        }
      });
    }

     function ajaxRemoveDiscount(id){
      
      // PREPARE FORM DATA
      var url;
      var discountCode = $("#codes_select_"+id).val();
      url = window.location.origin+"/admin/discount/remove"
      
      
      var formData = {
        discountCode : discountCode
      }
      //alert(JSON.stringify(formData))
      
      
      // DO POST
      $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(response) {
        var res = "res_"+id;
       // alert(response.errno)
        if(response.errno){
            $("#"+res).empty();
            $("#"+res).html("<p>Something went wrong!<p>")
        }
        else{
         $("#"+res).empty();
         $("#"+res).html("<p>Done!<p>")
        }
        
        },
        error : function(e) {
          alert("Something went wrong!")
          console.log("ERROR: ", e);
        }
      });
    }
    


    function ajaxSelectUsers(id, type){
          var tag = id.slice(id.length-3)
          var select_tag = type+"_select_"+tag;
          var field = "#"+type+"_"+tag
          var sel;
          var url;
          if(type=="admins"){
              url = window.location.origin+"/admin/admins"
              sel = "Admin Username: ";
          }
          
          else {
              url = window.location.origin+"/admin/staffs"
              sel = "Staff Username: ";
          }
          // DO POST
          $.ajax({
            type : "GET",
            url : url,
            dataType : 'json',
            success : function(result) {
            
              $(field).empty();
              $(field).append("<label>"+sel+"</label><select class='form-control' id='"+select_tag+"'>")
          //$("#"+select_tag).empty()
            $.each(result, function(i, user){
            
              $("#"+select_tag).append($('<option>', {
                        text: user.username,
                        val: user.username
                    }));
            });
            
            $(field).append("</select>")
            
            },
            error : function(e) {
              alert("Something went wrong!")
              console.log("ERROR: ", e);
            }
          });
    }

     function ajaxSelectRestaurant(id){
          var tag = id.slice(id.length-3)
          var select_tag = "rests_select_"+tag;
          var field = "#rests_"+tag
          var sel = "Restaurant Name";
          var url;
          url = window.location.origin+"/admin/restaurant/all";
              
          // DO POST
          $.ajax({
            type : "GET",
            url : url,
            dataType : 'json',
            success : function(result) {
            
              $(field).empty();
              $(field).append("<label>"+sel+"</label><select class='form-control' id='"+select_tag+"'>")
         // $("#"+select_tag).empty()
            $.each(result, function(i, rest){
            
              $("#"+select_tag).append($('<option>', {
                        text: rest.restaurantName,
                        val: rest.restaurantName
                    }));
            });
            
            $(field).append("</select>")
            
            },
            error : function(e) {
              alert("Something went wrong!")
              console.log("ERROR: ", e);
            }
          });
    }


    function ajaxSelectCuisines(id){
          var tag = id.slice(id.length-3)
          var select_tag = "cuisines_select_"+tag;
          var field = "#cuisines_"+tag
          
          var url;
          url = window.location.origin+"/user/cuisines";
              
          // DO POST
          $.ajax({
            type : "GET",
            url : url,
            dataType : 'json',
            success : function(result) {
            
              $(field).empty();
              $(field).append("<label>Cuisine</label><select class='form-control' id='"+select_tag+"'>")
          
            $.each(result, function(i, cuisine){
            
              $("#"+select_tag).append($('<option>', {
                        text: cuisine.cuisineName,
                        val: cuisine.cuisineName
                    }));
            });
            
            $(field).append("</select>")
            
            },
            error : function(e) {
              alert("Something went wrong!")
              console.log("ERROR: ", e);
            }
          });
    }

    function ajaxSelectAreas(id){
          var tag = id.slice(id.length-3)
          var select_tag = "areas_select_"+tag;
          var field = "#areas_"+tag
          
          var url;
          url = window.location.origin+"/user/areas";
              
          // DO POST
          $.ajax({
            type : "GET",
            url : url,
            dataType : 'json',
            success : function(result) {
            
              $(field).empty();
              $(field).append("<label>Area: </label><select class='form-control' id='"+select_tag+"'>")
          
            $.each(result, function(i, area){
            
              $("#"+select_tag).append($('<option>', {
                        text: area.areaName,
                        val: area.areaName
                    }));
            });
            
            $(field).append("</select>")
            
            },
            error : function(e) {
              alert("Something went wrong!")
              console.log("ERROR: ", e);
            }
          });
    }


    function ajaxSelectCodes(id){
          var tag = id.slice(id.length-3)
          var select_tag = "codes_select_"+tag;
          var field = "#codes_"+tag
          
          var url;
          url = window.location.origin+"/admin/discount/all";
              
          // DO POST
          $.ajax({
            type : "GET",
            url : url,
            dataType : 'json',
            success : function(result) {
            
              $(field).empty();
              $(field).append("<label>Discount Code</label><select class='form-control' id='"+select_tag+"'>")
          
            $.each(result, function(i, code){
            
              $("#"+select_tag).append($('<option>', {
                        text: code.discountID,
                        val: code.discountID
                    }));
            });
            
            $(field).append("</select>")
            
            },
            error : function(e) {
              alert("Something went wrong!")
              console.log("ERROR: ", e);
            }
          });
    }


    function clearAddForm(id){
        $("#uname_"+id).val("")
        $("#pwd_"+id).val("")
        $("#num_"+id).val("")
        $("#add_"+id).val("")
        $("#email_"+id).val("")
        $("#fname_"+id).val("")
        $("#lname_"+id).val("")
        $("#day_"+id).val("")
        $("#month_"+id).val("")
        $("#year_"+id).val("")
    }


});

