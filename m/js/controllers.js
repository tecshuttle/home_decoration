angular.module('starter.controllers', [])

    .controller('HomeCtrl', function ($scope) {
    })

    .controller('BookingCtrl', function ($scope, Cat) {
        $scope.cat = [];
        Cat.all($scope);
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('CartCtrl', function ($scope, Tuan) {
        $scope.tuan = [];
        Tuan.all($scope);
    })

    .controller('BrandCtrl', function ($scope, $stateParams, Brand) {
        $scope.articleList = [];
        $scope.article = [];
        Brand.all($scope);

        if ($stateParams.id) {
            Brand.getArticle($scope, $stateParams.id)
        }
    })

    .controller('AccountCtrl', function ($scope) {

    });

//end file