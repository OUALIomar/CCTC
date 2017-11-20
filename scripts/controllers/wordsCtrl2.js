'use strict';
/**
 * Created by moh on 19/04/17.
 */

app.controller("wordsCtrl",function($scope,topicFactory,$routeParams){
    $scope.loading=true;
    $scope.lang=[];
    $scope.search="";
    var qlq=topicFactory.getTopic($routeParams.id).then(function(topic){
        $scope.loading=false;
        $scope.id=topic.id;
        $scope.words=topic.words;
    },function (msg) {
        alert(msg);
    });



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

    $scope.$on('resetLang', function (event, args) {
        $scope.lang=[];

    });

});



app.filter('wordsSearchFilter',	function(){
    return	function(input,word){
        return word==""	?	input:input.filter(function(d){
            if (d.Word.toLowerCase().indexOf(word.toLowerCase()) >= 0)
            {return	true;}
            else {return false;}  });
    };
});
