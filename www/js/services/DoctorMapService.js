angular.module('app.services')
        .service('DoctorMapService', ['DoctorsService', function ( DoctorsService) {
                var mainScope = this;
                this.map2;
                this.markers = [];
                this.currentLocation;
                this.UnDrawMapDoctor = function (element) {
                    mainScope.map2.off(plugin.google.maps.event.MAP_READY, function () {});
                    clearInterval(mainScope.list);
                    mainScope.map2.clear();
                    mainScope.map2.clear();
                    mainScope.map2.clear();
                    element.innerHTML = '';
                    mainScope.map2.clear();
                    mainScope.markers = [];
                    //mainScope.map2.clear();
                  //  mainScope.map2.remove();
                    mainScope.map2.clear();
                    //mainScope.map2.setClickable(false);
                    //mainScope.map =null;

                };
                
                this.DrawMapDoctor = function (element, doctor_id) {
                    mainScope.map2 = plugin.google.maps.Map.getMap(element, {
                        'mapType': plugin.google.maps.MapTypeId.ROADMAP,
                        'controls': {
                            'compass': true,
                            'myLocationButton': true,
                            'indoorPicker': true,
                            'zoom': true
                        },
                        'gestures': {
                            'scroll': true,
                            'tilt': true,
                            'rotate': true,
                            'zoom': true
                        },
                    });

                    // Wait until the map is ready status.);
                    mainScope.map2.on(plugin.google.maps.event.MAP_READY, function () {
                        mainScope.map2.getMyLocation(function (location) {
                            mainScope.map2.moveCamera({
                                "target": location.latLng,
                                "zoom": 17
                            });
                        });
                    });
                    mainScope.list = setInterval(function () {
                        DoctorsService.GetDoctorLocation(doctor_id).then(function (data) {
                            mainScope.map2.addMarker({
                                'position': new plugin.google.maps.LatLng(data.latitude, data.longitude),
                                'title': 'doctor',
                                'icon': cordova.file.applicationDirectory + 'www/img/PinDr.png',
                                /*'icon': {
                                 'url': 'img/PinDr.png',
                                 'size': {
                                 width: 25,
                                 height: 25
                                 }
                                 }*/
                            }, function (marker) {
                                marker.showInfoWindow();
                            });
                        });
                    }, 10000);
                    return mainScope.map2;
                };
            }]);