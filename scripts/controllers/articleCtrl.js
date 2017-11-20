/**
 * Created by moh on 05/04/17.
 */
'use strict';

/**
 * @ngdoc function
 * @name projSemApp.controller:articleCtrl
 * @description
 * # articleCtrl
 * Controller of the projSemApp
 */
angular.module('projSemApp')
  .controller('articleCtrl', function($scope,articleFactory){
    $scope.articles= articleFactory.getArticles().then(function (articles) {
        $scope.articles=articles.data;
           },function (msg) {
        alert(msg);
      }
    );

    $scope.lang=[];

      $scope.$on('majLang', function (event, args) {
          var index=$scope.lang.indexOf(args.message);
          if (index!=-1){
              $scope.lang.splice(index,1);
          }
          else {
              $scope.lang.push(args.message) ;
          }
          //appliquer les changement
          $scope.$apply();
      });


  });
