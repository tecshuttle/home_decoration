angular.module('starter.services', [])

    .factory('Chats', function ($http, $rootScope) {
        // Some fake testing data
        var chats = [{
            id: 0, name: 'Ben Sparrow', lastText: 'You on your way?', face: 'img/ben.png'
        }, {
            id: 1, name: 'Max Lynx', lastText: 'Hey, it\'s me', face: 'img/max.png'
        }, {
            id: 2, name: 'Adam Bradleyson', lastText: 'I should buy a boat', face: 'img/adam.jpg'
        }, {
            id: 3, name: 'Perry Governor', lastText: 'Look at my mukluks!', face: 'img/perry.png'
        }, {
            id: 4, name: 'Mike Harrington', lastText: 'This is wicked good ice cream.', face: 'img/mike.png'
        }];

        return {
            all: function ($scope) {
                $http.post('/dishes/getList', {
                    open_time: $scope.open_day
                }).success(function (blog, status, headers, config) {
                    $scope.chats = blog.data;
                });
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('Tuan', function ($http, $rootScope) {
        return {
            all: function ($scope) {
                $http.post('/admin/getList?module=tuan&start=0&limit=9999', {
                    //module: 'tuan'
                }).success(function (result, status, headers, config) {
                    $scope.tuan = result.data;
                });
            }
        };
    })
    .factory('Brand', function ($http, $rootScope) {
        return {
            all: function ($scope) {
                $http.post('/articles/getNgList', {
                    //module: 'tuan'
                }).success(function (result, status, headers, config) {
                    $scope.articleList = result.data;
                });
            },
            getArticle: function ($scope, id) {
                $http.post('/articles/getNgBlog', {
                    id: id
                }).success(function (result, status, headers, config) {
                    $scope.article = result;
                });
            }
        };
    })
    .factory('Cat', function ($http, $rootScope) {
        return {
            all: function ($scope) {
                $http.post('/admin/getList?module=cat&start=0&limit=9999', {
                    //module: 'tuan'
                }).success(function (result, status, headers, config) {
                    $scope.cat = result.data;
                });
            }
        };
    });

//end file
