README
	
	booksLibrary.js contains the implementation for generating a virtual library. This file is used in booksLibrary.html
	to show the content of the library.
	It contains mainly three classes: Library, Bookis and Shelf.

Library
	
	This class contains several properties.
	1. Shelves: which is an array of shelves in this library at the time of
	   construction.
	2. isAvailable: This function takes an input of string, that can be either the book name or ISBN. The function then
	   checks every shelf in library for the book that matches the given input with its name or ISBN.If a match is
	   found, this function displays the shelf on the webpage and return the shelf that contains this book.
	3. createLibrary: This function, as the name suggests, generates a new Library. Making use of the random function,
	   it generates 50 distinct and/or some with duplicate items. The total of five shelves contains 50 books. Each 
	   book is given a randomly generated name and ISBN. For convineance after creation the library is printed to the
	   console to reference.
	4. getMax: This function returns the length of biggest shelf in the Library. This is used to create table reresenting
	   this library.
	5. createTable: This function generates a table, which contains all the shelves and books generated in createLibrary
	   function. Also has a click handler that prints details of a book when the cell is clicked and changes the color
	   of selected cell.

Shelf

	This class only has one property that is the books contained by this shelf.
	1. Books: Array of Book objects contained by this shelf.

Book
	
	This class contains multiple properties.
	1. name: Name of the book.
	2. checkedOut: Denotes whether a book is available or checkedout.
	3. ISBN: ISBN number of this book. User is able to search for specific book by its ISBN.