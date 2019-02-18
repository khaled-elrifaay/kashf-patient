angular.module('app.controllers')
        .controller('payCreditVisitCtrl', function ($scope, WebService, $state, $interval, $ionicPlatform, $rootScope, $stateParams) {
            $scope.data=$stateParams.data;
            $scope.doctor_syndicate_number = window.localStorage.getItem('syn_doc');
            $scope.doc_name = window.localStorage.getItem('doc_name')
            $scope.fees = window.localStorage.getItem('fees_doc')
            $scope.distanc = window.localStorage.getItem('distanc_doc')
//            console.log("data"+$scope.data.message.doctor_syndicate_number);
                var buttonTimer = setTimeout(function(){
                    var data = $.param(
                        {
                            visit_id: window.localStorage.getItem('vis_id'),
                            notification_id: window.localStorage.getItem('notify_id'),
                            

                        });
                    WebService.wepServiceConnector(data, "notResponseVisitStatus", false).then(function (result) {
                        alert("Your last request expired, as it was not processed from your side");
                        $state.go("menu.map");
                     });
                    
                }, 600000);
                $scope.pay = function (cvv) {
                    clearTimeout(buttonTimer);
                var data = $.param(
                        {
                            visit_id: window.localStorage.getItem('vis_id'),
                            requested_by: window.localStorage.getItem('patientAccountId'),
                            notification_id: window.localStorage.getItem('notify_id'),
                            fees: window.localStorage.getItem('fees_doc'),
                            cvv: cvv

                        });

                WebService.wepServiceConnector(data, "payCreditVisit", false).then(function (result) {
                   if(result.result.result==1){
                       alert("The transaction was successfully completed, your doctor was notified")
                       $state.go("menu.doctorMap", {doctor_id: window.localStorage.getItem('id_doc'), notification_id: window.localStorage.getItem('notify_id'), visit_id: window.localStorage.getItem('vis_id')});
                   }else if(result.result.result==2){
                       alert("The transaction was not successful. Check your primary credit card.");
                       $state.go("menu.map");
                   }else if(result.result.result==3){
                       alert("cvv not correct please try again")
                   }

                });
            }

        })


