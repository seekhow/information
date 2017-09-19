/**
 * Created by seekhow on 2017/7/30.
 */
//var webapp=angular.module('information', []);
var webapp=angular.module('information', ['ui.router']);
// webapp.controller('listController', function ($scope,$http) {
//     $scope.newslist = [];
//     $http.get('/api/show').then(
//         function (res) {
//             $scope.newslist=res.data;
//         }, function (res) {
//             console.log('error');
//         });
// });

webapp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/index");
    $stateProvider
        .state("/index", {
            url: "/index",
            templateUrl: "public/pages/main.html",
            controller: function ($scope, $http) {
                $scope.newslist = [];
                $http.get('/api/jwc/show').then(
                    function (res) {
                        console.log(res.data);
                        $scope.newslist = res.data;
                    }, function (res) {
                        console.log('error');
                    });
            }
        })
        .state("content", {
            url: "/content/{id}",
            templateUrl: "public/pages/content.html",
            controller:function ($scope,$http,$stateParams,$sce) {
                var newsid = $stateParams.id;
                //$http.get('')
                $http.get('/api/jwc/'+newsid).then(
                    function (res) {
                        //console.log(res.data[2]);
                        $scope.title =res.data[0][0].newsTitle;
                        $scope.content = $sce.trustAsHtml(res.data[1][0].newsContent);
                        $scope.file = res.data[2];
                    },function (res) {
                        console.log('error');
                    }
                );
            }
        });
});
