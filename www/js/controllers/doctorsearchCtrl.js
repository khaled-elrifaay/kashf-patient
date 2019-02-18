angular.module('app.controllers').
controller('doctorsearchCtrl', function ($scope, WebService,configService,hospitalService,cardService, $state, $stateParams, $interval, gradeService,clinicService ,specService, $ionicLoading , profileService) {
    /**
     *
     */
    if (window.localStorage.getItem('userLang') == 'ar'){
                    $scope.ar_user_lang=true;
                   $scope.en_user_lang=false;
                }else{
                     $scope.ar_user_lang=false;
                   $scope.en_user_lang=true;
                }
     configService.setEmptyReqLock(true);
     $scope.showMe = false;
     $scope.showMe2 = false;
    $scope.speId = $stateParams.speId;
    $scope.URL=$scope.base_url + "uploads/doctors/photos/";
    console.log("scopeURL",$scope.URL);
    $scope.$on('$ionicView.enter', function (event, data) {
                var pList = profileService.GetProfileLocalDB();
                $scope.patientsList = pList;
                $scope.selectedPatient = pList[0].main.id;
        $scope.specialization = specService.GetSpecLocalDB();
                var response = gradeService.GetGradeLocalDB();
                $scope.grade = response;
                var responseClinic = clinicService.GetClinicLocalDB();
                $scope.clinic = responseClinic;
                var responseHospital = hospitalService.GetHospitalLocalDB();
                $scope.Hospital = responseHospital;                
                console.log("resf",responseHospital);
    });
    /**
     *
     */
     $scope.goBackview = function () {
                $state.go('menu.map');
            };
/*     $scope.gradeval = null;
            var gradeFn = function () {
                $scope.gradeval = document.getElementById("grade").value;
                console.log("$scope.gradeval :" ,$scope.gradeval);
            };*/
          /*  var pidFn = function () {
                $scope.pid = document.getElementById("pid").value;
                console.log("pid",$scope.pid);
            };*/
            $scope.pid = null;
            var patientID;
            var pidFn = function () {
                $scope.pid = document.getElementById("pid").value;
                console.log("patid",$scope.pid);
                $scope.patientsID= mySelect;
              console.log("patientID",$scope.patientsID);
            };
            
/*            $scope.pidFn = function(mySelect) {
              console.log("sssss",mySelect);
                 $scope.pid = document.getElementById("pid").value;
                 console.log("patid",$scope.pid);
               $scope.patientsID= mySelect;
              console.log("patientID",$scope.patientsID);
                }*/
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
    $scope.search = function (params) {
           console.log("params" , params);
                 //   $state.go("doctorList", {speId: $scope.spec, patientId: $scope.pid, gender: $scope.gender, grade: $scope.gradeval, major: $scope.spec_name_major, minor: $scope.spec_name_minor, });
           if ( params == undefined){
                 console.log("name undefined");
            var data = $.param({
            name: "",
            hospital_id:"",
            clinic_area:"",
            specialty: $scope.spec,
            grade: ""
        });
            $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
            duration: 60000
        });
        WebService.wepServiceConnector(data, 'searchDoctors', false).then(function (result) {
            $scope.doctor_list = result.result;
            for (var i = 0; i < $scope.doctor_list.length; i++) {  
             console.log("status :",$scope.doctor_list[i].status);
             if ($scope.doctor_list[i].status == 1) {console.log("there is doctors online"); $scope.showMe = true;$scope.showMe2 = false;}
            }
             
            console.log(result);
            $ionicLoading.hide();
        });
           }else{
            var data = $.param({
            name: params.name,
            hospital_id: params.hospital,
            clinic_area:params.clinic,
            specialty: $scope.spec ,
            grade: params.grade
        });
          console.log("name not undefined");
            $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
            duration: 60000
        });
        WebService.wepServiceConnector(data, 'searchDoctors', false).then(function (result) {
            $scope.doctor_list = result.result;
             for (var i = 0; i < $scope.doctor_list.length; i++) {  
             console.log("status :",$scope.doctor_list[i].status);
             console.log("status :",$scope.doctor_list[i].status == 1);
             if ($scope.doctor_list[i].status == 1) {console.log("there is doctors online"); $scope.showMe = true;$scope.showMe2 = false;}
             else{
                    $scope.showMe = false;
                    $scope.showMe2 = true;
             }
            }
            console.log("xcv",result.result);
            if(result.result == '' || result.result == [] || result.length == 0){
                    console.log("make alert");
                    alert('No registered doctors meet these criteria');  
            }
            $ionicLoading.hide();
        });
}
           }
      $scope.confirmHome = function (first_name, last_name, id ,fees, grade, specialization, rate, image , status ) {
                clearInterval($scope.intervalclear);
                var first_name_v = (first_name != null && first_name != 'undefined') ? first_name : "";
                var last_name_v = (last_name != null && last_name != 'undefined') ? last_name : "";
                var id_v = (id != null && id != 'undefined') ? id : "";
                var fees_v = (fees != null && fees != 'undefined') ? fees : "";
                var grade_v = (grade != null && grade != 'undefined') ? grade : "";
                var specialization_v = (specialization != null && specialization != 'undefined') ? specialization : "";
                var rate_v = (rate != null && rate != 'undefined') ? rate : "";
                var image_v = (image != null && image != 'undefined') ? image : "";
                var status_v = status;
                console.log("status_v ",status_v);
                
                    if (status_v == 1 ) {
                        $scope.pid = document.getElementById("pid").value;
                       console.log("patientID 22",$scope.pid);
                               console.log("doctor is online");
                       $state.go('requestDoctorConfirmation', {first_name: first_name_v, patientId: $scope.pid, last_name: last_name_v, id: id_v,fees: fees_v, grade: grade_v, specialization: specialization_v, rate: rate_v, image: image_v})
                       configService.setEmptyReqLock(false);
                       }else{
                               console.log("doctor not online");
                               alert('The Doctor is not available now');
                       }
                
            };
      $scope.confirmCall = function (first_name, last_name,call_fees, id, fees, grade, specialization, rate, image , call_status) {
                clearInterval($scope.intervalclear);
                var first_name_v = (first_name != null && first_name != 'undefined') ? first_name : "";
                var last_name_v = (last_name != null && last_name != 'undefined') ? last_name : "";
                var id_v = (id != null && id != 'undefined') ? id : "";
                var fees_v = (call_fees != null && call_fees != 'undefined') ? call_fees : "";
                var grade_v = (grade != null && grade != 'undefined') ? grade : "";
                var specialization_v = (specialization != null && specialization != 'undefined') ? specialization : "";
                var rate_v = (rate != null && rate != 'undefined') ? rate : "";
                var image_v = (image != null && image != 'undefined') ? image : "";
                var status_c = call_status;
                console.log("status_cc ",status_c);
                configService.setCardLock(true);
                cardService.GetCardFromServer();
                configService.setCardLock(false);
                $scope.CardsDataBig = cardService.GetCardLocalDB();
                if ($scope.CardsDataBig.length == 0){
                    alert("You have to register at least a single credit card to use the service.Please press menu, then choose payments");
                }else{
                if (status_c == 2) {
                    $scope.pid = document.getElementById("pid").value;
                console.log("patientID 22",$scope.pid);
                        console.log("doctor is online");
                $state.go('requestCallConfirmation', {first_name: first_name_v, patientId: $scope.pid, last_name: last_name_v, id: id_v ,fees: fees_v, grade: grade_v, specialization: specialization_v, rate: rate_v, image: image_v})
                configService.setEmptyReqLock(false);
                }else{
                        console.log("doctor not online");
                        alert('The Doctor is not available now');
                }
            }
            };
            $scope.$on("$ionicView.leave", function (event, data) {
                configService.setEmptyReqLock(false);
                clearInterval($scope.intervalclear);
            });
});