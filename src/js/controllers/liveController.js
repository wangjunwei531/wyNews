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
    $scope.live = {

    };
    $scope.live.getPage = function (event) {
        var list = angular.element(event.currentTarget).children();
        angular.forEach(list,function (data,index) {
            angular.element(data).removeAttr('class');
        });
        angular.element(event.target).addClass('active');
    }

}]);
