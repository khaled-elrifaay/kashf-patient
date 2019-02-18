angular.module('app.controllers')
        .controller('requestDoctorConfirmationCtrl', function ($scope, WebService, $state, $stateParams, $rootScope,configService,cardService) {
            var request_by = window.localStorage.getItem('patientAccountId')
            $scope.doctorName = $stateParams.first_name + ' ' + $stateParams.last_name
            $scope.fees = $stateParams.fees;
            $scope.distanc = $stateParams.distanc;
            $scope.grade = $stateParams.grade;
            $scope.spe_name = $stateParams.specialization;
            $scope.gender = $stateParams.gender;
            var x = $stateParams.patientId;
            console.log("rfor",x);
            $scope.request_time=new Date();
            var ampm="am";
            var hr = $scope.request_time.getHours();
            if(hr>12){
                ampm="pm";
            }
            $scope.request_time=$scope.request_time.toLocaleString()+ampm;
//            y = $scope.request_time.getFullYear(), m = $scope.request_time.getMonth(); d=$scope.request_time.getDay();
//            $scope.request_time = new Date(d, m, y);
            $scope.payment=1;
            $scope.gender_note = false;
            if($stateParams.gender == "female")
                $scope.gender_note = true;
            
            ;
            $scope.image = $scope.base_url + "uploads/doctors/photos/" + $stateParams.image;
            $scope.notes = "";
            $scope.rating = Math.round($stateParams.rate);
            

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
            $scope.obj = {notes: ""};
            function makeRequest(note){
                var geocoder = new google.maps.Geocoder();
                           var latlng = {lat: window.localStorage.getItem('Lat'), lng: window.localStorage.getItem('Long')};
                                                    console.log("lat lng" ,latlng)

                    geocoder.geocode({'location': latlng}, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            $scope.address = results[0].formatted_address;

                        }
                    });
                console.log("Sasasa",window.localStorage.getItem('Lat'))
                    var responsedata = $.param({
                        Visit: {
                            doctor_id: $stateParams.id,
                            requested_by: request_by,
                            requested_for: $stateParams.patientId,
                            visit_latitude: window.localStorage.getItem('Lat'),
                            visit_longitude: window.localStorage.getItem('Long'),
                            payment: $scope.payment,
                            notes: note,
                            address: $scope.address
                        }
                    });

                    WebService.wepServiceConnector(responsedata, "postCreateVisitRequest", false).then(function (result) {
                        var response = result.result;
                        if (response.result == true) {
                            window.sessionStorage.setItem('visitId', response.visit_id);
                            $state.go("menu.map");

                        }
                    });
            }
            $scope.confirm = function (obj,payment) {
                var note = obj.notes;
                $scope.payment = $scope.payment;
                if($scope.payment==1){
                    var data =$.param({
                        doctor_id: $stateParams.id,
                   
                    });
                    WebService.wepServiceConnector(data, "checkDoctorHavecreditCard", false).then(function (result) {
                        $scope.cashMethod = result.result;
                        if($scope.cashMethod==true){
                            $scope.disableCon=false;
                                makeRequest(note);
                        }else{
                            $scope.disableCon=true;
                            alert("cash payment feature disabled for this doctor");
                        }
                        
                    });
                }else{
                    makeRequest(note);
                }
                

            };

            $scope.cancel = function () {
                $state.go('menu.map');
            };
            $scope.disableCon=false;
            
            $scope.checkCard=function(){
                $scope.payment=2;
                configService.setCardLock(true);                
                cardService.GetCardFromServer();
                configService.setCardLock(false);
                $scope.CardsDataBig = cardService.GetCardLocalDB();               
                console.log('card : '+$scope.CardsDataBig);
                if($scope.CardsDataBig.length==0){
                    $scope.disableCon=true;
                    alert("You can't use this service until you add a credit card");

                }else{
                    $scope.disableCon=false;
                }
               
                
            }
            $scope.allowConfirm=function(){
                $scope.payment=1;
                    $scope.disableCon=false;
                
               
               
            };

        });
