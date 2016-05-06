$(function(){

  /***********************************************************
   *
   *                  Application Data Model
   *
   *  One model implemented for each category in the menu.
   *  User_Cart_Model contains current user info, given that
   *  user is logged in, along with purchases user made during
   *  this session.
   **********************************************************/

   /***** Start Model *****/
    var Pizza_Menu_Model = Backbone.Model.extend({
        defaults: {
          "menu" : ['Cheese','Meat','Veggie','Pepperoni','Alfredo','Spinach','Ham'],
          "small_price" : 11.99,
          "medium_price" : 13.99,
          "large_price" : 15.99,
          "x_large_price" : 17.99
        },
        initialize : function () {
        }
    });

    var Sides_Menu_Model = Backbone.Model.extend({
        defaults: {
          "menu" : ['Stuffed Cheese','Spinach Cheese','Jalapeno Cheese','Parmesan','Breadsticks'],
          "stuffed_cheese" : 5.99,
          "spinach_cheese" : 5.99,
          "jalapeno_cheese" : 5.99,
          "parmesan" : 2.99,
          "breadsticks" : 3.99
        },
        initialize : function () {
        }
    });

    var Drinks_Menu_Model = Backbone.Model.extend({
        defaults: {
          "menu" : ['Coke','Coke Zero','Diet Coke','Sprite','Dasani','Fanta'],
          "oz_20" : 1.79,
          "liter_2" : 2.99
        },
        initialize : function () {
        }
    });

    var Desserts_Menu_Model = Backbone.Model.extend({
        defaults: {
          "menu" : ['Cinnamon','Apple Pizza','Brownies','Bavarian'],
          "price" : 3.99
        },
        initialize : function () {
        }
    });

   /***********************************
          Cart Model for user's cart.
   ************************************/
    var User_Cart_Model = Backbone.Model.extend({
        defaults: {
          "current_cart" : [],
          "current_cart_quantity" : [],
          "current_cart_category" : [],
          "total" : 0.00,
          "current_selection" : "Pizza",
          "current_prc" : [],
          "customer" : {},
        },
        initialize : function () {
          this.on('change:total', function() {
            console.log("Cart has been updated.");
          });
        }
    });
    /***** End Model *****/

    /***********************************************************
                          Application View
     **********************************************************/

     /******************************************************************************
     * Using UnderscoreJS's templating feature to implement vairous view componets
     * of our application.
     *****************************************************************************/

    /***** Main Content View *****/

    var Content_View = Backbone.View.extend({
      tagName : 'div',

      content_Tpl : _.template("" +
      "<div class=\"page-header\"> " +
      "  <h1 id=\"header-detail\" style=\"color: white;\">Pick your kind of Pizza.</h1> " +
      "</div>" +
      "<div class=\"row\">" +
        "<div id=\"one\" class=\"col-md-4\">" +
          "<button id=\"i-0\" class=\"thumbnail\">" +
            "<img src=\"\">" +
            "<div class=\"caption\">" +
              "<h4></h4>" +
            "</div>" +
          "</button>" +
          "<button id=\"i-3\" class=\"thumbnail\">" +
            "<img src=\"\">" +
            "<div class=\"caption\">" +
              "<h4></h4>" +
            "</div>" +
          "</button>" +
          "<button id=\"i-6\" class=\"thumbnail\">" +
            "<img src=\"\">" +
            "<div class=\"caption\">" +
              "<h4></h4>" +
            "</div>" +
          "</button>" +
        "</div>" +
        "<div id=\"two\" class=\"col-md-4\">" +
          "<button id=\"i-1\" class=\"thumbnail\">" +
            "<img src=\"\">" +
            "<div class=\"caption\">" +
              "<h4></h4>" +
            "</div>" +
          "</button>" +
          "<button id=\"i-4\" class=\"thumbnail\">" +
            "<img src=\"\">" +
            "<div class=\"caption\">" +
              "<h4></h4>" +
            "</div>" +
          "</button>" +
          "<button id=\"i-7\" class=\"thumbnail\">" +
            "<img src=\"\">" +
            "<div class=\"caption\">" +
              "<h4></h4>" +
            "</div>" +
          "</button>" +
        "</div>" +
        "<div id=\"three\" class=\"col-md-4\">" +
          "<button id=\"i-2\" class=\"thumbnail\">" +
            "<img src=\"\">" +
            "<div class=\"caption\">" +
              "<h4></h4>" +
            "</div>" +
          "</button>" +
          "<button id=\"i-5\" class=\"thumbnail\">" +
            "<img src=\"\">" +
            "<div class=\"caption\">" +
              "<h4></h4>" +
            "</div>" +
          "</button>" +
          "<button id=\"i-8\" class=\"thumbnail\">" +
            "<img src=\"\">" +
            "<div class=\"caption\">" +
              "<h4></h4>" +
            "</div>" +
          "</button>" +
        "</div>" +
      "</div><br><br>"
      ),

      events : {
        'dblclick label' : 'print'
      },

      initialize : function (options) {
        this.options = options || {};
        this.render();
      },

      render : function () {
        $('#content').html( this.content_Tpl());
        console.log("Initialization Complete..!");
        return this;
      },

      print : function () {
        console.log("Cart has been updated.");
      }
    });
    /***** End View *****/

  /***********************************************************************************************
   *
   *                              Application Controller
   *
   *  Custom built application controller. Backbone JS does not provide functionality within it.
   *  Thus, we implement our custom controller taht suits our application.
   ************************************************************************************************/
    controller = {
        // Initialize models;
        pizzas_opt : new Pizza_Menu_Model(),
        sides_opt : new Sides_Menu_Model(),
        drinks_opt : new Drinks_Menu_Model(),
        desserts_opt : new Desserts_Menu_Model(),
        user_cart : new User_Cart_Model(),
        // c : new Content_View(),

        // Setting tab swtich controls. Render Appropriate View based on user selection.
        setSelection: function() {
            $('#Pizza').click(function() {
                if(controller.user_cart.get("current_selection") !== "Pizza") {
                    $('#Pizza').addClass("active");
                    $('#'+controller.user_cart.get("current_selection")).removeClass("active");
                    controller.user_cart.set("current_selection","Pizza");
                    $('#header-detail').html("Pick your kind of Pizza.");
                    update_view.render_pizza();
                    $('body').css("background-image", "url(pics/bg.jpg)");
                }
            });

            $('#Sides').click(function() {
                if(controller.user_cart.get("current_selection") !== "Sides") {
                    $('#Sides').addClass("active");
                    $('#'+controller.user_cart.get("current_selection")).removeClass("active");
                    controller.user_cart.set("current_selection","Sides");
                    $('#header-detail').html("Fill in your Sides.");
                    update_view.render_sides();
                    $('body').css("background-image", "url(pics/bst.jpg)");
                }
            });

            $('#Drinks').click(function() {
                if(controller.user_cart.get("current_selection") !== "Drinks") {
                    $('#Drinks').addClass("active");
                    $('#'+controller.user_cart.get("current_selection")).removeClass("active");
                    controller.user_cart.set("current_selection","Drinks");
                    $('#header-detail').html("Add in some Drinks.");
                    update_view.render_drink();
                    $('body').css("background-image", "url(pics/pop.jpg)");
                }
            });

            $('#Desserts').click(function() {
                if(controller.user_cart.get("current_selection") !== "Desserts") {
                    $('#Desserts').addClass("active");
                    $('#'+controller.user_cart.get("current_selection")).removeClass("active");
                    controller.user_cart.set("current_selection","Desserts");
                    $('#header-detail').html("Choose from  our Desserts.");
                    update_view.render_dessert();
                    $('body').css("background-image", "url(pics/ds.jpg)");
                }
            });
        },

        processCheckout: function() {
            $('#summary').click(function() {
                $('#order-detail').empty();
                if(controller.user_cart.get("current_cart").length == 0) {
                    var empty = "<p class=\"text-muted\">Order contains no items.</p>";
                    $('#order-detail').append(empty);
                    $('#checkout').addClass("disabled");
                } else {
                    $('#checkout').removeClass("disabled");
                    for(var i=0; i<controller.user_cart.get("current_cart").length; i++) {
                        var item_total = controller.user_cart.get("current_cart_quantity")[i] * controller.user_cart.get("current_prc")[i];
                        var order_item = "<li class=\"list-group-item\"><strong>" + controller.user_cart.get("current_cart_category")[i] + ",  " +
                        controller.user_cart.get("current_cart")[i] + ": Qty - " + controller.user_cart.get("current_cart_quantity")[i] +
                        " <span style=\"float: right;\">$" + item_total.toFixed(2) + "</span></strong></li>";
                        $('#order-detail').append(order_item);
                        controller.user_cart.set("total",(controller.user_cart.get("total")+item_total));
                    }
                }

                var order_total = "<strong> Total: <span style=\"float: right;\"> $" + controller.user_cart.get("total").toFixed(2) + "</span></strong>";
                $('#total').html(order_total);

                //list address
                if(controller.user_cart.get("customer")['username'] == null){
                    var noaddress = "<p class=\"text-muted\">You are not logged in.</p>";
                    $('#address_detail').append(noaddress);
                }
                else { //print out customer info
                var address_info = "<p class=\"text-muted\"> Name: " + controller.user_cart.get("customer")['username'] + "</p>" +
                "<p class=\"text-muted\">Address: " +  controller.user_cart.get("customer")['address'] + ", " + controller.user_cart.get("customer")['city'] + ", " + controller.user_cart.get("customer")['state'] +  ", " + controller.user_cart.get("customer")['zip'] + "</p>" +
                "<p class=\"text-muted\">Phone: " +  controller.user_cart.get("customer")['phone'] + "</p>";
                $('#address_detail').html(address_info);
                }

            });

            // Submit order here. User is prompted to login in or signup inorder to process delivery.

            $('#checkout').click(function() {
                if($('#c').prop("checked")) {
                    controller.user_cart.get("customer")['carryout'] = "Carryout";
                    alert('Your order will be ready for pickup in 15-30 minutes');
                } else {
                    controller.user_cart.get("customer")['carryout'] = "Delivery";
                    alert('Your order will arrive in up to 30 minutes');
                }

                var order = {"Category" : controller.user_cart.get("current_cart_category"),
                             "Quantity" : controller.user_cart.get("current_cart_quantity"),
                             "Price_per_item" : controller.user_cart.get("current_prc"),
                             "Total" : controller.user_cart.get("total"),
                             "Customer" : controller.user_cart.get("customer")};
                console.log(controller.user_cart.get("customer"));

                $.ajax({url: "checkout.php",
                        type: "post",
                        datatype: "json",
                        data: {"checkout" : "true" ,"cart":JSON.stringify(order)},
                        success: function(data) {
                            console.log(data);
                            window.location.reload();
                            var notify = "<div class=\"alert alert-warning alert-dismissible\" role=\"alert\">" +
                                         "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
                                         "<span aria-hidden=\"true\">&times;</span></button>" +
                                         "<strong>Thank You!</strong> Your order has been submitted.</div>";
                            $('#content').prepend(notify);
                        }
                    }
                );
            });


            $('#submit').click(function() { //sumbit button and form
                controller.user_cart.get("customer")['username'] = $('#uname').val();
                controller.user_cart.get("customer")['password'] = $('#pword').val();
                controller.user_cart.get("customer")['phone'] = $('#phone').val();
                controller.user_cart.get("customer")['address'] = $('#address').val();
                controller.user_cart.get("customer")['city'] = $('#city').val();
                controller.user_cart.get("customer")['state'] = $('#state').val();
                controller.user_cart.get("customer")['zip']  = $('#zip').val();

                $.getJSON('accounts.txt', function(json) {
                    var accounts = json;
                    var size = Object.keys(accounts).length;
                    var addobject = {};
                    addobject.username = controller.user_cart.get("customer")['username'];
                    addobject.password = controller.user_cart.get("customer")['password'];
                    addobject.address = controller.user_cart.get("customer")['address'];
                    addobject.city = controller.user_cart.get("customer")['city'];
                    addobject.state = controller.user_cart.get("customer")['state'];
                    addobject.zipcode = controller.user_cart.get("customer")['zip'];
                    addobject.phone = controller.user_cart.get("customer")['phone'];

                    //console.log(addobject);
                    //accounts.push(addobject);

                    //push back to JSON/txt file still needs solving
                    json.push(addobject);
                    console.log(json);
                    json = JSON.stringify(json);
                    alert('Welcome : ' +  controller.user_cart.get("customer")['username'] + '!');
                });
            });

            $('#login').click(function() { //login button

                $.getJSON('accounts.txt', function(json) {
                    var accounts = json;
                    var size = Object.keys(accounts).length;
                    var validuser = false;
                    console.log(accounts);
                    console.log($('#username').val());
                    console.log($('#password').val());
                    for(var x=0; x < size; x++){
                      if($('#username').val() == accounts[x].username){
                        if($('#password').val() == accounts[x].password){
                            controller.user_cart.get("customer")['username'] = $('#username').val();
                            controller.user_cart.get("customer")['password'] = $('#password').val();
                            controller.user_cart.get("customer")['phone'] = accounts[x].phone;
                            controller.user_cart.get("customer")['address'] = accounts[x].address;
                            controller.user_cart.get("customer")['city'] = accounts[x].city;
                            controller.user_cart.get("customer")['state'] = accounts[x].state;
                            controller.user_cart.get("customer")['zip']  = accounts[x].zipcode;
                            validuser = true;
                        }
                      }
                    }
                   if(validuser){
                     alert('Welcome : ' +  controller.user_cart.get("customer")['username'] + '!');
                   }
                   else{
                     alert('Invalid Username/Password');
                   }
                });
            });

            $('#logout').click(function() { //login button
               $.ajax({url: "checkout.php",
                    type: "post",
                    datatype: "json",
                    success: function(data) {
                      window.location.reload();
                    }
                  }
                );
            });
        },

        updateTotal: function(i) {
            if(controller.user_cart.get("current_selection") == "Pizza") {
                controller.user_cart.get("current_prc")[i] = controller.pizzas_opt.get("medium_price");
                controller.user_cart.get("current_cart_category")[i] = "Pizza";
            }
            else if(controller.user_cart.get("current_selection") == "Sides") {
                controller.user_cart.get("current_prc")[i] = controller.sides_opt.get("breadsticks");
                controller.user_cart.get("current_cart_category")[i] = "Sides";
            }
            else if(controller.user_cart.get("current_selection") == "Drinks") {
                controller.user_cart.get("current_prc")[i] = controller.drinks_opt.get("oz_20");
                controller.user_cart.get("current_cart_category")[i] = "Drinks";
            }
            else if(controller.user_cart.get("current_selection") == "Desserts") {
                controller.user_cart.get("current_prc")[i] = controller.desserts_opt.get("price");
                controller.user_cart.get("current_cart_category")[i] = "Desserts";
            }
        },

        // Initialize Controller.
        init: function() {
            update_view.init();
            controller.setSelection();
            controller.processCheckout();
        }
    };


    var update_view = {

        // Declaration of View Rendering functions.
        render_pizza : function() {
            update_view.render_content(controller.pizzas_opt.get("menu"),".png", "Pizza");
        },
        render_sides : function() {
            update_view.render_content(controller.sides_opt.get("menu"),".jpg","Sides");
        },
        render_drink : function() {
            update_view.render_content(controller.drinks_opt.get("menu"),".jpg", "Drink");
        },
        render_dessert : function() {
            update_view.render_content(controller.desserts_opt.get("menu"),".png", "Dessert");
        },
        render_content : function(arr,ext) {
            for(var i=0; i<9; i++) {
                $('#i-'+i).show();
            }
            for(var i=0; i<arr.length; i++) {
                $('#i-'+i+' img').attr("src",("pics/"+arr[i]+ext));
                $('#i-'+i+' h4').html(arr[i]);
                var btn = "<button id=\"b" + i + "\" data-complete-text=\"Done!\" class=\"btn btn-primary\" role=\"button\">Order it!</button>";
                if(!($('#i-'+i+' button').length)) {
                    $('#i-'+i).append(btn);
                    $('#b'+i).click(function() {
                        var item = $(this).prev().children().html();
                        update_view.render_cart(item);
                    });
                }
            }
            for(var i=arr.length; i<9; i++) {
                $('#i-'+i).hide();
            }
        },
        render_cart : function(toAdd) {
            if((controller.user_cart.get("current_cart").indexOf(toAdd)) == -1) {
                controller.user_cart.get("current_cart").push(toAdd);
                var item = "<li><a class=\"list-group-item\"><strong>" + "<span class=\"glyphicon glyphicon-ok\" style=\"color: green;\"></span> " +
                            controller.user_cart.get("current_selection") + " - " + toAdd + " <div class=\"badge\" id=\"" + (controller.user_cart.get("current_cart").indexOf(toAdd)) + "\"> 1" +
                            "</div></strong>" + "</a></li>";
                $('#cart').append(item);
                controller.user_cart.get("current_cart_quantity")[controller.user_cart.get("current_cart").indexOf(toAdd)] = 1;
                controller.updateTotal(controller.user_cart.get("current_cart").indexOf(toAdd));
            } else {
                var index = controller.user_cart.get("current_cart").indexOf(toAdd);
                var prev_quantity = parseInt($('#'+index).html());
                $('#'+index).html(prev_quantity+1);
                controller.user_cart.get("current_cart_quantity")[index] = prev_quantity + 1;
                controller.updateTotal(index);
            }

            $.ajax({url: "checkout.php",
                    type: "post",
                    datatype: "json",
                    data: {"cart":JSON.stringify(controller.user_cart.get("current_cart"))},
                    success: function() {
                    }
                }
            );

        },
        // Initialize templete and update view with content.
        init: function() {
            new Content_View();
            update_view.render_pizza();
        }
    };
    controller.init();
});
