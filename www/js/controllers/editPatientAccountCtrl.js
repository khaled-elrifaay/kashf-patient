angular.module('app.controllers')
        .controller('editPatientAccountCtrl', function ($scope, profileService, diseasesService, allergiesService, WebService, $state, $stateParams, $ionicPlatform) {
            $scope.goBackview = function () {

                $state.go('menu.map');
                $("#side-menu21").toggle();
                $('.ion-navicon').click(function () {
                });
            };
            $scope.allergies = allergiesService.GetAllergiesLocalDB();
            $scope.diseases = diseasesService.GetDiseasesLocalDB();
            $scope.patientsList = profileService.GetProfileLocalDB();
            $scope.patientData = null;
            $scope.flag = false;
            for (var i = 0; i < $scope.patientsList.length; i++) {
                if ($scope.patientsList[i].data.id == $stateParams.id)
                {
                    $scope.patientData = $scope.patientsList[i].data;
                    i = $scope.patientsList.length;
                    $scope.flag = true;
                }
            }




            $scope.birth_date = $scope.patientData.birthDay;



            $scope.edit = function (patientData, outputAllergiesList, outputDiseasesList) {
                $scope.buttonStatus = true;
                var patient_birth_date = $('#patient_birth_date').val();
                var data = $.param({
                    'User[first_name]': patientData.firstName,
                    'User[last_name]': patientData.lastName,
                    'User[email]': patientData.email,
                    'Patient[gender]': patientData.gender,
                    'User[language]': patientData.languge,
                    'Patient[date_of_birth]': patient_birth_date,
                    id: $scope.patientData.id,
                    allergies: outputAllergiesList,
                    diseases: outputDiseasesList,
                });
                profileService.DeleteProfileVerLocalDB();
                WebService.wepServiceConnector(data, "getPatientData", false).then(function (result) {
                    var response = result.result;
                    if (response.status == '1') {
                        setTimeout(function(){ alert("Edited Successfully");
                        
                        $state.go('settings'); }, 3000);
                    } else {
                        alert(response.errors.user.email[0]);
                        $scope.buttonStatus = false;
                    }
                });
            }
        });
