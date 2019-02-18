angular.module('app.controllers')
        .controller('visitsHistoryCtrl', function ($scope, $state, $ionicPlatform, visitService) {
            $scope.$on("$ionicView.enter", function (event, data) {
                $scope.visits = visitService.GetVisitLocalDB();
                $scope.visitReport = function (index) {
                    $state.go('visitDetails', {visit_details: JSON.stringify($scope.visits[index])});
                };
            });
        });