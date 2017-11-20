'use strict';
/**
 * Created by moh on 19/04/17.
 */
app.factory("topicFactory",function($http,$q){
    var factory={
        topics:false,
        getTopics: function () {
            var deffered= $q.defer();
            if (factory.topics !=false){
                deffered.resolve(factory.topics);
            }
            else {
                factory.topics = $http.get('json/topicsnew.min.json');
                deffered.resolve(factory.topics);
            }
            return deffered.promise;
        },
        getTopic:function (id) {
            var deffered= $q.defer();
            var topic={};
            var topics = factory.getTopics().then(function (topics) {
                    topic = $http.get('json/'+id+'.json');
                    deffered.resolve(topic);
                }, function (msg) {
                    deffered.reject(msg);
                }
            );

            return deffered.promise;
        },
    }
    return factory;
});
