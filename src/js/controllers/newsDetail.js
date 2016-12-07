/**
 * Created by lx on 2016/12/7.
 */
angular.module('myApp.newsDetail',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('newsDetail',{
        url:'/newsDetail',
        views:{
            'mainPage':{
                templateUrl:'news_detail.html',
                controller:'newsDetailController'
            }
        }

    })
}]).controller('newsDetailController',[function () {
    
}]);
