// angular.module('app.services')
//         .service('notificationService', ['WebService', 'configService', '$state','$interval','$rootScope', function (WebService, configService, $state,$interval,$rootScope) {
//                 var mainScope = this;
//                 this.GetNotifyLocalDB = function () {
//                     var data = window.localStorage.getItem('notification');
//                     return (data !== null && data != 'undefined') ? JSON.parse(data) : null;
//                 };
//                 this.GetNotifyVerLocalDB = function () {
//                     var data = window.localStorage.getItem('notificationVer');
//                     return (data !== null && data != 'undefined') ? JSON.parse(data) : -1;
//                 };
//                 this.DeleteNotifyLocalDB = function () {
//                     window.localStorage.removeItem('notificationVer');
//                     window.localStorage.removeItem('notification');
//                 };


//                 this.DeleteNotifyById = function (index) {
                   
//                     var obj = mainScope.GetNotifyLocalDB();
//                     obj.splice(index, 1);
//                     window.localStorage.removeItem('notification');
//                     window.localStorage.setItem('notification', JSON.stringify(obj));
//                 };

//                 this.DeleteNotifyByServerId = function (index) {
//                     var obj = mainScope.GetNotifyLocalDB();
//                     for (var i = 0; i < obj.length; i++)
//                     {
//                         if (obj[i].notification_id == index)
//                         {
//                             obj.splice(i, 1);
//                             i = obj.length + 10;
//                         }
//                     }
//                     window.localStorage.removeItem('notification');
//                     window.localStorage.setItem('notification', JSON.stringify(obj));
//                 };

//                 this.notifyService = function (notification) {
//                     cordova.plugins.notification.local.on("schedule", function(notification){
//                         console.log("notification scheduled!", notification);
//                     });
//                     notification.forEach(function (entry) {
//                         var data = entry;
//                         if (data.message_type == '1') {
//                             // var alarmTime = new Date((new Date()).getTime() + 5000);
//                             // alarmTime.setMinutes(alarmTime.getMinutes());
//                                 console.log(data.message);
//                                 cordova.plugins.notification.local.schedule({
//                                 id: "1",
//                                 trigger: {in: 5, unit: 'second'},
//                                 text: data.message.NotificationMessage,
//                                 title: data.message.NotificationTitle,
//                                 foreground: true,
//                                 // icon: "img/icon.png",
//                             })
//                              var buttonTimer;
// //                            alert("paymentType :"+data.message.payment)
//                             console.log('paymentType : ' +data.message.payment);
//                             if(data.message.payment== 2){
// //                                alert("done");
//                                  buttonTimer = setTimeout(function(){
// //                                    alert("done");
//                                     var dataVisit = $.param(
//                                         {
//                                             visit_id: data.message.call_id,
//                                             notification_id: data.notification_id,


//                                         });
//                                         WebService.wepServiceConnector(dataVisit, "notResponseVisitStatus", false).then(function (result) {
//                                             cordova.plugins.notification.local.cancelAll(function() {
// //                                            alert ("done");
//                                         }, this);
//                                             alert("Your last request expired, as it was not processed from your side");
//                                             $state.go("menu.map");
//                                          });
//                                          var dataobj = $.param({
//                                             notification_id: data.notification_id
//                                         });
                                
//                                          WebService.wepServiceConnector(dataobj, "postSeenNotification", false).then(function (result) {
//                                            var response = result.result;
//                                          mainScope.DeleteNotifyByServerId(data.notification_id);
//                                 });

//                                  }, 600000);

//                                 }
                            
//                             cordova.plugins.notification.local.on("click", function () {
//                                 console.log(data);
//                                 clearTimeout(buttonTimer);
// //                                $state.go("menu.doctorMap", {doctor_id: data.doctor_id, notification_id: data.notification_id, visit_id: data.visit_id});
//                                 var dataobj = $.param({
//                                     notification_id: data.notification_id
//                                 });
                                

//                                 WebService.wepServiceConnector(dataobj, "postSeenNotification", false).then(function (result) {
//                                     var response = result.result;
//                                     mainScope.DeleteNotifyByServerId(data.notification_id);
//                                 });
//                                 // if visit is cash
//                                 if(data.message.payment== 1){
//                                     $state.go("menu.doctorMap", {doctor_id: data.doctor_id, notification_id: data.notification_id, visit_id: data.visit_id});
//                                 }// if visit is credit 
//                                 else if(data.message.payment== 2){
//                                     $state.go("payCreditVisit", {data:data});
//                                 }
                                
//                             }); 
                            
                            
//                             $rootScope.disableCancelBtn = false;
//                             $rootScope.disableCancelBtnTime = 5;
//                             mainScope.stop = $interval(function () {
//                                 $rootScope.disableCancelBtnTime = $rootScope.disableCancelBtnTime - 1;
//                                 if ($rootScope.disableCancelBtnTime <= 0) {
//                                     $rootScope.disableCancelBtnTime = 0;
//                                     $interval.cancel(mainScope.stop);
//                                     $rootScope.disableCancelBtn = true;
//                                 }
//                             }, 60000, $rootScope.disableCancelBtnTime);
                                
//                                 ////
                                 
//                         }else if(data.message_type == '4'){
//                                console.log('message '+data.message.NotificationMessage);
//                                 cordova.plugins.notification.local.schedule({
//                                     id: "2",
//                                     trigger: {in: 5, unit: 'second'},
//                                     text:"",//data.message.NotificationMessage ,
//                                     title: data.message.NotificationTitle,
//                                     foreground: true,
//                                     // icon: "img/icon.png",
//                                 });
//                                 var buttonTimer = setTimeout(function(){
//                                     var call = $.param(
//                                         {
//                                             call_id: data.message.call_id


//                                         });
//                                     WebService.wepServiceConnector(call, "notResponseCallStatus", false).then(function (result) {
//                                         cordova.plugins.notification.local.cancelAll(function() {
// //                                            alert ("done");
//                                         }, this);
//                                         alert("Your last request expired, as it was not processed from your side");
//                                         $state.go("menu.map");
//                                      });
//                                     var dataobj = $.param({
//                                     notification_id: data.notification_id
//                                     });
                                   

//                                     WebService.wepServiceConnector(dataobj, "postSeenNotification", false).then(function (result) {
//                                         var response = result.result;
//                                          mainScope.DeleteNotifyByServerId(data.notification_id);
//                                     });
//                                 }, 600000);
//                                 cordova.plugins.notification.local.on("click", function () {
//                                     console.log(" i clicked here");
//                                     console.log(data);
//                                     clearTimeout(buttonTimer);
//                                     $state.go("callNotification", {call:data});
//                                     var dataobj = $.param({
//                                     notification_id: data.notification_id
//                                     });
                                   

//                                     WebService.wepServiceConnector(dataobj, "postSeenNotification", false).then(function (result) {
//                                         var response = result.result;
//                                          mainScope.DeleteNotifyByServerId(data.notification_id);
//                                     });
//                                  if(data.message.payment== 3){
//                                     $state.go("callNotification", {call:data});
//                                 }
//                                 });
                        
//                         }else if(data.message_type == '5'){
//                                console.log('message '+data.message.NotificationMessage);
//                                 cordova.plugins.notification.local.schedule({
//                                     id: "3",
//                                     trigger: {in: 5, unit: 'second'},
//                                     text:data.message.NotificationMessage ,
//                                     title: data.message.NotificationTitle,
//                                     foreground: true,
//                                     // icon: "img/icon.png",
//                                 });
//                                 cordova.plugins.notification.local.on("click", function () {
//                                     console.log(data);
                                    
//                                     var dataobj = $.param({
//                                     notification_id: data.notification_id
//                                     });
                                   
                                   
//                                     WebService.wepServiceConnector(dataobj, "postSeenNotification", false).then(function (result) {
//                                         var response = result.result;
//                                          mainScope.DeleteNotifyByServerId(data.notification_id);
                                        
//                                     });
//                                      $state.go("callNotification", {call:data});
//                                 });
//                             }else if(data.message_type == '-1'){
// //                                alert("data.message.NotificationTitle");
// //                               console.log('message '+data.message.NotificationMessage);
//                                 cordova.plugins.notification.local.schedule({
//                                     id: "4",
//                                     trigger: {in: 5, unit: 'second'},
//                                     text:"doctor Reject your call request" ,
//                                     title: "Call Rejected",
//                                     foreground: true,
//                                     // icon: "img/icon.png",
//                                 });
//                                 cordova.plugins.notification.local.on("click", function () {
//                                     console.log(data);
                                    
//                                     var dataobj = $.param({
//                                     notification_id: data.notification_id
//                                     });
                                   

//                                     WebService.wepServiceConnector(dataobj, "postSeenNotification", false).then(function (result) {
//                                         $state.go("specializationCall");
//                                         var response = result.result;
//                                          mainScope.DeleteNotifyByServerId(data.notification_id);
//                                     });
//                                     $state.go("specializationCall");
//                                 });
                            
//                         }else if(data.message_type == '12'){
// //                                alert("data.message.NotificationTitle");
// //                               console.log('message '+data.message.NotificationMessage);
//                                 cordova.plugins.notification.local.schedule({
//                                     id: "5",
//                                     trigger: {in: 5, unit: 'second'},
//                                     text:"doctor no  response request" ,
//                                     title: "doctor no response",
//                                     foreground: true,
//                                     // icon: "img/icon.png",
//                                 });
//                                 cordova.plugins.notification.local.on("click", function () {
//                                     console.log(data);
//                                     var dataobj = $.param({
//                                     notification_id: data.notification_id
//                                     });
                                   
                                   
//                                     WebService.wepServiceConnector(dataobj, "postSeenNotification", false).then(function (result) {});
                                        
//                                     mainScope.DeleteNotifyByServerId(data.notification_id);
//                                     $state.go("noResponse");
                                   

                                    
//                                 });
                            
//                         }else if(data.message_type == '6'){
//                                console.log('message '+data.message.NotificationMessage);
//                                 cordova.plugins.notification.local.schedule({
//                                     id: "6",
//                                     trigger: {in: 5, unit: 'second'},
//                                     text:data.message.NotificationMessage ,
//                                     title: data.message.NotificationTitle,
//                                     foreground: true,
//                                     // icon: "img/icon.png",
//                                 });
//                                 cordova.plugins.notification.local.on("click", function () {
//                                     console.log(data);
                                    
//                                     var dataobj = $.param({
//                                     notification_id: data.notification_id
//                                     });
                                   
                                   
//                                     WebService.wepServiceConnector(dataobj, "postSeenNotification", false).then(function (result) {
                                        
//                                         var response = result.result;
//                                         console.log(data);
//                                         $state.go("notificationTemplet", {data:data});
//                                          mainScope.DeleteNotifyByServerId(data.notification_id);
//                                     });
//                                    console.log(data);
//                                     $state.go("notificationTemplet", {data:data});
//                                 });
                            
//                         } else if (data.message_type == '3') {
//                             // var alarmTime = new Date((new Date()).getTime() + 5000);
//                             // alarmTime.setMinutes(alarmTime.getMinutes());
//                             cordova.plugins.notification.local.schedule({
//                                 id: "7",
//                                 trigger: {in: 5, unit: 'second'},
//                                 text: "Please click here to view the report.",
//                                 title: "Visit Ended",
//                                 foreground: true,
//                                 foreground: true,
//                                 // icon: "img/icon.png",
//                             },function(x){console.log('Schedule callback called!',x);});
//                             cordova.plugins.notification.local.on("click", function () {
//                                 var dataobj = $.param({
//                                     notification_id: data.notification_id
//                                     });
                                   
                                   
//                                     WebService.wepServiceConnector(dataobj, "postSeenNotification", false).then(function (result) {});
                                        
//                                 $state.go("visitReport", {report: data});
//                             });
//                         } else if (data.message_type == '0') {
                            
//                             // var alarmTime = new Date((new Date()).getTime() + 5000);
//                             // alarmTime.setMinutes(alarmTime.getMinutes());
                            
//                                     cordova.plugins.notification.local.schedule({
//                                     id: "1",
//                                     trigger: {in: 5, unit: 'second'},
//                                     text: "Please click here to choose another doctor.",
//                                     title: "Visit Request Rejected",
//                                     foreground: true,
//                                     // icon: "img/icon.png"
//                                 });
                                    
                            
                            
                            
//                             cordova.plugins.notification.local.on("click", function () {
                                
//                                 $state.go("specialization");
//                                 var dataobj = $.param({
//                                     notification_id: data.notification_id
//                                 });
//                                 mainScope.DeleteNotifyByServerId(data.notification_id);

//                                 WebService.wepServiceConnector(dataobj, "postSeenNotification", false).then(function (result) {
//                                     var response = result.result;
//                                 });
//                             });
//                         }
//                     });
//                 };


//                 this.UpdateNotifyLocalDB = function (notification) {
//                     if (notification.notificationVer != 'undefined' || notification.notificationVer != null) {
//                         window.localStorage.setItem('notificationVer', notification.notificationVer);
//                     }
//                     var newnotify = null;
//                     if (mainScope.GetNotifyLocalDB() === null)
//                     {
//                         newnotify = notification.notification;
//                     } else
//                     {
//                         var obj = mainScope.GetNotifyLocalDB();
//                         var newObj = notification.notification
//                         newObj.forEach(function (entry) {
//                             obj.push(entry);
//                         });
//                         obj.concat(notification.notification);
//                         newnotify = obj;

//                     }
//                     window.localStorage.setItem('notification', JSON.stringify(newnotify));
//                     mainScope.notifyService(notification.notification);

//                 };

//                 this.GetNotifyFromServer = function () {
//                     var data = $.param({
//                         'notify': mainScope.GetNotifyVerLocalDB(),
//                         'patient_account_id': window.localStorage.getItem('patientAccountId'),
//                     });
//                     if (configService.getNotifyLock() != false) {
//                         configService.setNotifyLock(false);
//                         WebService.wepServiceConnector(data, "getNotificationMenu", false).then(function (result) {
//                             mainScope.UpdateNotifyLocalDB(result);
//                         });
//                     }
//                 };
//             }]);