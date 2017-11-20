/**
 * Created by moh on 05/04/17.
 */
'use strict';

/**
 * @ngdoc function
 * @name projSemApp.factory:articleFactory
 * @description
 * # articleFactory
 * Factory of the projSemApp
 */
angular.module('projSemApp')
  .factory("articleFactory",function($http,$q){
    var factory={
      articles:false,
      getArticles: function () {
        var deffered= $q.defer();
        if (factory.articles !=false){
          deffered.resolve(factory.articles);
        }
        else {
          factory.articles = $http.get('json/Article.json');
          deffered.resolve(factory.articles);
        }
        return deffered.promise;
      },
    }
    return factory;
  });
