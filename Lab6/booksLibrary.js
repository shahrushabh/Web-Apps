// Exercise 3: Library

// Create table when the DOM is ready.
$(document).ready(
	function() {
		Library.prototype.createTable();
	}
)

// Library object. 
// Assuming we can only have one library, the prototype of Library contains all the shelves in this library.
function Library() {
	Library.prototype.shelves = new Array();
	Library.prototype.isAvailabe = function(book) {			// Prints the shelf number and entire shelf in console.
		var result = $("<div id=result></div>");
		for(s in Library.prototype.shelves) {
			for(b in Library.prototype.shelves[s].books) {
				if(((book === Library.prototype.shelves[s].books[b].name) || (parseInt(book) === Library.prototype.shelves[s].books[b].ISBN))
					&& (Library.prototype.shelves[s].books[b].checkedOut === false)) {
					result.insertBefore($('#table'));
					return s;
				}
			}
		}
		result.insertBefore($('#table'));
		return undefined;
	}
}

Library.prototype.createLibrary = function() {

	//  Necessary objects to successfuly create a Library.
	var l = new Library();
	var s1 = new Shelf();
	var s2 = new Shelf();
	var s3 = new Shelf();
	var s4 = new Shelf();
	var s5 = new Shelf();

	l.shelves.push(s1);
	l.shelves.push(s2);
	l.shelves.push(s3);
	l.shelves.push(s4);
	l.shelves.push(s5);

	// Create new books.

	// Randomely create 50 new books and push it on the shelves.
	// This loop randomly assigns Avalibility and ISBNs.
	var value = [true,false];
	for(var i=0; i<50; i++) {
		var name = "Book " + (Math.floor(Math.random() * 50)+1);
		var b =  new Book(name, Math.floor(Math.random() * 100000),value[Math.floor(Math.random() * 2)]);
		Library.prototype.shelves[Math.floor(Math.random() * 5)].books.push(b);
	}
	return l;
}

Library.prototype.getMax = function() {
	var maxRows = 0;
	for(var i = 0; i < Library.prototype.shelves.length; i++) {
		if(Library.prototype.shelves[i].books.length > maxRows) {
			maxRows = Library.prototype.shelves[i].books.length;
		}
	}
	return maxRows;
}

// Create the shelves for this library.
Library.prototype.createTable = function() {
	var l = Library.prototype.createLibrary();
	console.log(l);												// Print current library object for reference.
    mytable = $("<table id='table' border='2'></table>"); 		// creates DOM elements
    mytablebody = $('<tbody></tbody>');
	curr_row = $('<tr bgcolor="lightgreen"></tr>');
// Genrate the title.
    for(col = 0; col < l.__proto__.shelves.length; col++) {
        curr_cell = $('<td width="50"></td>');
        curr_text = 'Shelf'+(col+1);
        curr_cell.append(curr_text);
        curr_row.append(curr_cell);
    }
    mytablebody.append(curr_row);
// Maximum length of a shelf.
    var max = Library.prototype.getMax();
// Insert books in appropriate shelves.
    for(row = 0; row < max; row++) {
	    curr_row = $('<tr></tr>');
	    for(col = 0; col < l.__proto__.shelves.length; col++) {
	        curr_cell = $('<td></td>');
	        var book = l.__proto__.shelves[col].books[row];
	        if(typeof book != 'undefined') {
		        curr_text = book.name;
	        } else {
	        	curr_text = '';
	        }
	    	curr_cell.append(curr_text);
	        curr_row.append(curr_cell);
	    }
	    mytablebody.append(curr_row); // Appends the current row to the table.
    }
    mytable.append(mytablebody);
    mytable.insertAfter($('#libraryTable'));
// Previously clicked cell.
    var previous = undefined;
// Onclick handler.
    $("#table td").click(function(tr,td) {
    	if(typeof previous != 'undefined') {
			$(previous).css("background-color","white");
    	}
		var cIndex = this.cellIndex;
		var rIndex = $(this).parent().index('tr');
    	if(typeof Library.prototype.shelves[cIndex].books[rIndex-1] != 'undefined') {
    		$(this).css("background-color","lightblue");
			var des = "<br>Book Title:  " + Library.prototype.shelves[cIndex].books[rIndex-1].name + "<br>" +
						"Book ISBN:  " + Library.prototype.shelves[cIndex].books[rIndex-1].ISBN + "<br>" +
						"Availability:  " + ((Library.prototype.shelves[cIndex].books[rIndex-1].checkedOut) ? "Checked Out." : "Available.");

			$('#Description').html(des);
    	}
		previous = $(this);
	});
} // end of function

// Shelf object.
// Each shelf will containLibrary.prototype.shelves[s] its own books and will be different for each shelf.
function Shelf() {
	this.books = new Array();
}

// Book Object.
// Contains name and the status (availabe/checkeOut) of the book. These properties are unique to each book.
function Book(bookName,isbn,availabe) {
	this.name = bookName;
	this.checkedOut = availabe;
	this.ISBN = isbn;
}

