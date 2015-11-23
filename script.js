// create a module
var mod = angular.module('mod', ['ngRoute']);

// configure our routes
mod.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'mainController'
    })
    .when('/about', {
        templateUrl: 'pages/about.html',
        controller: 'aboutController'
    })
    .when('/contact', {
        templateUrl: 'pages/contact.html',
        controller: 'contactController'
    });
});

// create the controller and inject Angular's $scope
mod.controller('mainController', function($scope) {
    $scope.message = 'This is the main page';
});

mod.controller('aboutController', function($scope) {
    $scope.message = 'This is the about page';
});

mod.controller('contactController', function($scope) {
    $scope.message = 'This is the contact us page';
});