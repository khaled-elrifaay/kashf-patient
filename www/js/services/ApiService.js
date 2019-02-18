angular.module('app.services').service('ApiService', ['configService', function (configService) {
    this.siteURL = configService.getLocalServerUrl(); //'url';
    this.apiDIR = configService.getApiDIR(); //'api/';
    this.apiPay = configService.getTestPayApiURL(); //'api/';
    this.getApiUrl = function (api) {
        switch (api) {
            /************* Change Doctor Password ***************/
        case 'updateChangePassword':
            return this.siteURL + this.apiDIR + 'patientsAccounts/changepassword/';
            /************* End Visit****************/
        case 'getInvestigations':
            return this.siteURL + this.apiDIR + 'investigations/list/';
        case 'getTreatments':
            return this.siteURL + this.apiDIR + 'treatments/list/';
        case 'getEndVisitInvestigations':
            return this.siteURL + this.apiDIR + 'investigations/list/';
        case 'getEndVisitTreatments':
            return this.siteURL + this.apiDIR + 'treatments/list/';
        case 'getEndVisitPayment':
            return this.siteURL + this.apiDIR + 'visits/getPayment/';
        case 'postEndVisitForm':
            return this.siteURL + this.apiDIR + 'visits/endVisit';
            /************ Doctor Home *****************/
        case 'postHomeSetLocation':
            return this.siteURL + this.apiDIR + 'doctorLocation/setLocation/';
        case 'getDoctorStatus':
            return this.siteURL + this.apiDIR + 'doctors/getStatus/';
        case 'getDoctorNotification':
            return this.siteURL + this.apiDIR + 'doctors/notification';
        case 'postSeenNotification':
            return this.siteURL + this.apiDIR + 'patientsAccounts/seenNotification/';
        case 'postDoctorStatus':
            return this.siteURL + this.apiDIR + 'doctors/doctorStatus/';
            /*********** Forget Password******************/
        case 'postForgotPasswordRequest':
            return this.siteURL + this.apiDIR + 'users/forgetPasswordRequest/';
            /************* Login ****************/
        case 'login':
            return this.siteURL + this.apiDIR + 'PatientsAccounts/login/';
            /************ New Password *****************/
        case 'postNewPassword':
            return this.siteURL + this.apiDIR + 'users/saveNewPassword/';
            /************ last Notification *****************/
        case 'getDiseases':
            return this.siteURL + this.apiDIR + 'patients/getDiseases';
        case 'getAllergies':
            return this.siteURL + this.apiDIR + 'patients/getAllergies';
        case 'postVisitAccept':
            return this.siteURL + this.apiDIR + 'visits/accept';
        case 'postVisitReject':
            return this.siteURL + this.apiDIR + 'visits/reject';
            /************ Notification Menu *****************/
        case 'getNotificationMenu':
            return this.siteURL + this.apiDIR + 'patientsAccounts/getAllNotifications/';
        case 'getAllNotificationMenu':
            return this.siteURL + this.apiDIR + 'patientsAccounts/getAllNotifications/';
            /************ Patient Location *****************/
        case 'postPatientLocationMap':
            return this.siteURL + this.apiDIR + 'visits/startVisit';
            /************** Profile ***************/
        case 'getDoctorProfile':
            return this.siteURL + this.apiDIR + 'doctors/getDataFromDb';
        case 'getDoctorPhoto':
            return this.siteURL + 'uploads/doctors/photos/';
            /************** Profile ***************/
        case 'postProfileEdit':
            return this.siteURL + 'doctors/editDoctor';
            /************ Visit Details *****************/
        case 'getVisitData':
            return this.siteURL + this.apiDIR + 'visits/data/';
            /************ Visit History *****************/
        case 'visitHistory':
            return this.siteURL + this.apiDIR + 'visits/list/';
            /************ Outstanding Visit *****************/
        case 'activeVisitRequest':
            return this.siteURL + this.apiDIR + 'visits/activeRequest/';
            /************ Doctor Profile *****************/
        case 'getDocProfile':
            return this.siteURL + this.apiDIR + 'getDoctorProfile';
        case 'getDocData':
            return this.siteURL + this.apiDIR + 'doctors/getDocData';
        case 'getDocGrades':
            return this.siteURL + this.apiDIR + 'doctors/DoctorGradesList';
        case 'getDocClinic':
            return this.siteURL + this.apiDIR + 'clinicArea/list';
        case 'getHospitalsList':
            return this.siteURL + this.apiDIR + 'hospitals/list';
        case 'getDocSpecialization':
            return this.siteURL + this.apiDIR + 'Specialization/ReturnSpecialization';
        case 'getAllAllergies':
            return this.siteURL + this.apiDIR + 'Allergies/list';
        case 'getAllDiseases':
            return this.siteURL + this.apiDIR + 'Diseases/list';
        case 'getAllArea':
            return this.siteURL + this.apiDIR + 'AreaOfInterset/list';
        case 'postDoctoremptyRequest':
            return this.siteURL + this.apiDIR + 'doctors/DoctoremptyRequest';
        case 'postPatientsCreate':
            return this.siteURL + this.apiDIR + 'patients/create/';
        case 'postPatientsConfirmAccount':
            return this.siteURL + this.apiDIR + 'patientsAccounts/confirmAccount/';
            /************ Patient API*****************/
        case 'postCancelVisitRequest':
            return this.siteURL + this.apiDIR + 'visits/CancelVisitRequest/';
        case 'getDoctorData':
            return this.siteURL + this.apiDIR + 'doctors/doctorData/';
        case 'searchDoctors':
            return this.siteURL + this.apiDIR + 'doctors/searchDoctors/';
        case 'postPatientsEdit':
            return this.siteURL + this.apiDIR + 'patients/edit/';
        case 'getPatientData':
            return this.siteURL + this.apiDIR + 'patientsAccounts/patientData/';
        case 'postSaveNewPassword':
            return this.siteURL + this.apiDIR + 'users/saveNewPassword';
        case 'postForgetPasswordRequest':
            return this.siteURL + this.apiDIR + 'users/forgetPasswordRequest';
        case 'postCreateVisitRequest':
            return this.siteURL + this.apiDIR + 'visits/createVisitRequest/';
        case 'postCreatePatient':
            return this.siteURL + this.apiDIR + 'patientsAccounts/createPatient/';
        case 'getMinorSpecialization':
            return this.siteURL + this.apiDIR + 'specialization/returnMinorSpecialization/';
        case 'postRatingDoctor':
            return this.siteURL + this.apiDIR + 'doctorsRating/ratingDoctor/';
        case 'postPatientsList':
            return this.siteURL + this.apiDIR + 'patients/patientsList/';
        case 'postPatientData':
            return this.siteURL + this.apiDIR + 'patients/patientData/';
        case 'postPatemptyRequest':
            return this.siteURL + this.apiDIR + 'patientsAccounts/PatemptyRequest';
        case 'getSpecialization':
            return this.siteURL + this.apiDIR + 'specialization/returnAllSpecialization';
        case 'getReturnDoctorsList':
            return this.siteURL + this.apiDIR + 'doctors/returnDoctorsList/';
        case 'getDoctorLocation':
            return this.siteURL + this.apiDIR + 'doctors/geDoctorLocation/';
        case 'postCreateCallRequest':
            return this.siteURL + this.apiDIR + 'calls/CreateCallRequest/';
        case 'callHistory':
            return this.siteURL + this.apiDIR + 'calls/list/';
        case 'getCardLocal':
            return this.siteURL + this.apiDIR + 'card/getcardlocal/';
        case 'getCardFormData':
            //                            return this.siteURL + this.apiDIR + 'card/GetCardFormData/';
            return this.siteURL + this.apiDIR + 'card/addCreditCard/';
        case 'getCardStatus':
            return this.siteURL + this.apiDIR + 'card/GetCardStatus/';
        case 'makeCardPrim':
            return this.siteURL + this.apiDIR + 'card/MakeCardPrim/';
        case 'deleteCardLocal':
            return this.siteURL + this.apiDIR + 'card/DeleteCardLocal/';
        case 'editCardLocal':
            return this.siteURL + this.apiDIR + 'calls/list/';
        case 'editCardRemote':
            return this.siteURL + this.apiDIR + 'calls/list/';
        case 'addCardLocal':
            return this.siteURL + this.apiDIR + 'calls/list/';
        case 'checkDoctorHavecreditCard':
            return this.siteURL + this.apiDIR + 'doctors/CheckHaveCredit/';
        case 'addCardRemote':
            return this.apiPay;
        case 'patientPayCall':
            return this.siteURL + this.apiDIR + 'calls/patientPayCall/';
        case 'payCreditVisit':
            return this.siteURL + this.apiDIR + 'visits/payCreditVisit/';
        case 'notResponseVisitStatus':
            return this.siteURL + this.apiDIR + 'visits/notResponseVisitStatus/';
        case 'notResponseCallStatus':
            return this.siteURL + this.apiDIR + 'calls/notResponseCallStatus/';
            /*****************************/
        default:
            return this.siteURL;
        }
    };
}]);