angular.module('app.controllers')
        .controller('loginCtrl', function ($scope, $injector, $state,$ionicPopup, WebService, backButton,$translate) {
            $scope.$on("$ionicView.enter", function (event, data) {
                backButton.GetSpecLocalDB(501, false, false, true);


            });
            $scope.$on("$ionicView.leave", function (event, data) {
                backButton.GetSpecLocalDB(501,false,false,false);
            });
             $scope.iconFloat = 'left';
            if ($translate.use() == 'ar') {
                $scope.iconFloat = 'right';
            }
            $scope.login = function () {
                /*validation*/
                $('#loginForm').validate({
                    rules: {
                        'LoginForm[mobile]': {
                            required: true
                        },
                        'LoginForm[password]': {
                            required: true
                        },
                    },
                    messages: {
                        'LoginForm[mobile]': {
                            required: "Please enter mobile number"
                        },
                        'LoginForm[password]': {
                            required: "Please enter password"
                        }
                    },
                    errorPlacement: function (error, element)
                    {
                        element.attr('title', error.text());
                        $(".error").tooltip(
                                {
                                    position:
                                            {
                                                my: "left+5 center",
                                                at: "right center"
                                            },
                                    tooltipClass: "ttError"
                                });


                    }
                });

                if ($('#loginForm').valid()) {
                    var data = $('#loginForm').serialize();
                    console.log("login form",data);
                    WebService.wepServiceConnector(data, "login", true).then(function (result) {
                        console.log(result);
                        window.localStorage.setItem('offer', result.offer);
                        window.localStorage.setItem('calls', result.made_calls);
                        console.log("offer&calls",result.offer , '+' , result.made_calls);
                        var data = result.result;
                            console.log("data1 :" , data);
                        if (data.valid && data.code == 1 )
                        {
                            window.localStorage.setItem('patientAccountId', data.patientAccountId);
                            window.localStorage.setItem('token', data.token);
                            var injector = $injector.get('profileService');
                            injector.UpdateProfileLocalDB(result);
                            console.log("data : " , data);
                            if (result.offer == 1 && result.made_calls == 0){
                                 var alertPopup = $ionicPopup.alert({
                                 title: 'Free Call',
                                 template: 'You have a free call. Click on Call the Doctor button to get it'
                                 });

                                 alertPopup.then(function(res) {
                                 console.log('there are offers');
                                 $state.go("menu.map");
                             });
                            }else{
                                console.log('there is no offers')
                              $state.go("menu.map");  
                            }
                            
                        } else if (data.code == 0) {

                            $state.go("confirmation");
                        } else if (data.code == 2) {
                            $("#errorsdialog").html("your account has been deactivated please contact support...");
                            $("#errorsdialog").dialog();
                        } else {

                            var message = /*"Incorrect mobile or password ""<ul><li>" + data.user.mobile + "</li></ul>" +*/
                                    "<ul><li>" + data.user.password + "</li></ul>";
                            $("#errorsdialog").html(message);
                            $("#errorsdialog").dialog();
                        }

                    });
                }
            }


        });
