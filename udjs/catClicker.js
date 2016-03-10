// Car Clicker.
$(document).ready(
	function() {
		Cat.prototype.generateCat();
	}
)

function Cat(srce, givenName) {
	this.numClicks = 0;
	this.image = "<img id=\"" + givenName + "\" src=\"" + srce + "\" </img>";
	this.name = givenName;
}

Cat.prototype.generateCat = function() {
	var cats = [];
	var Cats = [];
	for (var i = 0; i < 2; i++) {
		cats[i] = "cat" + (i+1) + ".jpg";
		Cats[i] = new Cat(cats[i],("\"Cat" + (i+1)));
		var templet = "<a href=\"" + cats[i] +"> \"<img id=\"Cat" + (i+1) + "\" src=\"" + cats[i] + "\" </img> </a>";
		var clicks = "<div id=\"cl" + (i+1) + "\" </div>";
		$('#catThumbs').append(templet);
		$('#catThumbs').append(clicks);
		$("#Cat" + (i+1)).click(function () {
			var index = this.id.split("")[this.id.length-1];
			Cats[index-1].numClicks += 1;
			console.log("Cat" + index + " is clicked and number of clicks are " + Cats[index-1].numClicks);
			$('#cl' + index).html("Number of clicks for Cat" + index + " is " + Cats[index-1].numClicks);
		});
	}
}