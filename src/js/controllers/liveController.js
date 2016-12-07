/**
 * Created by lx on 2016/12/3.
 */
angular.module('myApp.live',['ionic']).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('tabs.live',{
        url:'/live',
        views:{
            'tabs-live':{
                templateUrl:'tabs_live.html',
                controller:'liveController'
            }
        }
    });


}]).controller('liveController',['$scope',function ($scope) {

}]);
