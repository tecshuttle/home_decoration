var blog = angular.module('blog', ['ngSanitize', 'ngRoute'])
    .provider('blogService', function () { // injectables go here
        this.$get = function ($http, $rootScope) { // injectables go here
            var self = this;

            $rootScope.title = '';
            $rootScope.blogs = [];  //博客列表
            $rootScope.tags = [];   //标签列表
            $rootScope.blog = {};   //当前选择博客
            $rootScope.user = false; //用户是否登录
            $rootScope.keyword = ''; //搜索关键字

            var service = {
                setBlog: function (cid, new_blog) {
                    for (var i in $rootScope.blogs) {
                        var old_blog = $rootScope.blogs[i];

                        if (old_blog.cid === cid) {
                            $rootScope.blogs[i].text = new_blog.text;
                            $rootScope.blogs[i].tags = new_blog.tags;
                        }
                    }
                },
                getBlog: function (cid) {
                    for (var i in $rootScope.blogs) {
                        var blog = $rootScope.blogs[i];

                        if (blog.cid === cid && blog.text !== undefined) {
                            $rootScope.blog = blog;
                            $rootScope.title = service.getTitle(blog.text);
                            return;
                        }
                    }

                    $http.post('/ng/getBlog', {
                        cid: cid
                    }).success(function (blog, status, headers, config) {
                            $rootScope.blog = blog;
                            $rootScope.title = service.getTitle(blog.text);
                            service.setBlog(cid, blog);
                        });
                },
                getContent: function () {
                    var tags = $rootScope.tags;
                    var tagged_id = [];

                    for (var i in tags) {
                        if (tags[i].tagged) {
                            tagged_id.push(tags[i].id);
                        }
                    }

                    $http.post('/ng/getList', {
                        tagged_id: tagged_id.join(', ')
                    }).success(function (blogs, status, headers, config) {
                            $rootScope.blogs = blogs;
                        });
                },
                getTags: function () {
                    $http.post('/tag_api/getListTotal', {
                        //none
                    }).success(function (tags, status, headers, config) {
                            $rootScope.tags = tags;
                        });
                },
                recountTags: function () {
                    $http.post('/tag_api/getListTotal', {
                        //none
                    }).success(function (tags, status, headers, config) {
                            //仅更新旧标签的数量
                            for (var i in $rootScope.tags) {
                                $rootScope.tags[i].total = tags[i].total;
                            }
                        });
                },
                search: function (keyword) {
                    $rootScope.keyword = keyword;

                    $http.post('/ng/search', {
                        keyword: keyword
                    }).success(function (blogs, status, headers, config) {
                            $rootScope.blogs = blogs;
                        });
                },
                getTitle: function (text) {
                    return text.split('\n')[0].substr(1);
                }
            };

            $http.post('/ng/getUser').success(function (result, status, headers, config) {
                $rootScope.user = result.user;
            });

            service.getContent();
            service.getTags();

            return service;
        }
    });


blog.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'contentCtrl'
        })

        .when('/:cid', {
            templateUrl: 'templates/blog.html',
            controller: 'blogCtrl'
        })

        .when('/edit/:cid', {
            templateUrl: 'templates/edit.html',
            controller: 'editCtrl'
        })

        .otherwise({
            redirectTo: '/'
        });
});


blog.controller('contentCtrl', ['$scope', '$rootScope', '$http', '$location', '$timeout', 'blogService',
    function ($scope, $rootScope, $http, $location, $timeout, blogService) {
        $rootScope.title = 'tom-blog';

        //显示标签所属文章
        $scope.tagClick = function (tag) {
            tag.tagged = !tag.tagged;
            blogService.getContent();
        }

        var timer;

        $scope.search = function () {
            if (timer) $timeout.cancel(timer);  //每次按键，重置搜索延时

            timer = $timeout(function () {
                var keyword = $scope.keyword.trim();
                blogService.search(keyword);
            }, 400);
        }
    }
]);


blog.controller('blogCtrl', ['$scope', '$http', '$routeParams', '$location', 'blogService',
    function ($scope, $http, $routeParams, $location, blogService) {
        blogService.getBlog($routeParams.cid);

        //当过虑器用，判断文章是否打上该标签
        $scope.is_tagged = function (tag) {
            for (var i in $scope.blog.tags) {
                if (tag.id === $scope.blog.tags[i].tag_id) return  true;
            }

            return false;
        }

        //查询tag.id是否在文章tags里。
        $scope.idxTag = function (id) {
            for (var i in $scope.blog.tags) {
                if (id === $scope.blog.tags[i].tag_id) return i;
            }

            return false;
        }

        //文章：添加、删除标签
        $scope.tagClick = function (tag) {
            var idx = $scope.idxTag(tag.id);

            if (idx === false) {
                $scope.blog.tags.push({
                    tag_id: tag.id
                });
            } else {
                $scope.blog.tags.splice(idx, 1);
            }

            $http.post('/tag_api/tag', {
                blog_id: $scope.blog.cid,
                tag_id: tag.id,
                is_tagged: (idx === false ? true : false)  //idx=false，表明当前文章未打该tag
            }).success(function (result, status, headers, config) {
                    blogService.recountTags(); //标签有变动，会影响标签下文章的统计，更新标签文章数量
                    blogService.getContent(); //标签有变动，会影响标签下文章的统计，更新标签文章数量
                });
        }
    }
]);

blog.controller('editCtrl', ['$scope', '$http', '$routeParams', '$location', 'blogService',
    function ($scope, $http, $routeParams, $location, blogService) {

        if ($routeParams.cid === '0') {// cid = 0 是新建blog
            $scope.blog = {};
        } else {
            blogService.getBlog($routeParams.cid);
        }

        $scope.save = function (blog) {
            $http.post('/ng/save', {
                cid: blog.cid,
                text: blog.text
            }).success(function (result, status, headers, config) {
                    blogService.getContent(); //保存文章后，刷新文章列表

                    if (blog.cid === 0) {
                        $location.path('/');
                    } else {
                        $location.path('/blog/' + blog.cid);
                    }
                });
        }
    }
]);

blog.filter('markdown', function ($sce) {
    var converter = new Showdown.converter();
    return function (value) {
        var html = converter.makeHtml(value || '');
        return $sce.trustAsHtml(html);
    };
});

blog.filter('show_img', function () {
    return function (input) {
        if (input !== undefined) {
            input = input.replace(/http:\/\/(.+?).(jpg|jpeg|png|gif)[\n\r]/g, '<img src="//$1.$2" />' + "\n");
        }

        return input;
    }
});

//end file