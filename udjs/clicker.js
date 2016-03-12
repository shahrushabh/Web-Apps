$(function(){

    var model = {
        // Cat object.
        Cat: function(id, name, source) {
            this.id = id;
            this.name = name;
            this.source = source;
            this.numClicked = 0;
        },
        // Initialize model.
        init: function() {
            cats = [];
            for(var i=0; i < 5; i++) {
                cats[i] = new model.Cat((i+1), ("Cat " + (i+1)), ("cat"+(i+1)+".jpg"));
            }
        }
    };

    var controller = {
        // Attach handlers to appropriate components in view.
        attachHandler : function () {
            for(var i=0; i<buttons.length; i++) {
                var current = $('#'+cats[i].id);
                $('#'+cats[i].id).bind("click",function() {
                    view.select(cats[i]);
                });
                console.log(cats[i]);
            }
        },
        // Initialize Model and View. Attach handlers to the appropriate components in View.
        init: function() {
            model.init();
            view.init();
        }
    };

    var view = {
        select : function(source) {
            var replaceCat = "<br><img id=\"" + source.name + "\"src=\"" + source.source + "\"></img>";
            $('#selectedCat').append(replaceCat);
        },
        updateNumber : function(clickedCat) {
            var toDisplay = "<br><lable for=\"numberDisplay\"> Number of times clicked: " + clickedCat.numClicked;
            $('#numDisplay').append(toDisplay);
        },
        init: function() {
            buttons = [];
            for(var i=0; i<cats.length; i++) {
                buttons[i] = "<button id = \"" + cats[i].id + "\"> " + cats[i].name + "</button>";
                $('#imgRow').append(buttons[i]);
            };
            controller.attachHandler();
            this.select(cats[0]);
            this.updateNumber(cats[0]);
        }
    };

    controller.init();
});