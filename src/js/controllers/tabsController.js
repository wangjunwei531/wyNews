/**
 * Created by lx on 2016/12/3.
 */
angular.module('myApp.tabs',['ionic']).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('tabs',{
        url:'/tabs',
        views:{
            'mainPage':{
                templateUrl:'tabs.html',
                controller:'tabsController'
            }
        }
    });


}]).controller('tabsController',['$scope',function ($scope) {

}]);
