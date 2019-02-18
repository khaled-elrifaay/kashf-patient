angular.module('app.controllers')
        .controller('forgetPasswordCtrl', function (WebService, $scope, $state) {
            $scope.findMobile = function (userData) {
                var data = $.param({
                    mobile: userData.mobile,
                });
                WebService.wepServiceConnector(data, "postForgetPasswordRequest", true).then(function (result) {
                    var response = result.result;
                    if (response === '1') {
                        alert('please check your mobile for sms')
                        $state.go('forgetPasswordCode');
                    } else {
                        alert('this mobile not correct, please enrer correct mobile number');
                    }

                });
            };
        });