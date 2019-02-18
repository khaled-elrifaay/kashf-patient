angular.module('app.services')
        .service('treatService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetTreatLocalDB = function () {
                    var data = window.localStorage.getItem('treat');
                    return (data != null && data != 'undefined')? JSON.parse(data):null;
                };

                this.DeleteTreatLocalDB = function () {
                    window.localStorage.removeItem('treatVer');
                    window.localStorage.removeItem('treat');
                };

                this.UpdateTreatLocalDB = function (treat) {
                    window.localStorage.setItem('treatVer', treat.treatVer);
                    window.localStorage.setItem('treat', JSON.stringify(treat.treat));
                };

                this.GetTreatFromServer = function () {
                    if (configService.getTreatLock() != false) {
                        configService.setTreatLock(false);
                        WebService.wepServiceConnector("", "getTreatments", false).then(function (result) {
                            mainScope.UpdateTreatLocalDB(result);
                        });
                    }
                };
            }]);