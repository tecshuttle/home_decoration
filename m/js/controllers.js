angular.module('starter.controllers', [])

    .controller('HomeCtrl', function ($scope) {
    })

    .controller('BookingCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.cart = [];
        $scope.open_day = 1;
        $scope.chats = Chats.all($scope);
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };

        $scope.tagClick = function (day) {
            $scope.open_day = day;
            Chats.all($scope);
        }

        $scope.addClick = function (dish) {
            $scope.cart.push(dish);
        }

        $scope.subClick = function (dish) {
            $scope.cart.pop();
        }
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('CartCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });



//end file