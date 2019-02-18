
angular.module('app.controllers')
        .controller('notificationTempletCtrl', function ($scope, backButton, $stateParams, $state, $ionicPlatform, WebService) {
            $scope.$on("$ionicView.enter", function (event, data) {
                backButton.GetSpecLocalDB(501, false, true, false);
            });
            if (typeof $stateParams.dta === "object") {
                $scope.data = $stateParams.data;
            } else {
                $scope.data = $stateParams.data;
            }
           
            $scope.backToHome=function(){
                $state.go('menu.map');
            }
            
        });

