/*angular.module('app.services')
    .service('specService', ['WebService', 'configService', function (WebService, configService) {
        var mainScope = this;
        this.GetSpecLocalDB = function () {
            var data = window.localStorage.getItem('spec');
            return (data != null && data != 'undefined')? JSON.parse(data):null;
        };

        this.DeleteSpecLocalDB = function () {
            window.localStorage.removeItem('specVer');
            window.localStorage.removeItem('spec');
        };

        this.UpdateSpecLocalDB = function (spec) {
            window.localStorage.setItem('specVer', spec.specVer);
            window.localStorage.setItem('spec', JSON.stringify(spec.spec));
        };

        this.GetSpecFromServer = function (callback) {
            if (configService.getSpecLock() != false) {
                configService.setSpecLock(false);
                WebService.wepServiceConnector("", "getDocSpecialization", false)
                  .then(function (result) {
                    // console.log(result,callback);
                    mainScope.UpdateSpecLocalDB(result);
                    callback && callback();
                });
            }
        };
    }]);*/
    angular.module('app.services')
        .service('specService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetSpecLocalDB = function () {
                    var data = window.localStorage.getItem('spec');
                    return (data != null)? JSON.parse(data):null;
                };

                this.DeleteSpecLocalDB = function () {
                    window.localStorage.removeItem('specVer');
                    window.localStorage.removeItem('spec');
                };

                this.UpdateSpecLocalDB = function (spec) {
                    window.localStorage.setItem('specVer', spec.specVer);
                    window.localStorage.setItem('spec', JSON.stringify(spec.spec));
                };

                this.GetSpecFromServer = function () {
                    if (configService.getSpecLock() != false) {
                        configService.setSpecLock(false);
                        WebService.wepServiceConnector("", "getSpecialization", false).then(function (result) {
                            mainScope.UpdateSpecLocalDB(result);
                        });
                    }
                };
            }]);