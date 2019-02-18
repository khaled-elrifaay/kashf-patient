angular.module('app.services')
        .service('investService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetInvLocalDB = function () {
                    var data = window.localStorage.getItem('invest');
                    return (data != null && data != 'undefined') ? JSON.parse(data) : null;
                };

                this.DeleteInvLocalDB = function () {
                    window.localStorage.removeItem('investVer');
                    window.localStorage.removeItem('invest');
                };

                this.UpdateInvLocalDB = function (invest) {
                    window.localStorage.setItem('investVer', invest.investVer);
                    window.localStorage.setItem('invest', JSON.stringify(invest.invest));
                };

                this.GetInvFromServer = function () {
                    if (configService.getInvLock() != false) {
                        configService.setInvLock(false);
                        WebService.wepServiceConnector("", "getInvestigations", false).then(function (result) {
                            mainScope.UpdateInvLocalDB(result);
                        });
                    }
                };
            }]);