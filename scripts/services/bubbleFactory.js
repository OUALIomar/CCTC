'use strict';

/**
 * @ngdoc function
 * @name projSemApp.factory:bubbleFactory
 * @description
 * # bubbleFactory
 * Factory of the projSemApp
 */
angular.module('projSemApp')
  .factory("bubbleFactory",function($http,$q){
    var factory={
      bubbles:false,
      getBubbles: function () {
        var deffered= $q.defer();
        if (factory.bubbles !=false){
          deffered.resolve(factory.bubbles);
        }
        else {
          factory.bubbles = $http.get('json/languages.json');
          deffered.resolve(factory.bubbles);
        }
        return deffered.promise;
      },
    }
    return factory;
  });
