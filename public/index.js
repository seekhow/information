/**
 * Created by seekhow on 2017/7/30.
 */
var webapp=angular.module('information', ['ui.router']);

webapp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/jwc");
    $stateProvider
        .state("/jwc", {
            url: "/jwc",
            templateUrl: "public/pages/main.html",
            controller: function ($scope, $http) {
                $scope.newslist = [];
                $http.get('/api/jwc/all').then(
                    function (res) {
                        //console.log(res.data);
                        $scope.newslist = res.data;
                    }, function (res) {
                        console.log('error');
                    });
            }
        })
        .state("jwc/content", {
            url: "/content?id",
            templateUrl: "public/pages/content.html",
            controller:function ($scope,$http,$stateParams,$sce) {
                var newsid = $stateParams.id;
                //$http.get('')
                $http.get('/api/jwc/'+newsid).then(
                    function (res) {
                        $scope.title =res.data[0][0].newsTitle;
                        $scope.content = $sce.trustAsHtml(res.data[1][0].newsContent);
                        $scope.link = res.data[1][0].newsLink;
                        $scope.file = res.data[2];
                    },function (res) {
                        console.log('error');
                    }
                );
            }
        })
        .state("/xgb", {
            url: "/xgb",
            templateUrl: "public/pages/main.html",
            controller: function ($scope, $http) {
                $scope.newslist = [];
                $http.get('/api/xgb/show').then(
                    function (res) {
                        //console.log(res.data);
                        $scope.newslist = res.data;
                    }, function (res) {
                        console.log('error');
                    });
            }
        })
        .state("xgb/content", {
            url: "/content?id",
            templateUrl: "public/pages/content.html",
            controller:function ($scope,$http,$stateParams,$sce) {
                var newsid = $stateParams.id;
                //$http.get('')
                $http.get('/api/xgb/'+newsid).then(
                    function (res) {
                        $scope.title =res.data[0][0].newsTitle;
                        $scope.content = $sce.trustAsHtml(res.data[1][0].newsContent);
                        $scope.link = res.data[1][0].newsLink;
                        $scope.file = res.data[2];
                    },function (res) {
                        console.log('error');
                    }
                );
            }
        })
});
