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
