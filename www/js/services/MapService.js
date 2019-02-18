angular.module('app.services')
        .service('MapService', ['DoctorsService', function (DoctorsService) {
                var mainScope = this;
                this.markers = [];
                var Latii;
                this.setFalse = function () {
                    if (mainScope.map != null && mainScope.map != 'undefined') {
                        mainScope.map.setClickable(false);
                    }
                };

                this.setTrue = function () {
                    if (mainScope.map != null && mainScope.map != 'undefined') {
                        mainScope.map.setClickable(true);
                    }
                };

                this.UnDrawMap = function (element) {
                    mainScope.map.off(plugin.google.maps.event.MAP_READY, function () {});
                    clearInterval(mainScope.list);
                    mainScope.map.clear();
                    mainScope.map.clear();
                    mainScope.map.clear();
                    element.innerHTML = '';
                    mainScope.map.clear();
                    mainScope.markers = [];
                    mainScope.map.setClickable(false);
                    //mainScope.map.clear();
                    mainScope.map.remove();
                    mainScope.map.clear();
                    //mainScope.map.setClickable(false);
                    //mainScope.map =null;

                };

                this.DrawMap = function (element) {
                    mainScope.map = plugin.google.maps.Map.getMap(element, {
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
                    // console.log('Got Map ', mainScope.map);
                    // Wait until the map is ready status.);
                    mainScope.map.on(plugin.google.maps.event.MAP_READY, function () {
                        mainScope.map.clear();
                        mainScope.map.getMyLocation(function (location) {
                             console.log('got location', location);
                             //$scope.Latii = location.latLng.lat;
                              window.localStorage.setItem('Lat', location.latLng.lat);
                              window.localStorage.setItem('Long', location.latLng.lng);
                             console.log('got location lat', location.latLng.lat);
                             console.log('got location lng', location.latLng.lng);
                            mainScope.map.moveCamera({
                                "target": location.latLng,
                                "zoom": 17
                            });
                            for (var i = 0; i < mainScope.markers.length; i++) {
                                mainScope.markers[i].remove();
                            }
                            mainScope.map.addMarker({
                                'position': location.latLng,
                                'title': 'Home',
                                'icon': cordova.file.applicationDirectory + 'www/img/pin.png',
                            }, function (marker) {
                                marker.showInfoWindow();
                                mainScope.markers.push(marker);
                            });
                            // console.log('added marker');


                            ///////////////////////
                            mainScope.list = setInterval(function () {
                                mainScope.map.clear();
                                for (var i = 0; i < mainScope.markers.length; i++) {
                                    mainScope.markers[i].remove();
                                }

                                DoctorsService.GetDoctors({
                                    lat: location.latLng.lat,
                                    long: location.latLng.lng
                                }).then(function (data) {

                                    for (i = 0; i < data.length; i++) {
                                        mainScope.map.addMarker({
                                            'position': location.latLng,
                                            'title': 'Home',
                                            'icon': cordova.file.applicationDirectory + 'www/img/pin.png',
                                        }, function (marker) {
                                            marker.showInfoWindow();
                                            mainScope.markers.push(marker);
                                        });
                                        mainScope.map.addMarker({
                                            'position': new plugin.google.maps.LatLng(data[i].latitude, data[i].longitude),
                                            'title': data[i].doctor_spe_name ,
                                            'icon': cordova.file.applicationDirectory + 'www/img/PinDr.png', 
                                        }, function (marker) {
                                            marker.showInfoWindow();
                                            mainScope.markers.push(marker);
                                        });


                                    }
                                });

                            }, 10000);
                        });
                    });
                    return mainScope.map;
                };
            }]);