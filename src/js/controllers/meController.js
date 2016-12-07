/**
 * Created by lx on 2016/12/3.
 */
angular.module('myApp.me',[]).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('tabs.me',{
        url:'/me',
        views:{
            'tabs-me':{
                templateUrl:'tabs_me.html',
                controller:'meController'
            }
        }
    });

}]).controller('meController',['$scope',function ($scope) {

}]);