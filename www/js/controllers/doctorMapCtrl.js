angular.module('app.controllers')
        .controller('doctorMapCtrl', function ($scope, WebService, $state, $stateParams, $interval, DoctorMapService, configService) {
              $scope.x=$stateParams.data;
          console.log("data ",$scope.x);
                    $scope.$on("$ionicView.enter", function (event, data) {
                configService.setEmptyReqLock(true);
            $scope.x=$stateParams.data;
            $scope.doc_name = window.localStorage.getItem('doc_name')
            $scope.fees = window.localStorage.getItem('fees_doc')
            $scope.distanc = window.localStorage.getItem('distanc_doc')
            $scope.doctor_syndicate_number = window.localStorage.getItem('syn_doc');
                $scope.CancelVisitRequest = function () {
                    var data = $.param(
                            {
                                'doctor_id': window.localStorage.getItem('id_doc'),
                                'patient_account_id': window.localStorage.getItem('patientAccountId'),
                                'visit_id': window.localStorage.getItem('vis_id'),
                                'notification_id': window.localStorage.getItem('notify_id'),
                            });
                    
                    DoctorMapService.UnDrawMapDoctor($scope.div);
                    configService.setEmptyReqLock(false);
                    WebService.wepServiceConnector(data, "postCancelVisitRequest", false).then(function (result) {
                        var data = result.result;
                        $state.go('menu.map');
                    });
                };
                $scope.div = document.getElementById("map_canvas2");
                var map2 = DoctorMapService.DrawMapDoctor($scope.div, window.localStorage.getItem('id_doc'));
                $scope.time = 7;
                // console.log('stateParams', $stateParams);
                var data = $.param({
                    id: window.localStorage.getItem('id_doc')
                });
                var myLocation = new google.maps.LatLng($scope.pos.latitude, $scope.pos.longitude);
                // console.log('here');
                WebService.wepServiceConnector(data, "getDoctorData", false).then(function (result) {
                    // console.log(result);
                    var response = result.result;
                    $scope.first_name = response.first_name;
                    $scope.last_name = response.last_name;
                    $scope.fees = response.fees;
                    $scope.doctor_syndicate_number=response.doctor_syndicate_number;
                    var doctorLocation = new google.maps.LatLng(response.latitude, response.longitude);
                    $scope.distanc = google.maps.geometry.spherical.computeDistanceBetween(doctorLocation, myLocation) / 1000;
                    $scope.distanc = parseFloat($scope.distanc).toFixed(2);
                });
                stop = $interval(function () {
                    $scope.time = $scope.time - 1;
                }, 1000, $scope.time);
            });
            $scope.$on("$ionicView.leave", function (event, data) {
                DoctorMapService.UnDrawMapDoctor($scope.div);
                configService.setEmptyReqLock(false);
            });
        });