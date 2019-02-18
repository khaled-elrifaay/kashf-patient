angular.module('app.services')
        .service('allergiesService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetAllergiesLocalDB = function () {
                    var data = window.localStorage.getItem('allergies');
                    return (data != null && data != 'undefined') ? JSON.parse(data) : null;
                };

                this.DeleteAllergiesLocalDB = function () {
                    window.localStorage.removeItem('allergiesVer');
                    window.localStorage.removeItem('allergies');
                };

                this.UpdateAllergiesLocalDB = function (allergies) {
                    window.localStorage.setItem('allergiesVer', allergies.allergiesVer);
                    window.localStorage.setItem('allergies', JSON.stringify(allergies.allergies));
                };

                this.GetAllergiesFromServer = function () {
                    if (configService.getAllergiesLock() != false) {
                        configService.setAllergiesLock(false);
                        WebService.wepServiceConnector("", "getAllAllergies", false).then(function (result) {
                            mainScope.UpdateAllergiesLocalDB(result);
                        });
                    }
                };
            }]);