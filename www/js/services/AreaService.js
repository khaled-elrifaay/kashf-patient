angular.module('app.services')
        .service('areaService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetAreaLocalDB = function () {
                    var data = window.localStorage.getItem('area');
                    return (data != null && data != 'undefined') ? JSON.parse(data) : null;
                };

                this.DeleteAreaLocalDB = function () {
                    window.localStorage.removeItem('areaVer');
                    window.localStorage.removeItem('area');
                };

                this.UpdateAreaLocalDB = function (area) {
                    window.localStorage.setItem('areaVer', area.areaVer);
                    window.localStorage.setItem('area', JSON.stringify(area.area));
                };

                this.GetAreaFromServer = function () {
                    if (configService.getAreaLock() != false) {
                        configService.setAreaLock(false);
                        WebService.wepServiceConnector("", "getAllArea", false).then(function (result) {
                            mainScope.UpdateAreaLocalDB(result);
                        });
                    }
                };
            }]);