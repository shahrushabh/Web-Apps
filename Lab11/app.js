// Lab 11: Building Library with Angular JS.

var library = angular.module('Library', ['ngRoute']);

// Configure the routes for Library and Book per specification.
library.config(function ($routeProvider) {

    $routeProvider.when("/library_view", {
        controller: "library-controller",
        templateUrl: "library_view.html"
    });

    $routeProvider.when("/book_view/", {
        controller: "book-controller",
        templateUrl: "book_view.html"
    });

});

// Library Controller, controls the library_view.
library.controller('library-controller', function($scope) {
    $scope.books = [
        {'name': 'Book 1',
         'ISBN': '12322',
         'available': 'Available'},
        {'name': 'Book 2',
         'ISBN': '123232',
         'available': 'Available'},
        {'name': 'Book 3',
         'ISBN': '12212',
         'available': 'Available'},
        {'name': 'Book 4',
         'ISBN': '12752',
         'available': 'Available'},
        {'name': 'Book 5',
         'ISBN': '52322',
         'available': 'Not Available'},
        {'name': 'Book 6',
         'ISBN': '232322',
         'available': 'Available'}
    ];
    
    // The library Object.
    $scope.Library = {
        r1 : [$scope.books[0],$scope.books[4],$scope.books[2],$scope.books[2],$scope.books[4],$scope.books[1]],
        r2 : [$scope.books[1],$scope.books[1],$scope.books[5],$scope.books[2],$scope.books[0],$scope.books[5]],
        r3 : [$scope.books[4],$scope.books[5],$scope.books[2],$scope.books[3],$scope.books[1],$scope.books[0]],
        r4 : [$scope.books[1],$scope.books[1],$scope.books[5],$scope.books[2],$scope.books[5],$scope.books[2]],
        r5 : [$scope.books[2],$scope.books[5],$scope.books[3],$scope.books[2],$scope.books[1],$scope.books[5]],
        r6 : [$scope.books[0],$scope.books[3],$scope.books[2],$scope.books[2],$scope.books[2],$scope.books[1]],
    };
    
    
    // Randomely Assign Availability to generate different instances.
    $scope.randomize = function() {
        var value = ['Available','Not Available'];
        for(row in $scope.Library) {
            for(book in $scope.Library[row]) {
                $scope.Library[row][book].available = value[Math.floor(Math.random() * 2)];
            }
        }
    }
    
    // Attempt to find the book in this library. If book is found, return that shelf, otherwise return error.
    $scope.find = function() {
        var shelf_num = [];
        for(row in $scope.Library) {
            for(book in $scope.Library[row]) {
                if($scope.search === $scope.Library[row][book].name) {
                    if($scope.Library[row][book].available === 'Available') {
                        shelf_num.push((parseInt(book)+1));
                        break;
                    }
                }
            }
        }
        if(shelf_num.length > 0) {
            $scope.search_result = "Your book can be found in Shelf " + (shelf_num[0]);
        } else {
            $scope.search_result = "Your book is either checkedout or not available currently.";
        }
    };
    
    // Assign details of the book that is clicked most reently. Navigate to book view to see details.
    $scope.details = function($event,$parentIndex,$index) {
        for(row in $scope.Library) {
            if(row == ('r'+($parentIndex+1))) {
                for(book in $scope.Library[row]) {
                    if(book == $index) {
                        $scope.$parent.clickedBook.name = $scope.Library[row][book].name;
                        $scope.$parent.clickedBook.ISBN = $scope.Library[row][book].ISBN;
                        $scope.$parent.clickedBook.available = $scope.Library[row][book].available;
                        console.log($scope.$parent.clickedBook);
                        return;
                    }
                }
            }
        }
    };
    // Randomizing the availibility.
    $scope.randomize();
    
});

// Book controller. Controls the book_view.
library.controller('book-controller', function($scope) {
    $scope.book = $scope.$parent.clickedBook;
});

// Parent controller to both book and library.
library.controller('parent-controller', function($scope) {
    $scope.clickedBook = {'name': '',
                          'ISBN': '',
                          'available': ''};
});
