angular.module('app.routes', []).config(function ($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider.state('menu.map', {
            url: '/map',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/map.html',
                    controller: 'mapCtrl',
                },
                // 'menu@menumap': {
                //     templateUrl: 'templates/menu.html'
                // },
                // 'map@menumap': {
                //     templateUrl: 'templates/map.html'
                // }
            }
        }).state('menu.doctorMap', {
            url: '/doctorMap/:doctor_id/:visit_id/:notification_id/',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/doctorMap.html',
                    controller: 'doctorMapCtrl',
                    params: {
                        id: null,
                        data: null,
                        visit_id: null,
                        notification_id: null
                    }
                }
            }
        }).state('menu', {
            url: '/side-menu21',
            cache: false,
            templateUrl: 'templates/menu.html',
            abstract: true,
            controller: 'menuCtrl',
        }).state('signup', {
            url: '/signup',
            templateUrl: 'templates/signup.html',
            controller: 'signupCtrl'
        }).state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl',
            cache: false
        })
        /*
         .state('home', {
         url: '/home',
         templateUrl: 'templates/home.html',
         controller: 'homeCtrl'
         })*/
        .state('confirmation', {
            url: '/confirmation',
            templateUrl: 'templates/confirmation.html',
            controller: 'confirmationCtrl'
        }).state('FamilyMember', {
            url: '/FamilyMember',
            // templateUrl: 'templates/FamilyMember.html',
            controller: 'FamilyMemberCtrl'
        }).state('AddFamilyMember', {
            url: '/AddFamilyMember',
            templateUrl: 'templates/addFamilyMember.html',
            controller: 'AddFamilyMemberCtrl',
            cache: false
        }).state('editFamilyMember', {
            url: '/editFamilyMember/:patient_details',
            templateUrl: 'templates/edit_family_member.html',
            controller: 'editFamilyMemberCtrl'
        }).state('changePassword', {
            url: '/changePassword',
            templateUrl: 'templates/change_password.html',
            controller: 'changePasswordCtrl'
        }).state('payment', {
            url: '/payment',
            templateUrl: 'templates/payment.html',
            controller: 'paymentCtrl',
            cache: false
        }).state('visitsHistory', {
            url: '/history',
            templateUrl: 'templates/history.html',
            controller: 'visitsHistoryCtrl'
        }).state('help', {
            url: '/help',
            templateUrl: 'templates/help.html',
            controller: 'helpCtrl',
        }).state('notifications', {
            url: '/notifications',
            templateUrl: 'templates/notifications.html',
            controller: 'notificationsCtrl',
            cache: false
        }).state('callNotification', {
            templateUrl: 'templates/callNotification.html',
            controller: 'callNotificationCtrl',
            cache: false,
            params: {
                call: null
            },
        }).state('notificationTemplet', {
            templateUrl: 'templates/notificationTemplet.html',
            controller: 'notificationTempletCtrl',
            cache: false,
            params: {
                data: null
            },
        }).state('forgetPassword', {
            url: '/forgetPassword',
            templateUrl: 'templates/forget_password.html',
            controller: 'forgetPasswordCtrl'
        }).state('visitReport', {
            url: '/visitReport/',
            cache: false,
            templateUrl: 'templates/visitReport.html',
            controller: 'visitReportCtrl',
            params: {
                report: null
            },
        }).state('settings', {
            url: '/settings',
            templateUrl: 'templates/settings.html',
            controller: 'settingsCtrl',
        }).state('specialization', {
            cache: false,
            url: '/specializations/:spiId',
            templateUrl: 'templates/doctor_specialization.html',
            controller: 'specializationCtrl',
            controllerAs: 'As specCTRL',
        }).state('doctorsearch', {
            cache: false,
            url: '/doctorsearch/',
            templateUrl: 'templates/doctor_search.html',
            controller: 'doctorsearchCtrl',
            controllerAs: 'As searchCTRL',
        }).state('editPatientAccount', {
            url: '/editPatientAccount',
            templateUrl: 'templates/editPatientAccount.html',
            controller: 'editPatientAccountCtrl'
        }).state('minorSpecialization', {
            url: '/minorSpecialization',
            params: {
                'myParam': null,
                'patientId': null
            },
            templateUrl: 'templates/minor_specialization.html',
            controller: 'minorCtrl'
        }).state('doctorList', {
            url: '/doctorList/:speId/:patientId/:gender/:grade/:major/:minor/',
            params: {
                'myParam': null,
                'speId': null,
                'patientId': null,
                'gender': null,
                'grade': null,
                'major': null,
                'minor': null,
            },
            templateUrl: 'templates/doctor-list.html',
            controller: 'doctorListCtrl'
        }).state('forgetPasswordCode', {
            url: '/forgetPasswordCode',
            templateUrl: 'templates/forget_password_code.html',
            controller: 'forgetPasswordCodeCtrl'
        }).state('visitDetails', {
            url: '/visitDetails',
            templateUrl: 'templates/visitDetails.html',
            controller: 'visitDetailsCtrl',
            params: {
                visit_details: null
            },
        }).state('requestDoctorConfirmation', {
            cache: false,
            url: '/requestDoctorConfirmation',
            templateUrl: 'templates/request_doctor_confirmation.html',
            controller: 'requestDoctorConfirmationCtrl',
            params: {
                first_name: null,
                last_name: null,
                id: null,
                fees: null,
                distanc: null,
                patientId: null,
                grade: null,
                specialization: null,
                rate: null,
                gender: null,
                image: null
            },
        }).state('requestCallConfirmation', {
            cache: false,
            url: '/requestCallConfirmation',
            templateUrl: 'templates/request_call_confirmation.html',
            controller: 'requestCallConfirmationCtrl',
            params: {
                first_name: null,
                last_name: null,
                id: null,
                fees: null,
                patientId: null,
                grade: null,
                specialization: null,
                rate: null,
                gender: null,
                image: null
            },
        }).state('specializationCall', {
            cache: false,
            url: '/specializationsCall/:spiId',
            templateUrl: 'templates/doctor_call_specialization.html',
            controller: 'specializationCallCtrl',
        }).state('doctorCallList', {
            url: '/doctorCallList/:speId/:patientId/:gender/:grade/:major/:minor/',
            params: {
                'myParam': null,
                'speId': null,
                'patientId': null,
                'gender': null,
                'grade': null,
                'major': null,
                'minor': null,
            },
            templateUrl: 'templates/doctor-call-list.html',
            controller: 'doctorCallListCtrl'
        }).state('callsHistory', {
            url: '/callHistory',
            templateUrl: 'templates/callHistory.html',
            controller: 'callsHistoryCtrl'
        }).state('callDetails', {
            url: '/visitDetails',
            templateUrl: 'templates/callDetails.html',
            controller: 'callDetailsCtrl',
            params: {
                call_details: null
            },
        }).state('payCreditVisit', {
            url: '/payCreditVisit',
            templateUrl: 'templates/payCreditVisit.html',
            controller: 'payCreditVisitCtrl',
            params: {
                data: null
            },
        }).state('terms', {
            url: '/terms',
            templateUrl: 'templates/terms.html',
        }).state('noResponse', {
            url: '/noResponse',
            templateUrl: 'templates/noResponse.html',
        });
    $urlRouterProvider.otherwise('menu.map');
});