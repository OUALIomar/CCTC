'use strict';

/**
 * @ngdoc function
 * @name projSemApp.factory:wordsFactory
 * @description
 * # wordsFactory
 * Factory of the projSemApp
 */
angular.module('projSemApp')
  .factory("wordsFactory",function($http,$q){
    var factory={
      words:false,
      getWords: function () {
        var deffered= $q.defer();
        if (factory.words !=false){
          deffered.resolve(factory.words);
        }
        else {
          factory.words = $http.get('json/words.json');
          deffered.resolve(factory.words);
        }
        return deffered.promise;
      },
    }
    return factory;
  });
