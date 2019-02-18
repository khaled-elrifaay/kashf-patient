angular.module('app.controllers')
        .controller('confirmationCtrl', function ($scope, WebService, $state) {
            $scope.confirmCode = function (confirmation) {
                var data = $.param({
                    code: confirmation.code
                });
                WebService.wepServiceConnector(data, "postPatientsConfirmAccount", true).then(function (result) {
                    var response = result.result;
                    if (response == 'confirm') {
                        $state.go('login');
                    } else {
                        alert('Incorrect code. please, enter correct code');
                        $state.go('confirmation');
                    }
                });
            };
        });
