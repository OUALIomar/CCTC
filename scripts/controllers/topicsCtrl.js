/**
 * Created by moh on 20/04/17.
 */

app.controller("topicsCtrl",function($scope,topicFactory){
    $scope.topics= topicFactory.getTopics().then(function (topics) {
        $scope.topics=topics.data;
    },function (msg) {
        alert(msg);
    });
});

