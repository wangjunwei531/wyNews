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
