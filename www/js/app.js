// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngCordova', 'ionic-ratings', 'isteven-multi-select', 'ngDialog', 'angular-datepicker', 'pascalprecht.translate' , 'ion-datetime-picker'])
        .run(function ($ionicPlatform, $rootScope, $state, $ionicPopup, $cordovaNetwork, $timeout, $ionicHistory, $cordovaToast,$translate) {
            $ionicPlatform.ready(function () {
                $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                    $ionicPopup.confirm({
                        title: 'No Internet Connection',
                        content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
                    })
                            .then(function (result) {
                                if (!result) {
                                    ionic.Platform.exitApp();
                                } else {
                                    ionic.Platform.exitApp();
                                }
                            });
                });

                $rootScope.dateValue = new Date();
                $rootScope.timeValue = new Date();
                $rootScope.datetimeValue = new Date();
                $rootScope.disableCancelBtn = null;
                $rootScope.disableCancelBtnTime = 5;
                  // Enable to debug issues.
                // window.plugins.OneSignal.setLogLevel({logLevel: 6, visualLevel: 4});

              window.plugins.OneSignal.addSubscriptionObserver(function (state) {
              if (!state.from.subscribed && state.to.subscribed) {
                console.log("Subscribed for OneSignal push notifications!")
                // get player ID
                state.to.userId
              }
             // console.log("Push Subscription state changed: " + JSON.stringify(state));
            });
             var notificationOpenedCallback = function (jsonData) {
            alert(JSON.stringify(jsonData.notification["payload"].body));
            console.log("open notification",jsonData);
            if((jsonData["notification"]["payload"]["additionalData"].type) == "call_accept"){
                console.log("true");
             $state.go('callNotification', { call: jsonData["notification"]["payload"]["additionalData"]  })

            }else if ((jsonData["notification"]["payload"]["additionalData"].type) == "call_refused"){
                alert("doctor refused your call please choose  another doctor");
            }else if ((jsonData["notification"]["payload"]["additionalData"].type) == "call_cancelled"){
                alert("doctor cancelled your call please choose  another doctor");
        
            }else if ((jsonData["notification"]["payload"]["additionalData"].type) == "call_payment_not_done"){
                alert("call cancelled");
            }
            else if ((jsonData["notification"]["payload"]["additionalData"].type) == "home_visit_accept" &&  (jsonData["notification"]["payload"]["additionalData"].payment) == "2"){
              //  alert("call cancelled");
              console.log("testsss",jsonData["notification"]["payload"]["additionalData"]);
              window.localStorage.setItem('doc_name',jsonData["notification"]["payload"]["additionalData"].doctor_name);
              window.localStorage.setItem('fees_doc',jsonData["notification"]["payload"]["additionalData"].fees);
              window.localStorage.setItem('id_doc',jsonData["notification"]["payload"]["additionalData"].doctor_id);
              window.localStorage.setItem('vis_id',jsonData["notification"]["payload"]["additionalData"].action_id);
              window.localStorage.setItem('notify_id',jsonData["notification"]["payload"]["additionalData"].notification_id);
              window.localStorage.setItem('syn_doc',jsonData["notification"]["payload"]["additionalData"].doctor_syndicate_number);
              window.localStorage.setItem('distanc_doc',jsonData["notification"]["payload"]["additionalData"].distanc);
                $state.go('payCreditVisit', { data : jsonData["notification"]["payload"]["additionalData"]})
            }
            else if ((jsonData["notification"]["payload"]["additionalData"].type) == "home_visit_accept" &&  (jsonData["notification"]["payload"]["additionalData"].payment) == "1"){
              //  alert("call cancelled");
              console.log("testsss",jsonData["notification"]["payload"]["additionalData"]);
              window.localStorage.setItem('doc_name',jsonData["notification"]["payload"]["additionalData"].doctor_name);
              window.localStorage.setItem('fees_doc',jsonData["notification"]["payload"]["additionalData"].fees);
              window.localStorage.setItem('id_doc',jsonData["notification"]["payload"]["additionalData"].doctor_id);
              window.localStorage.setItem('vis_id',jsonData["notification"]["payload"]["additionalData"].action_id);
              window.localStorage.setItem('notify_id',jsonData["notification"]["payload"]["additionalData"].notification_id);
              window.localStorage.setItem('syn_doc',jsonData["notification"]["payload"]["additionalData"].doctor_syndicate_number);
              window.localStorage.setItem('distanc_doc',jsonData["notification"]["payload"]["additionalData"].distanc);
                $state.go('menu.doctorMap', { data : jsonData["notification"]["payload"]["additionalData"]})
            }
            else if ((jsonData["notification"]["payload"]["additionalData"].type) == "home_visit_reject"){
                alert("visit cancelled");
            }
            else if ((jsonData["notification"]["payload"]["additionalData"].type) == "home_visit_end_doc"){
                alert("visit ended");
                $state.go("menu.map");
            }
            else{
                  console.log("false");

            }
        }
            var notificationReceivedCallback = function (jsonData) {
            console.log("closed notification",jsonData);
            };

        window.plugins.OneSignal.getIds(function(userDetails) {
            window.localStorage.setItem('device_id',userDetails.userId)
                console.log(userDetails.userId); // Player ID
                //console.log(userDetails.pushToken);
            })
            window.plugins.OneSignal.startInit("94256a4d-7b47-4825-8710-273145c311ac")
            .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
            .handleNotificationReceived(notificationReceivedCallback)
            .handleNotificationOpened(notificationOpenedCallback)
            .endInit();
                if (window.localStorage.getItem('patientAccountId')) {
                    // window.plugins.OneSignal.sendTag("patientAccountId", "ios"+window.localStorage.getItem("patientAccountId"));
                    //console.log("sent tag");
                    $state.go("menu.map");

                } else {
                    window.localStorage.clear();
                    // window.plugins.OneSignal.sendTag("patientAccountId", 0);
                    $state.go("login");
                }


                function onSuccess(position) {
                    $rootScope.pos = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                   // console.log("pos :",$rootScope.pos);
                }
                function onError(error) {
                    console.log("make Tahrir as static location");
                   // $rootScope.pos = {latitude: 30.0444237 , longitude: 31.2335299};
                    console.log('code: ' + error.code + '\n' +
                            'message: ' + error.message + '\n');
                }
                watchID = navigator.geolocation.watchPosition(onSuccess, onError, {timeout: 60000});
                //navigator.geolocation.getCurrentPosition(onSuccess, onError);
                //return $rootScope.position;

                // $rootScope.base_url = 'http://192.168.8.101/zad/kashfApp/admin/index.php/';
                // $rootScope.base_url = 'http://kashf.mychildguide.com/';
                // $rootScope.base_url = 'http://dev.kashfapp.zadsolutions.com/';
                   $rootScope.base_url = 'https://kashf247.com/';
                // $rootScope.base_url = 'http://kashf.mychildguide.com/';
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
            

        })

        .config(function ($ionicConfigProvider,$translateProvider) {
 $ionicConfigProvider.navBar.alignTitle('center');
            
            $translateProvider.translations('ar', {
         //intro translations
                 "Mobile Number": "الموبايل",
                 "Don'thave an account?" : "ليس لديك حساب؟ ",
                 "Sign Up" : "سجل ",
                 "Log in" : "دخول",
                 "Confirm your account":"اكد حسابك",
                 "Confirmation":"تأكيد",
                 "Forgot Your Password?":"نسيت كلمة المرور",
                 "Call the Doctor":"اتصل بالدكتور",
                 "Search Doctors":"ابحت عن الدكاتره",
                 "Home Visit":"زيارة منزلية",
                 "First Name":"الاسم الاول",
                 "Last Name":"الاسم الاخير",
                 "Mobile":"الموبيل",
                 "Password":"كلمة السر",
                 "Email":"البريد الالكترونى",
                 "I agree to":"أوافق ",
                 "Click Here To Call Support":"اضغط هنا للاتصال بالدعم",
                 "Terms And Conditions":"الاحكام والشروط",
                 "Send":"ارسال",
                 "Confirmation Code":"رمز التأكيد",
                 "Please enter the confirmation code":"من فضلك ادخل رمز التأكيد",
                 "FOR" :"من اجل",
                 "Call Request" : "طلب الاتصال",
                 "Doctor's Information":"معلومات الدكتور",
                 "Gender":"النوع",
                 "Any":"اى",
                 "Male":"ذكر",
                 "Female":"انثى",
                 "SPECIALTY GRADE":"درجة التخصص",
                 "Doctor's Speciality":"التخصص",
                 "SEARCH":"البحث",
                 "Visit Request":"طلب زيارة",
                 "Doctor Search":"البحث عن دكتور",
                 "Doctor Name":"اسم الدكتور",
                 "Hospital Name :" : "اسم المستشفي",
                 "Clinic Area :" : "منطقة العيادة",
                 "Spectiality Grade :":"درجة التخصص",
                 "Call Doctor":"اتصل بالدكتور",
                 "Submit" : "ارسال",
                 "Clinic" : "العيادة",
                 "Home fees" : "رسوم الزيارة",
                 "Call fees :" : "رسوم المكالمة",
                 "Clinic fees :" : "رسوم العيادة",
                 "Hospital name :" : "اسم العيادة",
                 "Grade :" : "الدرجة",
                 "Spec :" : "التخصص",
                 "Add Family Member" : "اضافة فرد جديد",
                 "Date of Birth" : "تاريخ الميلاد",
                 "Allergies" : "الحساسية",
                 "Diseases" : "الامراض",
                 "ADD" : "اضف",
                 "Payment" : "الدفع",
                 "Payment Options" : "انواع الدفع",
                 "Cash":"كاش",
                 "You will be asked to add your CVV (3 digits on the back of your credit card) to complete each of your future payments." : "سيُطلب منك إضافة CVV (3 أرقام على ظهر بطاقة الائتمان) لإكمال كل دفعة من دفعاتك المستقبلية.",
                 "Visa Electron cards are not accepted, only credit or debit cards are accepted.":"لا يتم قبول بطاقات فيزا إلكترون ، ولا يتم قبول سوى بطاقات الائتمان أو الخصم.",
                 "2 LE will be discounted to verify your credit card" :"سيتم خصم 2 جنيه مصري للتحقق من بطاقتك الائتمانية",
                 "Credit Card":"بطاقة الائتمان",
                 "Add Card" : "اضف بطاقة",
                 "Primary" : "اولى",
                 "Edit Card" : "تعديل البطاقة",
                 "Credit Card Number" : "رقم بطاقة الائتمان",
                 "Card Holder Name" : "إسم صاحب البطاقة",
                 "The 3 digit number on the back of your card." : "الرقم المكون من 3 أرقام على ظهر بطاقتك.",
                 "Expiry Year" : "عام الانتهاء",
                 "Expiry Month" : "شهر الانتهاء",
                 "Back" : "رجوع",
                 "Make Primary" : " اجعله الاولى",
                 "Delete Card" : "احذف البطاقة",
                 "Help" : "المساعده",
                 "If you have any questions or problems" : "إذا كان لديك أي أسئلة أو مشاكل",
                 "please reach us on any of the following:" : "يرجى الاتصال بنا على أي مما يلي:",
                 "Call center:":"مركز الاتصال:",
                 "website:" : "موقع الانترنت:",
                 "Facebook:" : "الفيسبوك:",
                 "settings" : "اعدادات",
                 "CHANGE PASSWORD":"غير كلمة السر",
                 "ADD FAMILY MEMBER":"اضافة عضو عائلى جديد",
                 "SIGNOUT":"خروج",
                 "FAMILY MEMBER DATA" : "بيانات افراد العائلة",
                 "Change Password" : "تغير كلمة السر",
                 "OLD PASSWORD" : "كلمة السر القديمة",
                 "NEW PASSWORD":"كلمة السر الجديدة",
                 "Doctors list":"قائمة الدكاترة",
                 "Fees:" :"الرسوم:",
                 
                 
                 
                 
                 
            //$ionicConfigProvider.views.maxCache(5);
            //$ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
                
            });
        $translateProvider.preferredLanguage("en");
        $translateProvider.fallbackLanguage("en");
            //$ionicConfigProvider.views.maxCache(5);
            //$ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
        })
