angular.module('app.controllers')
        .controller('settingsCtrl', function ($scope, profileService, $state, $ionicPlatform,$translate) {
            $scope.signOut = function () {
                window.localStorage.removeItem('patientAccountId');
                window.localStorage.clear();
                $state.go('login');
            };
             $scope.En = function () {
                $translate.use('en');
                console.log("set lang as english");
                $state.go('menu.map');
            }; $scope.Ar = function () {
                $translate.use('ar');
                console.log("set lang as arabic");
                $state.go('menu.map');
            };
            $scope.goBackview = function () {
                $state.go('menu.map');
            };
            $scope.addFamilyMember = function () {
                $state.go('AddFamilyMember');
            };
            $scope.patientsList = profileService.GetProfileLocalDB();
            $scope.mainName = $scope.patientsList[0].main.name;

            $scope.editPatient = function (index) {
                var data = $scope.patientsList[index].data;
                $state.go('editFamilyMember', {patient_details: JSON.stringify(data)});
            };

            $scope.editeAccount = function () {
                $state.go('editPatientAccount');
            };

            $scope.changePassword = function () {
                $state.go('changePassword');
            };
        });