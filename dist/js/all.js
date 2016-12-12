/**
 * Created by lx on 2016/12/3.
 */
angular.module('myApp',['ionic','jett.ionic.filter.bar','myApp.tabs','myApp.news','myApp.live','myApp.topic','myApp.me','cftApp.httpFactory','cftApp.slideBox','myApp.newsDetail','myApp.search']).config([function () {

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

}]).controller('newsController',['$scope','$state','$stateParams','$ionicSlideBoxDelegate','$ionicViewSwitcher','$ionicTabsDelegate','HttpFactory',function ($scope,$state,$stateParams,$ionicSlideBoxDelegate,$ionicViewSwitcher,$ionicTabsDelegate,HttpFactory) {
    console.log($ionicTabsDelegate);


    // console.log('????');
    // console.log($stateParams);
    var arr = [];
    var flag = 0;
    var num = 0;
    var isShow = true;
    $scope.news = {
        showAds:true,
        btnShow:true,
        text:'排序删除'
    };
    $scope.news.textSame = function (event,text) {
        var item = angular.element(event.currentTarget);
        if (text){
            item.css({'background':'white','color':'red'});
            text == '排序删除' ? $scope.news.text =  '完成' : $scope.news.text = '排序删除';
        }else {
            item.css({'background':'red','color':'white'});
        }
    };
    $scope.news.getList = function (event) {
        // var listMain = angular.element(document.querySelector('.news list_main'));
        // console.log(listMain);
        var i = angular.element(event.currentTarget).children();
        console.log(i);
        var listView = angular.element(document.querySelector('.news .list_view'));
        var listCtr = angular.element(document.querySelector('.news .list_ctr'));
        // if (isShow){
            // listMain.css('display','block');
            // listCtr.css({'display':'block','opacity':'1'});
            // listView.css({'display':'block','transform':'translateY(0)'});
            i.addClass('active');

        // }
        // else {
        //     listMain.css('display','none');
        //     listCtr.css({'display':'none','opacity':'1'});
        //     listView.css({'display':'none','transform':'translateY(8rem - 100vh)'});
        //     i.css('transform','rotate(0deg)');
        // }
        // isShow = !isShow;



    };
    $scope.news.goSearch = function () {
        $state.go('search');
        $ionicViewSwitcher.nextDirection('forward');
    };
    $scope.news.nameArray =['头条','娱乐','体育','网易号','本地','视频','财经','科技','汽车','时尚','图片'];


    $scope.news.joinDetail = function (item) {
        console.log(item,'item');
        $state.go('newsDetail',{docId:item.docid});
        $ionicViewSwitcher.nextDirection("forward");
    };



    $scope.news.dataRefresh = function () {
        flag += 1;
        num = 0;
        var url = 'http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn='+ flag +'&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset=0&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1481113462&sign=DZ76qdaMm6mtlZdb3kRPlwMC9mJyuNtYPbbCOTFGXsd48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore';

        HttpFactory.getData(url).then(function (result) {
            console.log(result);
            if (result[0].ads){
                $scope.news.showAds = true;
                $scope.news.adsArray = result[0].ads;
                result.splice(0,1);
                arr = result;
            }else {
                $scope.news.showAds = false;
                arr = result;
            }
            $scope.news.itemsArray = arr;
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.news.canSlide = function (val) {
        $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(val);
    };
    $scope.news.dataLoading = function (event) {

        if (event){
            console.log(event.currentTarget);
            var listArray = angular.element(event.currentTarget).children();
            console.log(listArray);
        }

        // if (element){
        //     element.style.color = 'red';
        // }
        var index = num *10 + 1;
        var myUrl = '';
        switch (event){

            case '头条':
                myUrl = 'http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=' + flag + '&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset='+ index +'&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore';
            // case '娱乐':
            // case '体育':
            // case '网易号':
            // case '本地':
            // case '视频':
            // case '财经':
            // case '科技':
            // case '汽车':
            // case '时尚':
            // case '图片':
            // case '直播':
            // case '热点':

        }

        myUrl = 'http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=' + flag + '&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset='+ index +'&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore';
        HttpFactory.getData(myUrl).then(function (result) {
            if (result[0].ads){
                $scope.news.adsArray = result[0].ads;
                result.splice(0,1);
                arr = arr.concat(result);
            }else {
                arr = arr.concat(result);
            }
            console.log(arr);
            $scope.news.itemsArray = arr;
            $scope.$broadcast('scroll.infiniteScrollComplete');

        });
    };


    $scope.news.dataRefresh();







}]);

/**
 * Created by lx on 2016/12/7.
 */
angular.module('myApp.newsDetail',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('newsDetail',{
        url:'/newsDetail/:docId',
        views:{
            'mainPage':{
                templateUrl:'news_detail.html',
                controller:'newsDetailController'
            }
        }

    })
}]).controller('newsDetailController',['$scope','$ionicViewSwitcher','$stateParams','$sce','$timeout','HttpFactory',function ($scope,$ionicViewSwitcher,$stateParams,$sce,$timeout,HttpFactory) {
    $scope.newsDetail = {

    };
    console.log($stateParams);
    var url = 'http://c.m.163.com/nc/article/' + $stateParams.docId + '/full.html';
    HttpFactory.getData(url).then(function (result) {
        console.log(result,'result');
        console.log(result,'result');
        console.log(result.body);
        // $scope.newsDetail.title = result.title;
            if (result.img && result.img.length){
                for (var i = 0; i < result.img.length; i++){
                    var imgWidth = result.img[i].pixel.split('*')[0];
                    if (imgWidth > document.body.offsetWidth){
                        imgWidth = document.body.offsetWidth - 20;
                    }

                    var imgStr = "<img" + " width='" + imgWidth + "'" + " src='" + result.img[i].src + "'>";
                    result.body = result.body.replace(result.img[i].ref,imgStr);

                }
            $scope.newsDetail.data = $sce.trustAsHtml(result.body);

        }

    });


    $scope.newsDetail.goBack = function (item) {
        window.history.go(-1);
        $ionicViewSwitcher.nextDirection('back');
    }

}]);

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


}]).controller('tabsController',['$scope','$ionicModal','$timeout',function ($scope,$ionicModal,$timeout) {



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
                        });
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