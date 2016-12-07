/**
 * Created by lx on 2016/12/3.
 */
angular.module('myApp.topic',[]).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('tabs.topic',{
        url:'/topic',
        views:{
            'tabs-topic':{
                templateUrl:'tabs_topic.html',
                controller:'topicController'
            }
        }
    });

}]).controller('topicController',['$scope',function ($scope) {

}]);
