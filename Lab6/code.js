
$(document).ready( function () {

$('#effect1').click(function(){
    createTable(2, 3);
  });

$('.effect2').click(function(){
    $(this).hide();
});

$('.effect3').mouseover(function(){
    $(this).css({'color': 'red', 'font-weight': 'bold'});
});

$('.effect3').mouseout(function(){
    $(this).css({'color': 'black', 'font-weight': 'normal'});
});

$('.effect4').click(function(){
    $(this).animate({letterSpacing: "+=10px"});
});

$('.effect5').click(function(){
    $("p").animate({fontSize: "3em"});
});

$('.effect6').click(function(){
    $("p").animate({fontSize: "1em"});
});

});


function createTable(n, m) {
    mytable = $("<table border='2'></table>"); // creates DOM elements
    mytablebody = $('<tbody></tbody>'); 

    for(row = 0; row < n; row++) {
	      curr_row = $('<tr></tr>');

	      for(col = 0; col < m; col++) {
	          curr_cell = $('<td></td>');
	          curr_text = 'Row '+ row + ' Col ' + col;
	          curr_cell.append(curr_text);
	          curr_row.append(curr_cell);
	      }
	      mytablebody.append(curr_row); // appends arg to mytablebody
    }
    mytable.append(mytablebody);
    mytable.insertBefore($('#tablecreate')); // real dom from document!

}