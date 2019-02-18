angular.module('app.controllers')
        .controller('AddFamilyMemberCtrl', function ($scope, $state, $ionicPlatform,$ionicHistory, WebService, allergiesService, diseasesService,profileService) {
            $scope.$on("$ionicView.enter", function (event, data) {
                $scope.goBackview = function () {
               navigator.app.backHistory();
                    // $ionicHistory.backView().go();
             };
            });
         $scope.buttonStatus = false;   
            var patientData = {'dateOfBirth': new Date()};
            $scope.allergies = allergiesService.GetAllergiesLocalDB();
            $scope.diseases = diseasesService.GetDiseasesLocalDB();
            $scope.addMember = function (patientData, outputAllergiesList, outputDiseasesList) {
              $scope.buttonStatus = true; 
                var data = $.param({
                    'Patient[first_name]': patientData.firstName,
                    'Patient[last_name]': patientData.lastName,
                    'Patient[gender]': patientData.gender,
                    'Patient[date_of_birth]': patientData.dateOfBirth,
                    'Patient[patient_account_id]': window.localStorage.getItem('patientAccountId'),
                    allergies: outputAllergiesList,
                    diseases: outputDiseasesList,
                });
                profileService.DeleteProfileVerLocalDB();
                WebService.wepServiceConnector(data, "postPatientsCreate", false).then(function (result) {
                    var response = result.result;
                    if (response.status == '1') {
                        setTimeout(function(){ alert("Added successfully");
                        
                        $state.go('settings'); }, 5000);
                        
                    }
                    else{
                           alert("Wrong Data");
                         $scope.buttonStatus = false; 
                    }

                });
            }
        });