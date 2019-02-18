angular.module('app.services')
        .service('WebService', ['$http', 'Md5Service', 'ApiService', 'configService', '$q', '$injector', '$cordovaDevice', function ($http, Md5Service, ApiService, configService, $q, $injector, $cordovaDevice) {
                this.first = true;
                var mainScope = this;
                this.GetMD5Service = function (string) {
                    return Md5Service.GenerateMD5(string);
                };



                this.GetApiService = function (api) {
                    return ApiService.getApiUrl(api);
                };

                this.ReturnDataVer = function () {
                    var allergiesVer = window.localStorage.getItem('allergiesVer');
                    var areaVer = window.localStorage.getItem('areaVer');
                    var diseasesVer = window.localStorage.getItem('diseasesVer');
                    var investVer = window.localStorage.getItem('investVer');
                    var specVer = window.localStorage.getItem('specVer');
                    var treatVer = window.localStorage.getItem('treatVer');
                    var notifyVer = window.localStorage.getItem('notificationVer');
                    var visitVer = window.localStorage.getItem('visitVer');
                    var profileVer = window.localStorage.getItem('profileVer');
                    var gradeVer = window.localStorage.getItem('gradeVer');
                    var clinicVer = window.localStorage.getItem('clinicVer');
                    var hospitalVer = window.localStorage.getItem('hospitalVer');
                    var callVer = window.localStorage.getItem('callVer');
                    var cardVer = window.localStorage.getItem('cardVer');
                    return $.param({
                        appData: {
                            allergies: (allergiesVer == null) ? -1 : allergiesVer,
                            area: (areaVer == null) ? -1 : areaVer,
                            diseases: (diseasesVer == null) ? -1 : diseasesVer,
                            invest: (investVer == null) ? -1 : investVer,
                            spec: (specVer == null) ? -1 : specVer,
                            treat: (treatVer == null) ? -1 : treatVer,
                            notify: (notifyVer == null) ? -1 : notifyVer,
                            visit: (visitVer == null) ? -1 : visitVer,
                            profile: (profileVer == null) ? -1 : profileVer,
                            grade: (gradeVer == null) ? -1 : gradeVer,
                            clinic: (clinicVer == null) ? -1 : clinicVer,
                            hospital: (hospitalVer == null) ? -1 : hospitalVer,
                            call: (callVer == null) ? -1 : callVer,
                            card: (cardVer == null) ? -1 : cardVer,
                        }
                    });



                }

                this.UpdateInvoker = function (data) {
                    if (data.allergies)
                    {
                        configService.setAllergiesLock(true);
                        var injector = $injector.get('allergiesService');
                        injector.GetAllergiesFromServer();
                        configService.setAllergiesLock(false);
                    }
                    if (data.area)
                    {
                        configService.setAreaLock(true);
                        var injector = $injector.get('areaService');
                        injector.GetAreaFromServer();
                        configService.setAreaLock(false);
                    }
                    if (data.diseases)
                    {
                        configService.setDiseasesLock(true);
                        var injector = $injector.get('diseasesService');
                        injector.GetDiseasesFromServer();
                        configService.setDiseasesLock(false);
                    }
                    if (data.invest)
                    {
                        configService.setInvLock(true);
                        var injector = $injector.get('investService');
                        injector.GetInvFromServer();
                        configService.setInvLock(false);
                    }

                    if (data.spec)
                    {
                        configService.setSpecLock(true);
                        var injector = $injector.get('specService');
                        injector.GetSpecFromServer();
                        configService.setSpecLock(false);
                    }
                    if (data.treat)
                    {
                        configService.setTreatLock(true);
                        var injector = $injector.get('treatService');
                        injector.GetTreatFromServer();
                        configService.setTreatLock(false);
                    }
                    // if (data.notify)
                    // {
                    //     configService.setNotifyLock(true);
                    //     var injector = $injector.get('notificationService');
                    //     injector.GetNotifyFromServer();
                    //     configService.setNotifyLock(false);
                    // }
                    if (data.visit)
                    {
                        configService.setVisitLock(true);
                        var injector = $injector.get('visitService');
                        injector.GetVisitFromServer();
                        configService.setVisitLock(false);
                    }

                    if (data.grade)
                    {
                        configService.setGradeLock(true);
                        var injector = $injector.get('gradeService');
                        injector.GetGradeFromServer();
                        configService.setGradeLock(false);
                    }
                    if (data.clinic)
                    {
                        configService.setClinicLock(true);
                        var injector = $injector.get('clinicService');
                        injector.GetClinicFromServer();
                        configService.setClinicLock(false);
                    }
                    if (data.hospital)
                    {
                        configService.setHospitalLock(true);
                        var injector = $injector.get('hospitalService');
                        injector.GetHospitalFromServer();
                        configService.setHospitalLock(false);
                    }
                    if (data.profile)
                    {
                        configService.setProfileLock(true);
                        var injector = $injector.get('profileService');
                        injector.GetProfileFromServer();
                        configService.setProfileLock(false);
                    }

                    if (data.call)
                    {
                        configService.setCallLock(true);
                        var injector = $injector.get('callService');
                        injector.GetCallFromServer();
                        configService.setCallLock(false);
                    }
                    
                    if (data.card)
                    {
                        configService.setCardLock(true);
                        var injector = $injector.get('cardService');
                        injector.GetCardFromServer();
                        configService.setCardLock(false);
                    }
                };



                mainScope.wepServiceConnector = function (ctrlObj, destinationName, ctrlType) {
            
                    var uuid = $cordovaDevice.getUUID();
                    if (mainScope.first) {
                        mainScope.first = false;
                        mainScope.recurisiveFunc();
                    }
                    var now = new Date;
                    var utc_timestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
                    var unixTime = Math.round(+utc_timestamp / 1000); //Math.round(+new Date() / 1000);
                    var destinationUrl = ApiService.getApiUrl(destinationName);

                    var appPass = configService.getAppPassword();
                    var appType = configService.getAppType();
                    var ran = Math.floor((Math.random() * 100000) + 1);


                    var patId = "-1";
                    var sessionToken = "-20020";
                    if (!ctrlType && ctrlType != "2020") {
                        patId = window.localStorage.getItem('patientAccountId');
                        sessionToken = window.localStorage.getItem('token');
                    }
                    var beforeMd5 = unixTime + patId + sessionToken + appPass+ran;
                    var md5 = Md5Service.GenerateMD5(beforeMd5);

                    var data = mainScope.ReturnDataVer() + "&" + ctrlObj + "&" + $.param({
                        appData: {
                            appType: appType,
                            unixTime: unixTime,
                            patId: patId,
                            md5: md5,
                            uuid: uuid,
                            ran: ran,
                            device_id: window.localStorage.getItem('device_id')
                        }
                    });
                    if(ctrlType == "2020"){
                        data =  ctrlObj;
                    }

                    var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
                    return  $http.post(destinationUrl, data, config).then(function (data, status) {
                        /*
                         * in case there new data update it before return back to the ctrl
                         * 
                         */
                        if (data.data.updates != null) {
                            setTimeout(function () {
                                mainScope.UpdateInvoker(data.data.updates);
                            }, 3000);

                        }

                        return $q.when(data.data.data);
                    });
                    alert("something went wrong");
                    return "something went wrong";

                };
                this.recurisiveFunc = function () {
                    var timer = configService.getGlopalTimer();
                    var Interval = setInterval(function () {
                        clearInterval(Interval);
                        var locDataFlag = configService.getEmptyReqLock();
                        if (!locDataFlag) {
                            if (window.localStorage.getItem('patientAccountId') && window.localStorage.getItem('token')) {
                                mainScope.wepServiceConnector("", "postPatemptyRequest", false).then(function (result) {
                                    configService.setEmptyReqLock(true);
                                });
                            }
                        }
                        mainScope.recurisiveFunc();
                    }, timer * 1);


                };

            }]);