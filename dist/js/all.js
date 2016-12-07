/**
 * Created by lx on 2016/12/3.
 */
angular.module('myApp',['ionic','jett.ionic.filter.bar','myApp.tabs','myApp.news','myApp.live','myApp.topic','myApp.me','cftApp.httpFactory','cftApp.slideBox']).config([function () {

}]).controller('mainController',['$scope',function () {

}]);
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

}]).controller('newsController',['$scope','$ionicSlideBoxDelegate','HttpFactory',function ($scope,$ionicSlideBoxDelegate,HttpFactory) {
    var index = 0;
    $scope.news = {

    };
    var url1 = 'http://c.m.163.com/nc/topicset/ios/subscribe/manage/listspecial.html';
    HttpFactory.getData(url1).then(function (result) {

        $scope.news.nameArray = result;
    });
    // $scope.doMe = function () {
    //     console.log(event);
    // };
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
            // if ( arr.length < 8 || arr.length > 130){
            //     $scope.news.isShow = false;
            // }else {
            //     $scope.news.isShow = true;
            // }
            $scope.news.itemsArray = arr;
            $scope.$broadcast('scroll.infiniteScrollComplete');

        });
    };


    $scope.news.dataRefresh();







}]);

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

/**
 * Created by qingyun on 16/12/2.
 */
angular.module('cftApp.httpFactory',[]).factory('HttpFactory',['$http','$q',function ($http,$q) {
    return {
        getData:function (url,type) {
            if (url){
                var promise = $q.defer();
                // url = "http://192.168.0.100:3000/?myUrl=" + encodeURIComponent(url);
                url = "http://localhost:3000/?myUrl=" + encodeURIComponent(url);
                type = type ? type:"GET";
                $http({
                    url:url,
                    method:type,
                    timeout:20000
                }).then(function (reslut) {
                    reslut =reslut.data;
                    reslut = reslut[Object.keys(reslut)[0]];
                    promise.resolve(reslut);
                },function (err) {
                    promise.reject(err);
                });
                return promise.promise;
            }
        }
    };
}]);
/**
 * Created by qingyun on 16/12/2.
 */
angular.module('cftApp.slideBox',[]).directive('mgSlideBox',[function () {
    return{
        restrict:"E",
        scope:{sourceArray:'='},
        template:'<div class="topCarousel"><ion-slide-box delegate-handle="topCarouselSlideBox" on-slide-changed="slideHasChanged($index)" show-pager="true"  ng-if="isShowSlideBox" on-drag="drag($event)"> <ion-slide ng-repeat="ads in sourceArray track by $index" ng-click="goToDetailView($index)"><img ng-src="{{ads.imgsrc}}" class="topCarouselImg"></ion-slide> </ion-slide-box><div class="slideBottomDiv"></div></div>',
        controller:['$scope','$element','$ionicSlideBoxDelegate','$timeout',function ($scope,$element,$ionicSlideBoxDelegate,$timeout) {
            $scope.goToDetailView = function (index) {
                console.log('进入详情页' + index);
            };
            var lastSpan = $element[0].lastElementChild;


            $scope.$watch('sourceArray',function (newVal,oldVal) {

                if (newVal && newVal.length){

                    if (oldVal && oldVal.length && newVal.length != oldVal.length) {
                        $scope.isShowSlideBox = false;
                        $timeout(function () {
                            $scope.isShowSlideBox = true;
                        },10);
                    }else {
                        $scope.isShowSlideBox = true;
                    }
                    /*
                    * 两种方案解决轮播不能立刻显示或者显示错位的bug 改bug由于ng-repeat和slideBox的特性造成
                    * 完美的解决方案是使用添加ng-if 另一种是用update 和 loop
                    *
                    * */

                    // $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').update();
                    $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').loop(true);
                    console.log(lastSpan);
                    lastSpan.innerText = $scope.sourceArray[0].title;
                }
            });
            $scope.slideHasChanged = function (index) {
                lastSpan.innerText = $scope.sourceArray[index].title;
            };
            //页面刚加载出来的时候禁止滑动
            $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
            //拖拽轮播图的时候也要禁止底层的slideBox滑动
            $scope.drag = function (event) {
                $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').loop(true);
                $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
                //阻止事件冒泡
                event.stopPropagation();
            };

        }],
        replace:true,
        link:function (scope,tElement,tAtts) {
        }
    };
}]);