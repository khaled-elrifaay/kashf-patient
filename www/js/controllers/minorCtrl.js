angular.module('app.controllers')
        .controller('minorCtrl', function ($scope, $state,$stateParams) {
            $scope.minor_specialization = $stateParams.myParam;
            $scope.doctorList = function (spe_id) {
                $state.go("doctorList", {speId: spe_id, patientId: $stateParams.patientId});
            };
        });