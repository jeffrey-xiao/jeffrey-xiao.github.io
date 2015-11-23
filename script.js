// create a module
var mod = angular.module('mod', ['ngRoute', 'ngAnimate']);

// configure our routes
mod.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'mainController',
        title: 'Jeffrey Xiao - About'
    })
    /*
    .when('/resume', {
        templateUrl: 'pages/resume.html',
        controller: 'resumeController'
    }) */
    .when('/projects', {
        templateUrl: 'pages/projects.html',
        controller: 'projectsController',
        title: 'Jeffrey Xiao - Projects'
    })
    .when('/blog', {
        templateUrl: 'pages/blog.html',
        controller: 'blogController',
        title: 'Jeffrey Xiao - Blog'
    })
    .when('/contact', {
        templateUrl: 'pages/contact.html',
        controller: 'contactController',
        title: 'Jeffrey Xiao - Contact'
    });
});

// create the controller and inject Angular's $scope
mod.controller('mainController', function($scope) {
    $scope.message = 'This is the main page';
});

mod.controller('resumeController', function($scope) {
    $scope.message = 'This is the resume page';
});

mod.controller('projectsController', function($scope) {
    $scope.message = 'This is the projects page';
});

mod.controller('blogController', function($scope) {
    $scope.message = 'This is the blog page';
});

mod.controller('contactController', function($scope) {
    $scope.message = 'This is the contact us page';
});

$(window).resize(function() {
    $('.menu').css('max-height', 'auto !important'); //show it very temporarily
    var height = $(window).height() - $('.menu').offset().top; //find the height of the window 
    if($('.menu').height() < height){ //if the menu is smaller than window height, than use menu height
        height = $('.menu').height();
    }
    $('.menu').css('max-height', height); // Set menu max height 
    if($(window).width() < 768) {
        $('.button').show();
    }else{
        $('.button').hide();
    }
}).load(function(){
    $(window).trigger('resize');
});

$(document).ready(function(){
    $('.button').click(function() {
        $('.menu').toggleClass('toggled');
    });
});
