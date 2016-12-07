/**
 * Created by lx on 2016/12/3.
 */
angular.module('myApp.news',[]).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('tabs.news',{
        url:'/news',
        views:{
            'tabs-news':{
                templateUrl:'tabs_news.html',
                controller:'newsController'
            }
        }
    });
    $urlRouterProvider.otherwise('/tabs/news');

}]).controller('newsController',['$scope','$state','$stateParams','$ionicSlideBoxDelegate','$ionicViewSwitcher','HttpFactory',function ($scope,$state,$stateParams,$ionicSlideBoxDelegate,$ionicViewSwitcher,HttpFactory) {
    console.log('????');
    console.log($stateParams);
    var index = 0;
    $scope.news = {

    };
    var url1 = 'http://c.m.163.com/nc/topicset/ios/subscribe/manage/listspecial.html';
    HttpFactory.getData(url1).then(function (result) {
        $scope.news.nameArray = result;
    });

    $scope.news.joinDetail = function () {

        $state.go('newsDetail');
        $ionicViewSwitcher.nextDirection("forward");
    };


    var arr = [];
    $scope.news.dataRefresh = function () {
        var url = 'http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=1&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset=0&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore';

        HttpFactory.getData(url).then(function (result) {
            if (result[0].ads){
                $scope.news.adsArray = result[0].ads;
                result.splice(0,1);
                arr = arr.concat(result);
            }else {
                arr = arr.concat(result);
            }
            $scope.news.itemsArray = arr;
            $scope.$broadcast('scroll.refreshComplete');
            index = 1;
        });
    };

    $scope.news.canSlide = function (val) {
        $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(val);
    };
    $scope.news.dataLoading = function () {
        index += 1;
        var myUrl = 'http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=1&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset='+ index +'&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore';
        HttpFactory.getData(myUrl).then(function (result) {
            if (result[0].ads){
                $scope.news.adsArray = result[0].ads;
                result.splice(0,1);
                arr = arr.concat(result);
            }else {
                arr = arr.concat(result);
            }
            $scope.news.itemsArray = arr;
            $scope.$broadcast('scroll.infiniteScrollComplete');

        });
    };


    $scope.news.dataRefresh();







}]);
