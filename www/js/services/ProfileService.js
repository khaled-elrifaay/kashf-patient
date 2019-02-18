angular.module('app.services')
        .service('profileService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.patientAccountId = window.localStorage.getItem('patientAccountId');

                this.GetProfileLocalDB = function () {
                    var data = window.localStorage.getItem('profile');
                    return (data != null && data != 'undefined') ? JSON.parse(data) : null;
                };

                this.GetPatients = function () {
                    var data = $.param({
                        patientAccountId: this.patientAccountId
                    });
                    WebService.wepServiceConnector(data, "postPatientsList", false).then(function (result) {
                        var response = result.result;
                        return response.data;
                    });
                };
                this.GetPatientData = function (id) {
                    var data = $.param({
                        id: id
                    });
                    WebService.wepServiceConnector(data, "postPatientData", false).then(function (result) {
                        var response = result.result;
                        return response.data;
                    });
                };


                this.DeleteProfileLocalDB = function () {
                    window.localStorage.removeItem('profileVer');
                    window.localStorage.removeItem('profile');
                };
                this.GetDocSpecsProfileLocalDB = function () {
                    var data = window.localStorage.getItem('docspecs');
                    return (data != null) ? JSON.parse(data) : null;
                    console.log("docuser from localStorage" , data);

                };


                this.DeleteProfileVerLocalDB = function () {
                    window.localStorage.removeItem('profileVer');
                };
                this.UpdateProfileLocalDB = function (profile) {
                    if (profile.profileVer != null) {
                        window.localStorage.setItem('profileVer', profile.profileVer);
                    }
                    if (profile.profile != null) {
                        window.localStorage.setItem('profile', JSON.stringify(profile.profile));
                    }
                 window.localStorage.setItem('docspecs', JSON.stringify(profile.profile.docspecs));

                };

                this.GetProfileFromServer = function () {
                    if (configService.getProfileLock() != false) {
                        configService.setProfileLock(false);
                        var data = $.param({
                            'patientAccountId': window.localStorage.getItem('patientAccountId'),
                        });
                        WebService.wepServiceConnector(data, "postPatientsList", false).then(function (result) {
                            console.log("mypostPatientsList",result);
                            mainScope.UpdateProfileLocalDB(result);
                        });
                    }
                };
            }]);