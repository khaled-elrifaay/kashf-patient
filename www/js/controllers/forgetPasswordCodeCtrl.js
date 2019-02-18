angular.module('app.controllers')
        .controller('forgetPasswordCodeCtrl', function ($scope, WebService, $state) {
            $scope.saveNewPassword = function (confirmation) {
                var data = $.param({
                    code: confirmation.code,
                    new_password: confirmation.newPassword
                });
                WebService.wepServiceConnector(data, "postSaveNewPassword", true).then(function (result) {
                    var response = result.result;
                    if (response === '1') {
                        alert('confirm password')
                        $state.go('login');
                    } else {
                        alert('code is in correct');
                    }
                });
            };
        });
