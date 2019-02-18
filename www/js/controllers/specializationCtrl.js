angular.module('app.controllers')
        .controller('specializationCtrl', function ($scope, specService, WebService, $ionicPlatform, $state, profileService, gradeService) {
           
            $scope.$on("$ionicView.enter", function (event, data) {
                var pList = profileService.GetProfileLocalDB();
                $scope.patientsList = pList;
                $scope.selectedPatient = pList[0].main.id;
                var response = gradeService.GetGradeLocalDB();
                $scope.grade = response;

                $scope.specialization = specService.GetSpecLocalDB();
            });

            $scope.goBackview = function () {
                $state.go('menu.map');
            };

            $scope.gradeval = null;
            var gradeFn = function () {
                $scope.gradeval = document.getElementById("grade").value;
            };
            $scope.gender = null;
            var genderFn = function () {
                $scope.gender = document.getElementById("gender").value;
            };
            $scope.pid = null;
            var pidFn = function () {
                $scope.pid = document.getElementById("pid").value;
            };
            $scope.spec = null;
            $scope.spec_name_major = null;
            $scope.spec_name_minor = null;
            $scope.specFn = function (spec, major, minor) {
                if (spec == $scope.spec)
                {
                    $scope.spec = null;
                    $scope.spec_name_major = null;
                    $scope.spec_name_minor = null;
                } else
                {
                    $scope.spec = spec;
                    $scope.spec_name_major = major;
                    $scope.spec_name_minor = minor;
                }

            };
            $scope.toggleGroup = function (group) {
                group.show = !group.show;
            };
            $scope.isGroupShown = function (group) {
                return group.show;
            };

            $scope.search = function () {
                $scope.gender = document.getElementById("gender").value;
                $scope.pid = document.getElementById("pid").value;
                $scope.gradeval = document.getElementById("grade").value;
                if ($scope.spec != null && $scope.pid != null && $scope.gender != null && $scope.grade != null) {
                    $state.go("doctorList", {speId: $scope.spec, patientId: $scope.pid, gender: $scope.gender, grade: $scope.gradeval, major: $scope.spec_name_major, minor: $scope.spec_name_minor, });
                } else {
                    alert("Please select Specilication");
                }
            };

            $scope.minorSpe = function (spe_id) {
                var data = $.param({
                    id: spe_id,
                });
                WebService.wepServiceConnector(data, "getMinorSpecialization", false).then(function (result) {
                    var minor_specialization = result.result;
                    if (minor_specialization.length == 0) {
                        console.log($scope.selectedPatient);
                        $state.go("doctorList", {speId: spe_id, patientId: $scope.selectedPatient});
                    } else {
                        $state.go("minorSpecialization", {myParam: minor_specialization, patientId: $scope.selectedPatient});
                    }
                });
            };
        });