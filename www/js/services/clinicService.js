    angular.module('app.services')
        .service('clinicService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetClinicLocalDB = function () {
                    var data = window.localStorage.getItem('clinicArea');
                    return (data != null)? JSON.parse(data):null;
                };

                this.DeleteClinicLocalDB = function () {
                    window.localStorage.removeItem('clinicAreaVer');
                    window.localStorage.removeItem('clinicArea');
                };

                this.UpdateClinicLocalDB = function (clinicArea) {
                    window.localStorage.setItem('clinicAreaVer', clinicArea.clinicAreaVer);
                    window.localStorage.setItem('clinicArea', JSON.stringify(clinicArea.clinicArea));
                };

                this.GetClinicFromServer = function () {
                    if (configService.getClinicLock() != false) {
                        configService.setClinicLock(false);
                        WebService.wepServiceConnector("", "getDocClinic", false).then(function (result) {
                            console.log("myRes",result);
                            mainScope.UpdateClinicLocalDB(result);
                        });
                    }
                };
            }]);