    angular.module('app.services')
        .service('hospitalService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetHospitalLocalDB = function () {
                    var data = window.localStorage.getItem('hospitals');
                    return (data != null)? JSON.parse(data):null;
                };

                this.DeleteHospitalLocalDB = function () {
                    window.localStorage.removeItem('hospitalsVer');
                    window.localStorage.removeItem('hospitals');
                };

                this.UpdateHospitalLocalDB = function (hospitals) {
                    window.localStorage.setItem('hospitalsVer', hospitals.hospitalsVer);
                    window.localStorage.setItem('hospitals', JSON.stringify(hospitals.hospitals));
                };

                this.GetHospitalFromServer = function () {
                    if (configService.getHospitalLock() != false) {
                        configService.setHospitalLock(false);
                        WebService.wepServiceConnector("", "getHospitalsList", false).then(function (result) {
                            console.log("myRes",result);
                            mainScope.UpdateHospitalLocalDB(result);
                        });
                    }
                };
            }]);