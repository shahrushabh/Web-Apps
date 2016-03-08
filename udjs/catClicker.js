// Car Clicker.
$(document).ready(
	function() {
		Cat.prototype.generateCat();
	}
)

function Cat() {
	this.numClicks = 0;
}

Cat.prototype.generateCat = function() {
	var cats = [];
	var Cats = [];
	for (var i = 0; i < 2; i++) {
		cats[i] = "cat" + (i+1) + ".jpg";
		Cats[i] = new Cat();
		var templet = "<img id=\"Cat" + (i+1) + "\" src=\"" + cats[i] + "\" </img>";
		var clicks = "<div id=\"cl" + (i+1) + "\" </div>";
		$('#cats').append(templet);
		// $('#Cat' + (i+1)).append(clicks);
		$('#cats').append(clicks);
		$("#Cat" + (i+1)).click(function () {
			var index = this.id.split("")[this.id.length-1];
			Cats[index-1].numClicks += 1;
			console.log("Cat" + index + " is clicked and number of clicks are " + Cats[index-1].numClicks);
			$('#cl' + index).html("Number of clicks for Cat" + index + " is " + Cats[index-1].numClicks);
		});
	}
}