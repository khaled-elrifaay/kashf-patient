angular.module('app.controllers')
        .controller('requestCallConfirmationCtrl', function ($scope, WebService,cardService, $state, $stateParams, $rootScope) {
            var request_by = window.localStorage.getItem('patientAccountId');
            var offer = window.localStorage.getItem('offer');
            console.log("offer in call",offer);
            var made_calls = window.localStorage.getItem('calls');
            console.log("made_calls in call",made_calls);
            $scope.doctorName = $stateParams.first_name + ' ' + $stateParams.last_name
            $scope.fees = $stateParams.fees;
            $scope.grade = $stateParams.grade;
            $scope.spe_name = $stateParams.specialization;
            $scope.gender = $stateParams.gender;
            $scope.image = $scope.base_url + "uploads/doctors/photos/"+ $stateParams.image;
            $scope.notes = "";
            $scope.rating = Math.round($stateParams.rate);
           $scope.request_time=new Date();
            var ampm="am";
            var hr = $scope.request_time.getHours();
            if(hr>12){
                ampm="pm";
            }
            $scope.request_time=$scope.request_time.toLocaleString()+ampm;

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
            $scope.CardsDataBig = cardService.GetCardLocalDB();
            $scope.confirm = function (obj) {
                var note = obj.notes;
                if(offer == 1 && made_calls != 0){
                console.log("not first call");
                $scope.payment = 2; // mandatory 2
                if ($scope.CardsDataBig.length == 0){
                  alert("You have to register at least a single credit card to use the service.Please press menu, then choose payments");
                }   

             var responsedata = $.param({
                    Call: {
                        doctor_id: $stateParams.id,
                        requested_by: request_by,
                        requested_for:$stateParams.patientId,
                        payment: $scope.payment,
                    }
                });

                WebService.wepServiceConnector(responsedata, "postCreateCallRequest", false).then(function (result) {
                    var response = result.result;
                    if (response.result == true) {
                        made_calls == 5;
                        window.sessionStorage.setItem('callId', response.call_id);
                        window.sessionStorage.setItem('made_calls', made_calls);
                        $state.go("menu.map");

                    }
                });
                 }else{
                console.log("first call");
                $scope.payment = 3; // mandatory 3
                var responsedata = $.param({
                    Call: {
                        doctor_id: $stateParams.id,
                        requested_by: request_by,
                        requested_for:$stateParams.patientId,
                        payment: $scope.payment,
                    }
                });

                WebService.wepServiceConnector(responsedata, "postCreateCallRequest", false).then(function (result) {
                    var response = result.result;
                    if (response.result == true) {
                        made_calls == 5;
                        window.sessionStorage.setItem('callId', response.call_id);
                        window.sessionStorage.setItem('made_calls', made_calls);
                        $state.go("menu.map");

                    }
                });
                 }


            };

            $scope.cancel = function () {
                $state.go('menu.map');
            };

        });
