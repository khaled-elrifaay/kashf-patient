angular.module('app.controllers')
        .controller('visitReportCtrl', function ($scope, WebService, $state, $stateParams, $ionicPlatform) {
            $scope.goBackview = function () {
                $state.go('menu.map');
            };
            var rate = 0;
            $scope.report = $stateParams.report;
            $scope.investigations = $scope.report.message.investigations;
            $scope.treatments = $scope.report.message.treatments;
            $scope.notes = $scope.report.message.memo;
            $scope.doctor_name = $scope.report.doctor_name;
            $scope.diagnoses=$scope.report.message.diagnoses;
            $scope.doctor_rate = $scope.report.doctor_rate;
            $scope.payment_type = $scope.report.message.payment_type;
            $scope.image = $scope.base_url + "uploads/doctor-icon-dark-2.png";
            $scope.ratingsObjectsec = {
                iconOn: 'ion-ios-star', //Optional
                iconOff: 'ion-ios-star', //'ion-ios-star-outline', //Optional
                iconOnColor: '#ff7c00', //Optional
                iconOffColor: '#e3e3e3', //Optional
                rating: 0, //Optional
                minRating: 0, //Optional
                maxRating: 9,
                readOnly: false, //Optional
                callback: function (rating, maxRating) {    //Mandatory
                    $scope.ratingsCallback(rating);
                }
            };

            $scope.ratingsCallback = function (rating) {
                rate = rating;
            };
            $scope.reviwDoctor = function () {
                var idNot= $scope.report.notification_id;
               // notificationService.DeleteNotifyByServerId(idNot);
                var data = $.param({
                    rate: rate,
                    doctor_id: $scope.report.message.doctor_id,
                    visit_id: $scope.report.message.visit_id,
                    notification_id: $scope.report.notification_id

                });
                WebService.wepServiceConnector(data, "postRatingDoctor", false).then(function (result) {
                    var response = result.result;
                    if (response == 'true') {
                        $state.go('menu.map');
                    } else {
                        alert('Please rate doctor' + $scope.doctor_name);
                    }
                });
            };
        });
