'use strict';

/**
 * @ngdoc overview
 * @name projSemApp
 * @description
 * # projSemApp
 *
 * Main module of the application.
 */
var app= angular.module('projSemApp',['ngRoute']);
app.config(function($routeProvider){
        $routeProvider
            .when('/',{templateUrl:'views/main.html',controller:'topicsCtrl'})
            .when('/words/:id',{templateUrl:'views/words.html',controller:'wordsCtrl' })
            .otherwise({redirectTo:'/'});
    }
);



