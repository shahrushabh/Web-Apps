$(function(){

    var model = {
        // Current selection for rendering appropriate content and current cart to track this transaction.
        current_selection: "Pizza",
        current_cart : [],
        current_cart_quantity : [],
        current_cart_category : [],
        current_prc : [],
        total: 0.00,
        customer: {},

        // Menu Options.
        pizzas_opt : ["Cheese", "Meat", "Veggie", "Pepperoni", "Alfredo", "Spinach", "Ham"],
        sides_opt : ["Stuffed Cheese", "Spinach Cheese", "Jalapeno Cheese", "Parmesan", "Breadsticks"],
        drinks_opt : ["Coke","Coke Zero", "Diet Coke", "Sprite", "Dasani", "Fanta"],
        desserts_opt : ["Cinnamon", "Apple Pizza", "Brownies", "Bavarian"],

        // The size and prices are kept constant for the sake of time and simplicity.
        pizza_prc : 12.49,
        sides_prc : 6.99,
        drinks_prc : 2.79,
        desserts_prc : 4.99,

        // Initialize Model with default values.
        init: function() {
            model.current_selection = "Pizza";
        }
    };

    var controller = {

        // Setting tab swtich controls. Render Appropriate View based on user selection.
        setSelection: function() {
            $('#Pizza').click(function() {
                if(model.current_selection !== "Pizza") {
                    $('#Pizza').addClass("active");
                    $('#'+model.current_selection).removeClass("active");
                    model.current_selection = "Pizza";
                    $('#header-detail').html("Pick your kind of Pizza.");
                    view.render_pizza();
                    $('body').css("background-image", "url(pics/bg.jpg)");
                }
            });
            
            $('#Sides').click(function() {
                if(model.current_selection !== "Sides") {
                    $('#Sides').addClass("active");
                    $('#'+model.current_selection).removeClass("active");
                    model.current_selection = "Sides";
                    $('#header-detail').html("Fill in your Sides.");
                    view.render_sides();
                    $('body').css("background-image", "url(pics/bst.jpg)");
                }
            });
            
            $('#Drinks').click(function() {
                if(model.current_selection !== "Drinks") {
                    $('#Drinks').addClass("active");
                    $('#'+model.current_selection).removeClass("active");
                    model.current_selection = "Drinks";
                    $('#header-detail').html("Add in some Drinks.");
                    view.render_drink();
                    $('body').css("background-image", "url(pics/pop.jpg)");
                }
            });

            $('#Desserts').click(function() {
                if(model.current_selection !== "Desserts") {
                    $('#Desserts').addClass("active");
                    $('#'+model.current_selection).removeClass("active");
                    model.current_selection = "Desserts";
                    $('#header-detail').html("Choose from  our Desserts.");
                    view.render_dessert();
                    $('body').css("background-image", "url(pics/ds.jpg)");
                }
            });
        },

        processCheckout: function() {
            $('#summary').click(function() {
                $('#order-detail').empty();
                if(model.current_cart.length == 0) {
                    var empty = "<p class=\"text-muted\">Order contains no items.</p>";
                    $('#order-detail').append(empty);
                    $('#checkout').addClass("disabled");
                } else {
                    $('#checkout').removeClass("disabled");
                    for(var i=0; i<model.current_cart.length; i++) {
                        var item_total = model.current_cart_quantity[i] * model.current_prc[i];
                        var order_item = "<li class=\"list-group-item\"><strong>" + model.current_cart_category[i] + ",  " +
                        model.current_cart[i] + ": Qty - " + model.current_cart_quantity[i] +
                        " <span style=\"float: right;\">$" + item_total.toFixed(2) + "</span></strong></li>";
                        $('#order-detail').append(order_item);
                        model.total += item_total;
                    }
                }
                var order_total = "<strong> Total: <span style=\"float: right;\"> $" + model.total.toFixed(2) + "</span></strong>";
                $('#total').html(order_total);
            });
            
            // Submit order here. Validity of input is not checked due to time constrain.

            $('#checkout').click(function() {
                if($('#c').prop("checked")) {
                    model.customer['carryout'] = "Carryout";
                } else {
                    model.customer['carryout'] = "Delivery";
                }
                model.customer['name'] = $('#name').val();
                model.customer['phone'] = $('#phone').val();
                model.customer['address'] = $('#address').val();
                model.customer['city'] = $('#city').val();
                model.customer['zip']  = $('#zip').val();
                var order = {"Category" : model.current_cart_category,
                             "Quantity" : model.current_cart_quantity,
                             "Price_per_item" : model.current_prc,
                             "Total" : model.total.toFixed(2),
                             "Customer" : model.customer};
                console.log(model.customer);

                $.ajax({url: "checkout.php",
                        type: "post",
                        datatype: "json",
                        data: {"checkout" : "true" ,"cart":JSON.stringify(order)},
                        success: function(data) {
                            console.log(data);
                            $('#checkout').addClass("disabled");
                            var notify = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">" + 
                                         "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" + 
                                         "<span aria-hidden=\"true\">&times;</span></button>" +
                                         "<strong>Thank You!</strong> Your order has been submitted.</div>";
                            $('#order-detail').prepend(notify);
                            setTimeout(function() {
                                window.location.reload();
                            }, 3000);
                        }
                    }
                );
            });
        },

        updateTotal: function(i) {
            if(model.current_selection == "Pizza") {
                model.current_prc[i] = model.pizza_prc;
                model.current_cart_category[i] = "Pizza";
            } 
            else if(model.current_selection == "Sides") {
                model.current_prc[i] = model.sides_prc;
                model.current_cart_category[i] = "Sides";
            }
            else if(model.current_selection == "Drinks") {
                model.current_prc[i] = model.drinks_prc;
                model.current_cart_category[i] = "Drinks";
            }
            else if(model.current_selection == "Desserts") {
                model.current_prc[i] = model.desserts_prc;
                model.current_cart_category[i] = "Desserts";
            }
        },

        // Initialize Controller.
        init: function() {
            model.init();
            view.init();
            controller.setSelection();
            controller.processCheckout();
        }
    };


    var view = {

        // Declaration of View Rendering functions.
        render_pizza : function() {
            view.render_content(model.pizzas_opt,".png", "Pizza");
        },
        render_sides : function() {
            view.render_content(model.sides_opt,".jpg","Sides");
        },
        render_drink : function() {
            view.render_content(model.drinks_opt,".jpg", "Drink");
        },
        render_dessert : function() {
            view.render_content(model.desserts_opt,".png", "Dessert");
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
                        view.render_cart(item);
                    });
                }
            }
            for(var i=arr.length; i<9; i++) {
                $('#i-'+i).hide();
            }
        },
        render_cart : function(toAdd) {
            if((model.current_cart.indexOf(toAdd)) == -1) {
                model.current_cart.push(toAdd);
                var item = "<li><a class=\"list-group-item\"><strong>" + "<span class=\"glyphicon glyphicon-ok\" style=\"color: green;\"></span> " + 
                            model.current_selection + " - " + toAdd + " <div class=\"badge\" id=\"" + (model.current_cart.indexOf(toAdd)) + "\"> 1" + 
                            "</div></strong>" + "</a></li>";
                $('#cart').append(item);
                model.current_cart_quantity[model.current_cart.indexOf(toAdd)] = 1;
                controller.updateTotal(model.current_cart.indexOf(toAdd));
            } else {
                var index = model.current_cart.indexOf(toAdd);
                var prev_quantity = parseInt($('#'+index).html());
                $('#'+index).html(prev_quantity+1);
                model.current_cart_quantity[index] = prev_quantity + 1;
                controller.updateTotal(index);
            }

            $.ajax({url: "checkout.php",
                    type: "post",
                    datatype: "json",
                    data: {"cart":JSON.stringify(model.current_cart)},
                    success: function() {
                    }
                }
            );

        },

        // Initialize view.
        init: function() {
            view.render_pizza();
        }
    };

    controller.init();

});