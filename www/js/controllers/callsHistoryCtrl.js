angular.module('app.controllers')
        .controller('callsHistoryCtrl', function ($scope, $state, $ionicPlatform, callService) {
            $scope.$on("$ionicView.enter", function (event, data) {
                $scope.calls = callService.GetCallLocalDB();
                $scope.callReport = function (index) {
                    $state.go('callDetails', {call_details: JSON.stringify($scope.calls[index])});
                };
            });
        });