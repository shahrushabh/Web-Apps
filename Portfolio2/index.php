<!DOCTYPE html>
<html>
<head>
	<title>Welcome</title>
    <!-- JQuery -->
    <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <!-- Include the js userblog.js file -->
    <script src="js/home.js"></script>
    <style type="text/css">
      body {
        background-image: url("pics/bg.jpg");
      }

      #option-sidebar .list-group-item {
        background-color: wheat;
      }

      #cart .list-group-item, {
        background-color: wheat;
      }

      img {
        width: 100%;
        max-height: 150px;
      }

    </style>
</head>
<body>
<div>

	<!-- Navigation bar starts here -->
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header" align="center">
          <a class="navbar-brand" href="../Portfolio2/"><strong><span style="color: red;">Pizza</span><span style="color: white;">Seller</span></strong></a>
        </div>
      </div>
    </nav>
    <!-- Navigation bar ends here -->

    <!-- Sidebars and Page content starts here -->
    	<!-- Sidebar -->
        <div class="col-md-2 sidebar" id="option-sidebar">
          <ul class="nav nav-sidebar list-group">
            <label class="list-group-item" align="center" style="background-color: peru;">Menu</label>
            <li><button id="Pizza" class="list-group-item active"><strong>Pizzas</strong></button></li>
            <li><button id="Sides" class="list-group-item"><strong>Sides</strong></button></li>
            <li><button id="Drinks" class="list-group-item"><strong>Drinks</strong></button></li>
            <li><button id="Desserts" class="list-group-item"><strong>Desserts</strong></button></li>
            <li class="divider" role="separator">&nbsp;</li>
          </ul>
          <ul id="cart" class="nav nav-sidebar list-group" >
            <label class="list-group-item" align="center" style="background-color: peru;">Current Order</label>
          </ul>
        </div>

        <!-- Thunmbnails -->
        <div class="col-md-9" id="content" align="center">
          <div class="page-header">
            <h1 id="header-detail" style="color: white;">Pick your kind of Pizza.</h1>
          </div>
    			<div class="row">
            <div id="one" class="col-md-4">
              <button id="i-0" class="thumbnail">
                <img src="">	
                <div class="caption">
                	<h4></h4>
                </div>
              </button>
              <button id="i-3" class="thumbnail">
                <img src="">	
                <div class="caption">
                	<h4></h4>
                </div>
              </button>
              <button id="i-6" class="thumbnail">
                <img src="">	
                <div class="caption">
                	<h4></h4>
                </div>
              </button>
            </div>
            <div id="two" class="col-md-4">
              <button id="i-1" class="thumbnail">
                <img src="">	
                <div class="caption">
                	<h4></h4>
                </div>
              </button>
              <button id="i-4" class="thumbnail">
                <img src="">	
                <div class="caption">
                	<h4></h4>
                </div>
              </button>
              <button id="i-7" class="thumbnail">
                <img src="">	
                <div class="caption">
                	<h4></h4>
                </div>
              </button>
            </div>
            <div id="three" class="col-md-4">
              <button id="i-2" class="thumbnail">
                <img src="">	
                <div class="caption">
                	<h4></h4>
                </div>
              </button>
              <button id="i-5" class="thumbnail">
                <img src="">	
                <div class="caption">
                	<h4></h4>
                </div>
              </button>
              <button id="i-8" class="thumbnail">
                <img src="">	
                <div class="caption">
                	<h4></h4>
                </div>
              </button>
            </div>
    			</div><br><br>
        </div>
    <div>
      <button id="summary" class="btn btn-success" data-toggle="modal" data-target="#myModal">CHECKOUT</button>
    </div>

  <!-- Modal -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel"><strong>Order Details</strong></h4>
        </div>
        <div class="modal-body">
          <ul id="order-detail" class="list-group">
          </ul>
        </div>
        <div class="panel-footer" id="total"></div>
        <div class="modal-footer">
          <div id="order-type" align="left">
            <label class="radio-inline"><input type="radio" name="optradio" value="Carry Out" id="c" checked="checked">Carry Out</label>
            <label class="radio-inline"><input type="radio" name="optradio" value="Delivery" id="d">Delivery</label>
          </div><br>
          <form class="form-group" align="left" id="for-carry">
            <label for="name">Name:</label>
            <input type="text" class="form-control" id="name" required>
            <label for="phone">Phone:</label>
            <input type="text" class="form-control" id="phone" required>
            <label for="address">Address:</label>
            <input type="text" class="form-control" id="address" required>
            <label for="city">City:</label>
            <input type="text" class="form-control" id="city" required>
            <label for="zip">Zip:</label>
            <input type="text" class="form-control" id="zip" required><br>
          </form>
            <button type="button" class="btn btn-default" data-dismiss="modal">Go Back</button>
            <button type="button" class="btn btn-success" id="checkout">PLACE MY ORDER!</button><br>
        </div>
      </div>
    </div>
  </div>

</div>
</body>
</html>