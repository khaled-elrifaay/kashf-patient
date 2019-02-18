
angular.module('app.controllers')
        .controller('callNotificationCtrl', function ($scope, backButton, $stateParams, $state, $ionicPlatform, WebService) {
            $scope.$on("$ionicView.enter", function (event, data) {
                backButton.GetSpecLocalDB(501, false, true, false);
             
            });
            $scope.call = $stateParams.call;
            if (typeof $stateParams.call === "object") {
                         $scope.call = $stateParams.call;
                        $scope.call_type = $stateParams.call.type;
                        $scope.fees = $scope.call.fees;
                        $scope.doc = $scope.call.doctor_name;
                        $scope.message = $scope.call.message;
                        console.log("1q",$scope.call)
                     if($scope.call.payment == 3){
                            $scope.offer = true;
                            $scope.noOffer = false;
                    }else{
                            $scope.offer = false;
                            $scope.noOffer = true;
                    }
            } else {
                $scope.call = JSON.parse($stateParams.call);
                                console.log("1q2",$scope.call)

            }
/*            if($scope.call.message.payment == 3){
                $scope.callCenterNumber=true;
                $scope.notPayMessage=true;
                $scope.cvvNumber=false;
                $scope.okButton=true;
                $scope.payButton=false;
            }else{
                $scope.callCenterNumber=false;
                $scope.notPayMessage=false;
                $scope.cvvNumber=true;
                $scope.okButton=false;
                $scope.payButton=true;
            }*/
            
            
            
            $scope.cvvTries = 0;

            var buttonTimer = setTimeout(function(){
                    var data = $.param(
                        {
                            call_id: $scope.call.action_id
                            

                        });
                    WebService.wepServiceConnector(data, "notResponseCallStatus", false).then(function (result) {
                        alert("Your last request expired, as it was not processed from your side");
                        $state.go("menu.map");
                     });
                    
                }, 600000);
            $scope.pay=function(cvv){
                console.log("cvv",cvv);
                clearTimeout(buttonTimer);
                var data = $.param(
                    {
                        call_id: $scope.call.action_id,
                        requested_by:window.localStorage.getItem('patientAccountId') ,
                        notification_id:$scope.call.notification_id,
                        fees:$scope.call.doctor_rate,
                        cvv:cvv
                    }
                );

                WebService.wepServiceConnector(data, "patientPayCall", false).then(function (result) {
                    var response = result.result;
                    console.log("result",result);
         /*          $scope.cvvNumber=false;
                    $scope.payButton=false;
                    $scope.okButton=true;*/
                    $scope.cvvTries++;
                    if (response.result == 1) {
                        $scope.offer=true;
                        $scope.noOffer=false;
                        $state.go("menu.map");
                    } else if(response.result == 3) {
                        $scope.offer=false;
                        $scope.noOffer=true;
                        alert("Incorrect CVV number. Please enter the correct number");
                        $state.go("menu.map");
                    } else {
                        alert("The transaction was not successful. Check your primary credit card.");
                        $state.go("menu.map");
                    } 
                });
            };
            $scope.backToHome=function(){
                $state.go('menu.map');
            }
            
        });

