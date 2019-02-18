angular.module('app.controllers')
        .controller('signupCtrl', function ($scope, WebService, $state, $ionicModal, $ionicPopup) {
            var userdata = {'dateOfBirth': new Date()};
            $scope.signup = function (reg) {
                $.validator.addMethod(
                        "regex",
                        function (value, element, regexp) {
                            var re = new RegExp(regexp);
                            return this.optional(element) || re.test(value);
                        },
                        "Please check your input."
                        );
                $('#signupForm').validate({
                    rules: {
                        'User[mobile]': {
                            minlength: 11,
                            maxlength: 11,
                            regex: /^01\d{9}/
                        },
                        'PatientCreditCard[credit_card_number]': {
                            required: true,
                            creditcard: true
                        }
                    },
                    messages: {
                        'User[mobile]': {
                            minlength: "The mobile number must be 11 number",
                            maxlength: "The mobile number must be 11 number",
                            regex: "mobile number must start with 01",
                        },
                    },
                    errorElement: 'div',
                    errorLabelContainer: '.errorTxt'
                });
                if ($('#signupForm').valid()) {
                    var data = $('#signupForm').serialize();
                    WebService.wepServiceConnector(data, "postCreatePatient", true).then(function (result) {
                        var data = result.result;
                        if (data.status == "true")
                        {
                            alert('Congratulations ! You will receive an sms code to use for confirmation.');
                            $state.go("confirmation");
                        } else {

                            var message = "<ul><li>" + data.user.mobile + "</li></ul>" +
                                    "<ul><li>" + data.user.email + "</li></ul>";
                            $("#errorsdialog").html(message);
                            $("#errorsdialog").dialog();
                        }

                    });
                }
            };


            
            

        });