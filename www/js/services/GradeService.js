angular.module('app.services')
        .service('gradeService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetGradeLocalDB = function () {
                    var data = window.localStorage.getItem('grade');
                    return (data != null && data != 'undefined') ? JSON.parse(data) : null;
                };

                this.DeleteGradeLocalDB = function () {
                    window.localStorage.removeItem('gradeVer');
                    window.localStorage.removeItem('grade');
                };

                this.UpdateGradeLocalDB = function (grade) {
                    window.localStorage.setItem('gradeVer', grade.gradeVer);
                    window.localStorage.setItem('grade', JSON.stringify(grade.grade));
                };

                this.GetGradeFromServer = function () {
                    if (configService.getGradeLock() != false) {
                        configService.setGradeLock(false);
                        WebService.wepServiceConnector("", "getDocGrades", false).then(function (result) {
                            mainScope.UpdateGradeLocalDB(result);
                        });
                    }
                };
            }]);