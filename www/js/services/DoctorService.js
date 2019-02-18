angular.module('app.services')
        .service('DoctorsService', ['WebService', function (WebService) {
                this.GetDoctors = function (params) {
                    var data = $.param({
                        lat: params.lat,
                        long: params.long,
                        specialization: params.specialization_id ? params.specialization_id : "",
                        grade: params.grade ? params.grade : "",
                        gender: params.gender ? params.gender : "",
                        call: params.call ? params.call : false,
                    });
                    return WebService.wepServiceConnector(data, "getReturnDoctorsList", false).then(function (result) {
                        var response = result.result;
                        return response;
                    });
                };

                this.GetDoctorLocation = function (doctor_id) {
                    var data = $.param({
                        doctor_id: doctor_id
                    });
                    return WebService.wepServiceConnector(data, "getDoctorLocation", false).then(function (result) {
                        var response = result.result;
                        return response;
                    });

                };
            }]);
