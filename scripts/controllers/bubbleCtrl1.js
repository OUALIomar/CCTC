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

        //calcul du nombre de mot du topic en chaque langue
            topicFactory.getTopic($routeParams.id).then(function(topic){
                for (var i = 0; i < topic.data.details.length; i++) {
                     switch (topic.data.details[i].Language) {
                      case "en":$scope.bubbles[0]={"Name":bubbles.data[i].Name,"img_path":bubbles.data[i].img_path,"isClicked":bubbles.data[i].isClicked,"NumberOfWords":topic.data.details[i].NumberOfWords};break;
                      case "pt":$scope.bubbles[1]={"Name":bubbles.data[i].Name,"img_path":bubbles.data[i].img_path,"isClicked":bubbles.data[i].isClicked,"NumberOfWords":topic.data.details[i].NumberOfWords};break;
                      case "it":$scope.bubbles[2]={"Name":bubbles.data[i].Name,"img_path":bubbles.data[i].img_path,"isClicked":bubbles.data[i].isClicked,"NumberOfWords":topic.data.details[i].NumberOfWords};break;
                      case "fr":$scope.bubbles[3]={"Name":bubbles.data[i].Name,"img_path":bubbles.data[i].img_path,"isClicked":bubbles.data[i].isClicked,"NumberOfWords":topic.data.details[i].NumberOfWords};break;
                      case "de":$scope.bubbles[4]={"Name":bubbles.data[i].Name,"img_path":bubbles.data[i].img_path,"isClicked":bubbles.data[i].isClicked,"NumberOfWords":topic.data.details[i].NumberOfWords};break;
                      case "es":$scope.bubbles[5]={"Name":bubbles.data[i].Name,"img_path":bubbles.data[i].img_path,"isClicked":bubbles.data[i].isClicked,"NumberOfWords":topic.data.details[i].NumberOfWords};break;
                      case "fi":$scope.bubbles[6]={"Name":bubbles.data[i].Name,"img_path":bubbles.data[i].img_path,"isClicked":bubbles.data[i].isClicked,"NumberOfWords":topic.data.details[i].NumberOfWords};break;
                      case "el":$scope.bubbles[7]={"Name":bubbles.data[i].Name,"img_path":bubbles.data[i].img_path,"isClicked":bubbles.data[i].isClicked,"NumberOfWords":topic.data.details[i].NumberOfWords};break;
                      case "fa":$scope.bubbles[8]={"Name":bubbles.data[i].Name,"img_path":bubbles.data[i].img_path,"isClicked":bubbles.data[i].isClicked,"NumberOfWords":topic.data.details[i].NumberOfWords};break;
                      case "he":$scope.bubbles[9]={"Name":bubbles.data[i].Name,"img_path":bubbles.data[i].img_path,"isClicked":bubbles.data[i].isClicked,"NumberOfWords":topic.data.details[i].NumberOfWords};break;
                      case "pl":$scope.bubbles[10]={"Name":bubbles.data[i].Name,"img_path":bubbles.data[i].img_path,"isClicked":bubbles.data[i].isClicked,"NumberOfWords":topic.data.details[i].NumberOfWords};break;
                      case "ru":$scope.bubbles[11]={"Name":bubbles.data[i].Name,"img_path":bubbles.data[i].img_path,"isClicked":bubbles.data[i].isClicked,"NumberOfWords":topic.data.details[i].NumberOfWords};break;
                      case "ar":$scope.bubbles[12]={"Name":bubbles.data[i].Name,"img_path":bubbles.data[i].img_path,"isClicked":bubbles.data[i].isClicked,"NumberOfWords":topic.data.details[i].NumberOfWords};break;
                      case "tk":$scope.bubbles[13]={"Name":bubbles.data[i].Name,"img_path":bubbles.data[i].img_path,"isClicked":bubbles.data[i].isClicked,"NumberOfWords":topic.data.details[i].NumberOfWords};break;
                      case "cy":$scope.bubbles[14]={"Name":bubbles.data[i].Name,"img_path":bubbles.data[i].img_path,"isClicked":bubbles.data[i].isClicked,"NumberOfWords":topic.data.details[i].NumberOfWords};break;

                    }
                }
                console.log($scope.bubbles);
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
          for (var i = 0; i < $scope.bubbles.length; i++) {
              $scope.bubbles[i].isClicked=false;
          }
      };

  });
