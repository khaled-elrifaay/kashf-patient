angular.module('app.controllers')
        .controller('notificationsCtrl', function ($scope, WebService, $state, $interval, $ionicPlatform, $rootScope) {
//            var data = $.param(
//                            {
//                                'notify': notificationService.GetNotifyVerLocalDB(),
//                                'patient_account_id': window.localStorage.getItem('patientAccountId'),  
//                            });
//
//            WebService.wepServiceConnector(data, "getAllNotificationMenu", false).then(function (result) {
//                $scope.notificationmenu=result.notification;
//
//            });
//            $scope.notificationmenu = notificationService.GetNotifyLocalDB();
            $scope.notificationsmenudetails = function (id)
            {
                if ($scope.notificationmenu[id].message_type == '1') {
                    
                    $state.go("menu.doctorMap", {doctor_id: $scope.notificationmenu[id].doctor_id, notification_id: $scope.notificationmenu[id].notification_id, visit_id: $scope.notificationmenu[id].visit_id});
                    $rootScope.disableCancelBtn = false;
                    $rootScope.disableCancelBtnTime = 5;
                    $scope.stop = $interval(function () {
                        $rootScope.disableCancelBtnTime = $rootScope.disableCancelBtnTime - 1;
                        if ($rootScope.disableCancelBtnTime <= 0) {
                            $rootScope.disableCancelBtnTime = 0;
                            $interval.cancel($scope.stop);
                            $rootScope.disableCancelBtn = true;
                            var data = $.param({
                                notification_id: $scope.notificationmenu[id].notification_id
                            });
                          //  notificationService.DeleteNotifyByServerId($scope.notificationmenu[id].notification_id);

                            WebService.wepServiceConnector(data, "postSeenNotification", false).then(function (result) {
                                var response = result.result;

                            });

                        }
                    }, 60000, $rootScope.disableCancelBtnTime);


                    /*  end notification*/
                } else if ($scope.notificationmenu[id].message_type == '3') {
                    $state.go("visitReport", {report: $scope.notificationmenu[id]});
                } else if ($scope.notificationmenu[id].message_type == '0') {
                    var data = $.param({
                        notification_id: $scope.notificationmenu[id].notification_id
                    });
               //     notificationService.DeleteNotifyByServerId($scope.notificationmenu[id].notification_id);

                    WebService.wepServiceConnector(data, "postSeenNotification", false).then(function (result) {
                        var response = result.result;

                    });
                    $state.go("menu.home");

                }else if($scope.notificationmenu[id].message_type == '4'){
                      $state.go("callNotification", {call:$scope.notificationmenu[id]});
                }else if($scope.notificationmenu[id].message_type == '-1'|| $scope.notificationmenu[id].message_type == '5'||$scope.notificationmenu[id].message_type == '6' ){
                //    notificationService.DeleteNotifyByServerId($scope.notificationmenu[id].notification_id);
                    var data = $.param({
                        notification_id: $scope.notificationmenu[id].notification_id
                    });
                    WebService.wepServiceConnector(data, "postSeenNotification", false).then(function (result) {
                        var response = result.result;
                        $state.go("notificationTemplet", {data:$scope.notificationmenu[id]});

                    });
                      
                }

            };
        });