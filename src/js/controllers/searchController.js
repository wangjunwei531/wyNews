/**
 * Created by lx on 2016/12/8.
 */
angular.module('myApp.search',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('search',{
        url:'/search',
        views:{
            'mainPage':{
                templateUrl:'search.html',
                controller:'searchController'
            }
        }
    })
}]).controller('searchController',['$scope','$ionicViewSwitcher',function ($scope,$ionicViewSwitcher) {
    $scope.search = {
        
    };
    $scope.search.getStyle = function (event) {
        var item = angular.element(event.target).parent();
        if (event.type == 'focus'){
            item.addClass('active');
        }else {
            item.removeClass('active');
        }
    }
    $scope.search.goBack = function () {
        window.history.go(-1);
        $ionicViewSwitcher.nextDirection('back');
    }

}]);
