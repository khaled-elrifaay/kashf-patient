    angular.module('app.services')
        .service('allSpecService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetAllSpecLocalDB = function () {
                    var data = window.localStorage.getItem('allspec');
                    return (data != null)? JSON.parse(data):null;
                };

                this.DeleteAllSpecLocalDB = function () {
                    window.localStorage.removeItem('allspecVer');
                    window.localStorage.removeItem('allspec');
                };

                this.UpdateAllSpecLocalDB = function (spec) {
                    window.localStorage.setItem('allspecVer', spec.allspecVer);
                    window.localStorage.setItem('allspec', JSON.stringify(spec.allspec));
                };

                this.GetallSpecFromServer = function () {
                    if (configService.getSpecLock() != false) {
                        configService.setSpecLock(false);
                        WebService.wepServiceConnector("", "getDocSpecialization", false).then(function (result) {
                            mainScope.UpdateAllSpecLocalDB(result);
                        });
                    }
                };
            }]);