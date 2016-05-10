angular.module('ionicApp', ['ionic', 'ngMessages'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('emailMobile', {
                url: '/email-mobile',
                templateUrl: 'templates/email-mobile.html',
                controller: 'emailMobileCtrl'

            }).state('email', {
                url: '/email',
                templateUrl: 'templates/email.html',
                controller: 'emailCtrl'
            }).state('emailOk', {
                url: '/email-ok',
                templateUrl: 'templates/email-ok.html'
            }).state('mobile', {
                url: '/mobile',
                templateUrl: 'templates/mobile.html',
                controller: 'mobileCtrl'
            }).state('newPassword', {
                url: '/new-password',
                templateUrl: 'templates/new-password.html',
                controller: 'newPasswordCtrl'
            }).state('ok', {
                url: '/ok',
                templateUrl: 'templates/ok.html'
            });

        $urlRouterProvider.otherwise('/email-mobile');
    })

    .controller('emailMobileCtrl',function ($scope, $state) {
        $scope.formData = {
            method: 'email'
        };

        $scope.next = function (method) {
            $state.go(method);
        };
    }).controller('emailCtrl',function ($scope, $state) {
        $scope.email = '';

        $scope.next = function (email) {
            if (email) {
                $state.go('emailOk');
            }
        };
    }).controller('mobileCtrl',function ($scope, $state) {
        $scope.user = {
            mobile: '',
            smsCode: '',
            smsCodeOk: false
        };

        $scope.sendSMS = function (user) {
            user.smsCodeOk = true;
        };

        $scope.checkSMS = function (user) {
            user.smsCodeOk = true;
        };

        $scope.next = function (user) {
            $state.go('newPassword');
        };
    }).controller('newPasswordCtrl', function ($scope, $state) {
        $scope.user = {
            pwd1: '',
            pwd2: '',
            same: false
        };

        function pwdSame(newValue, oldValue, scope) {
            scope.user.same = (newValue.pwd1 === newValue.pwd2);
        }

        $scope.$watch('user', pwdSame, true);

        $scope.submit = function (user) {
            //更新密码
            $state.go('ok');
        };
    });


//end file