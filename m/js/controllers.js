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

    .controller('AccountCtrl', function ($scope) {

    });

//end file