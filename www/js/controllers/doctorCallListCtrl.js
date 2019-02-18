angular.module('app.controllers')
        .controller('doctorCallListCtrl', function ($scope, $state, $stateParams, DoctorsService, $ionicPlatform,configService,$ionicLoading) {
            configService.setEmptyReqLock(true);
            $scope.speId = $stateParams.speId;
            $scope.genderSP = $stateParams.gender;
            $scope.GradeSP = $stateParams.grade;
            $scope.MajorName = $stateParams.major;
            $scope.MinorName = $stateParams.minor;
            $scope.URL=$scope.base_url;
            $scope.intervalclear = setInterval(function () {

                console.log("lat in storage :",window.localStorage.getItem('Lat')); 
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0,
                    duration: 60000
                });
                DoctorsService.GetDoctors({
                    lat: window.localStorage.getItem('Lat'),
                    long: window.localStorage.getItem('Long'),
                    specialization_id: $scope.speId,
                    gender: $scope.genderSP,
                    grade: $scope.GradeSP,
                    call:true,
                }).then(function (data) {
                    $scope.doctor_list = data;
                    for (i = 0; i < data.length; i++) {
                        var tempR = Math.round(data[i].rating);
                        $scope.rating = (tempR != null && tempR != 'undefined') ? tempR : 0;
                        $scope.ratingsObject = {
                            iconOn: 'ion-ios-star', //Optional
                            iconOff: 'ion-ios-star', //'ion-ios-star-outline', //Optional
                            iconOnColor: '#ff7c00', //Optional
                            iconOffColor: '#e3e3e3', //Optional
                            rating: $scope.rating, //Optional
                            maxRating: 5,
                            minRating: 0,
                            readOnly: true, //Optional
                            callback: function (rating) {    //Mandatory
                                $scope.ratingsCallback(rating);
                            }
                        };
                        $scope.spe_name = data[i].spe_name;
                    }
                    $ionicLoading.hide();
                });
            }, 5000);
            setTimeout(function( ) { clearInterval( $scope.intervalclear );
            if($scope.doctor_list==""){
                alert("Sorry, no available doctors online in this specialty right now, You can come back later.");
            }
            }, 30000);
            
            $scope.confirm = function (first_name, last_name, id, fees, grade, specialization, rate, gender, image) {
                clearInterval($scope.intervalclear);
                var first_name_v = (first_name != null && first_name != 'undefined') ? first_name : "";
                var last_name_v = (last_name != null && last_name != 'undefined') ? last_name : "";
                var id_v = (id != null && id != 'undefined') ? id : "";
                var fees_v = (fees != null && fees != 'undefined') ? fees : "";
                var grade_v = (grade != null && grade != 'undefined') ? grade : "";
                var specialization_v = (specialization != null && specialization != 'undefined') ? specialization : "";
                var rate_v = (rate != null && rate != 'undefined') ? rate : "";
                var gender_v = (gender != null && gender != 'undefined') ? gender : "";
                var image_v = (image != null && image != 'undefined') ? image : "";
                $state.go('requestCallConfirmation', {first_name: first_name_v, last_name: last_name_v, id: id_v, fees: fees_v, patientId: $stateParams.patientId, grade: grade_v, specialization: specialization_v, rate: rate_v, gender: gender_v, image: image_v})
                configService.setEmptyReqLock(false);
            };
            $scope.$on("$ionicView.leave", function (event, data) {
                configService.setEmptyReqLock(false);
                clearInterval($scope.intervalclear);
            });
        });
