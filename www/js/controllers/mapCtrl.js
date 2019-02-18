angular.module('app.controllers').controller('mapCtrl', function ($scope,$cordovaGeolocation, $ionicPlatform, $ionicLoading,hospitalService,profileService, MapService, $state, backButton,clinicService, configService, WebService, cardService, specService, $rootScope, $stateParams) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        if (window.localStorage.getItem('patientAccountId')) {} else {
            $state.go("login");
        }
    });
    $ionicPlatform.ready(function () {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
         //check if the patient has requested a visit already and show them the map
        WebService.wepServiceConnector([], "activeVisitRequest", false).then(function (response) {
            if (typeof response.visit[0] != 'undefined') {
                visit = response.visit[0];
                // console.log('visit', visit);
                $stateParams.doctor_id = visit.doctor_id;
                $state.go("menu.doctorMap", {
                    doctor_id: visit.doctor_id,
                    visit_id: visit.visit_id
                });
                $rootScope.disableCancelBtn = true;
            }
        });
        $scope.div = document.getElementById("map_canvas");
        $scope.$on("$ionicView.enter", function (event, data) {
            configService.setEmptyReqLock(true);
            $scope.map = MapService.DrawMap($scope.div);
            backButton.GetSpecLocalDB(150, false, false, true);
            // console.log('ready enter');
        });
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
            duration: 6000
        });
        // Disable buttons until updating from server
        // var requestCallBtn = $('#button1')[0];
        // requestCallBtn.disabled = true;
        // var requestVisitBtn = $('#button2')[0];
        // requestVisitBtn.disabled = true;
        configService.setSpecLock(true);
        configService.setClinicLock(true);
        configService.setHospitalLock(true);
        clinicService.GetClinicFromServer(function callBack(){
                console.log("clinic area");
                $ionicLoading.hide();
        });
        hospitalService.GetHospitalFromServer(function callBack(){
                console.log("hospitals");
                $ionicLoading.hide();
        });
        specService.GetSpecFromServer(function callback() {
            // requestCallBtn.disabled = false;
            // requestVisitBtn.disabled = false;
            $ionicLoading.hide();
        });
        profileService.GetProfileFromServer(function callback(){
                console.log("members");
                $ionicLoading.hide();
        });
    });
    $scope.$on('$stateChangeStart', function (e) {
        configService.setEmptyReqLock(false);
        backButton.GetSpecLocalDB(1000, false, false, false);
        //$scope.div = null;
        MapService.UnDrawMap($scope.div);
    });
    $scope.checkCard = function () {
        // update card data from server
        // get card data to check if the patient add credit card or not
        var data = $.param({
            'patientAccountId': window.localStorage.getItem('patientAccountId')
        });
        WebService.wepServiceConnector(data, "postPatemptyRequest", false).then(function (result) {
            if (result.result == 2) {
                alert('You are deactivated');
            } else {
                $scope.buttonsDisabled = false;
                configService.setCardLock(true);
                cardService.GetCardFromServer();
                configService.setCardLock(false);
                $scope.CardsDataBig = cardService.GetCardLocalDB();
                
                if (window.localStorage.getItem('calls') == 0) {
                    console.log("You have a free call");
                 $state.go("specializationCall");
                }else{
                    if ($scope.CardsDataBig.length == 0)
                    // alert("You can't use this service until you add a credit card");
                    alert("You have to register at least a single credit card to use the service.Please press menu, then choose payments");
                else $state.go("specializationCall");
                }
                
            }
        });
    };
    $scope.searchDocs = function () {
         var data = $.param({
            'patientAccountId': window.localStorage.getItem('patientAccountId')
        });
         console.log("data khaled",data)
                         $state.go("doctorsearch");

          WebService.wepServiceConnector(data, "postPatemptyRequest", false).then(function (result) {
            console.log("result khaled",result);
            if (result.result == 2) {
                alert('You are deactivated');
            } else {
                $state.go("doctorsearch");
            }
        });
    };
    $scope.showLoc = function () {
        var data = $.param({
            'patientAccountId': window.localStorage.getItem('patientAccountId')
        });
        WebService.wepServiceConnector(data, "postPatemptyRequest", false).then(function (result) {
            if (result.result == 2) {
                alert('You are deactivated');
            } else {
                $state.go("specialization");
            }
        });
    };
});