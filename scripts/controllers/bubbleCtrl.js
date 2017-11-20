/**
 * Created by moh on 05/04/17.
 */
'use strict';

/**
 * @ngdoc function
 * @name projSemApp.controller:bubbleCtrl
 * @description
 * # bubbleCtrl
 * Controller of the projSemApp
 */
angular.module('projSemApp')
  .controller('bubbleCtrl', function($scope,$rootScope,$routeParams,bubbleFactory,topicFactory){
    $scope.bubbles= bubbleFactory.getBubbles().then(function (bubbles) {

        console.log($routeParams.id);
        //calcul du nombre de mot du topic en chaque langue
            topicFactory.getTopic($routeParams.id).then(function(topic){
                $scope.bubbles=bubbles.data;

                for(var i=0;i<$scope.bubbles.length;i++){

                  $scope.bubbles[i].NumberOfWords = 0;

                }

              for (var i = 0; i < topic.data.details.length; i++) {
                switch (topic.data.details[i].Language) {
                  case "en":$scope.bubbles[0].NumberOfWords=0+topic.data.details[i].NumberOfWords;break;
                  case "pt":$scope.bubbles[1].NumberOfWords=0+topic.data.details[i].NumberOfWords;break;
                  case "it":$scope.bubbles[2].NumberOfWords=0+topic.data.details[i].NumberOfWords;break;
                  case "fr":$scope.bubbles[3].NumberOfWords=0+topic.data.details[i].NumberOfWords;break;
                  case "de":$scope.bubbles[4].NumberOfWords=0+topic.data.details[i].NumberOfWords;break;
                  case "es":$scope.bubbles[5].NumberOfWords=0+topic.data.details[i].NumberOfWords;break;
                  case "fi":$scope.bubbles[6].NumberOfWords=0+topic.data.details[i].NumberOfWords;break;
                  case "el":$scope.bubbles[7].NumberOfWords=0+topic.data.details[i].NumberOfWords;break;
                  case "fa":$scope.bubbles[8].NumberOfWords=0+topic.data.details[i].NumberOfWords;break;
                  case "he":$scope.bubbles[9].NumberOfWords=0+topic.data.details[i].NumberOfWords;break;
                  case "pl":$scope.bubbles[10].NumberOfWords=0+topic.data.details[i].NumberOfWords;break;
                  case "ru":$scope.bubbles[11].NumberOfWords=0+topic.data.details[i].NumberOfWords;break;
                  case "ar":$scope.bubbles[12].NumberOfWords=0+topic.data.details[i].NumberOfWords;break;
                  case "tk":$scope.bubbles[13].NumberOfWords=topic.data.details[i].NumberOfWords;break;
                  case "cy":$scope.bubbles[14].NumberOfWords=topic.data.details[i].NumberOfWords;break;

                }
              }

              console.log($scope.bubbles[0].NumberOfWords);
                console.log($scope.bubbles[1].NumberOfWords);
                  console.log($scope.bubbles[2].NumberOfWords);
                    console.log($scope.bubbles[3].NumberOfWords);
                      console.log($scope.bubbles[4].NumberOfWords);
                        console.log($scope.bubbles[5].NumberOfWords);
                        console.log($scope.bubbles[6].NumberOfWords);
                          console.log($scope.bubbles[7].NumberOfWords);
                            console.log($scope.bubbles[8].NumberOfWords);
                              console.log($scope.bubbles[9].NumberOfWords);
                                console.log($scope.bubbles[10].NumberOfWords);
                                  console.log($scope.bubbles[11].NumberOfWords);
                                  console.log($scope.bubbles[12].NumberOfWords);
                                    console.log($scope.bubbles[13].NumberOfWords);
                                      console.log($scope.bubbles[14].NumberOfWords);

            }
            ,function (msg) {
              alert(msg);}
            );


      },function (msg) {
        alert(msg);
      }
    );


    $rootScope.handleClick = function(lang) {
      $rootScope.$broadcast('majLang', { message: lang});
    };

      $rootScope.reset = function() {
          $rootScope.$broadcast('resetLang', {});

      };



  });
