var apiUrl = 'http://fablysh.esy.es/api/';
var userInfo = {};
angular.module('barber', ['ionic', 'ui.router', 'ngMessages', 'ionic.contrib.NativeDrawer'])

        .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
            $ionicConfigProvider.views.maxCache(10);
            //$ionicConfigProvider.views.transition('none');
            $ionicConfigProvider.scrolling.jsScrolling(false);
            $ionicConfigProvider.tabs.position('bottom');
            $stateProvider.state('home', {
                url: '/',
                templateUrl: 'templates/home.html',
                controller: 'HomeController'
            });

            $stateProvider.state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            });

            $stateProvider.state('forget', {
                url: '/forget',
                templateUrl: 'templates/forget.html',
                controller: 'ForgetController'
            });

            $stateProvider.state('signup', {
                url: '/signup',
                templateUrl: 'templates/signup.html',
                controller: 'SignUpController'
            });



            // setup an abstract state for the tabs directive
            $stateProvider.state('dashboard', {
                url: "/dashboard",
                abstract: true,
                templateUrl: "templates/dashboard.html",
                controller: 'DashboardController'
            });


            $stateProvider.state('dashboard.bookings', {
                url: '/bookings',
                views: {
                    'dashboard-bookings': {
                        templateUrl: 'templates/tab-bookings.html',
                        controller: 'BookingController'
                    }
                }
            })

            $stateProvider.state('dashboard.accepted', {
                url: '/accepted',
                views: {
                    'dashboard-accepted': {
                        templateUrl: 'templates/tab-accepted.html',
                        controller: 'AcceptedController'
                    }
                }
            })

            $stateProvider.state('dashboard.ongoing', {
                url: '/ongoing',
                views: {
                    'dashboard-ongoing': {
                        templateUrl: 'templates/tab-ongoing.html',
                        controller: 'OngoingController'
                    }
                }
            })

            $stateProvider.state('dashboard.completed', {
                url: '/completed',
                views: {
                    'dashboard-completed': {
                        templateUrl: 'templates/tab-completed.html',
                        controller: 'CompletedController'
                    }
                }
            })

            $stateProvider.state('logout', {
                url: '/logout',
                controller: 'LogoutController'
            });

            $stateProvider.state('my-profile', {
                url: '/my-profile',
                templateUrl: 'templates/my-profile.html',
                controller: 'MyProfileController'
            });

            $stateProvider.state('edit-profile', {
                url: '/edit-profile',
                templateUrl: 'templates/edit-profile.html',
                controller: 'EditProfileController'
            });




            $stateProvider.state('settings', {
                url: '/settings',
                templateUrl: 'templates/settings.html',
                controller: 'SettingsController'
            });

            $stateProvider.state('change-password', {
                url: '/change-password',
                templateUrl: 'templates/change-password.html',
                controller: 'ChangePasswordController'
            });

            $stateProvider.state('feedback', {
                url: '/feedback',
                templateUrl: 'templates/feedback.html',
                controller: 'FeedbackController'
            });

            $stateProvider.state('static-pages', {
                url: '/static-pages/:id',
                templateUrl: 'templates/static-pages.html',
                controller: 'StaticPagesController'
            });



            $stateProvider.state('reviews', {
                url: '/reviews',
                templateUrl: 'templates/reviews.html',
                controller: 'ReviewsController'
            });

            $stateProvider.state('add-reply', {
                url: '/add-reply/:id',
                templateUrl: 'templates/add-reply.html',
                controller: 'AddReplyController'
            });



            $stateProvider.state('other-profile', {
                url: '/other-profile/:id',
                templateUrl: 'templates/other-profile.html',
                controller: 'OtherProfileController'
            });

            $stateProvider.state('set-availability', {
                url: '/set-availability',
                templateUrl: 'templates/set-availability.html',
                controller: 'SetAvailabilityController'
            });

            $stateProvider.state('manage-accounts', {
                url: '/accounts',
                templateUrl: 'templates/manage-accounts.html',
                controller: 'AccountsController'
            });

            $stateProvider.state('add-barber', {
                url: '/add-barber',
                templateUrl: 'templates/add-barber.html',
                controller: 'AddBarberController'
            });

            $stateProvider.state('bank-details', {
                url: '/bank-details',
                templateUrl: 'templates/bank-details.html',
                controller: 'BankDetailsController'
            });

            $stateProvider.state('notifications', {
                url: '/notifications',
                templateUrl: 'templates/notifications.html',
                controller: 'NotificationsController'
            });

            $urlRouterProvider.otherwise('/')
        })

        .filter('format', function () {
            return function (input, format) {
                return moment(new Date(input)).format(format);
            }
        })

        .directive('ionSideMenuContentScale', function ($timeout, $rootScope, $ionicModal) {
            return {
                restrict: 'AC',
                link: function (scope, element, attrs) {
                    scope.$watch(function () {
                        return element.attr('style');
                    }, function (newValue) {
                        if (typeof newValue != "undefined") {
                            var transform = newValue.replace("transform: translate3d", "");
                            transform = transform.replace(/[^\w\s]/gi, '');
                            transform = transform.replace(/px/gi, '');
                            var axis = transform.split(" ");
                            if (typeof axis[0] != "undefined" && parseInt(axis[0]) != 0) {
                                element.addClass('side-menu-open');
                            } else {
                                element.removeClass('side-menu-open');
                            }

                        }

                    });
                }
            }
        })

        .directive('googleplace', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, model) {
                    var options = {
                        types: [],
                    };
                    scope.gPlace = new google.maps.places.Autocomplete(element[0],
                            options);

                    google.maps.event.addListener(scope.gPlace, 'place_changed',
                            function () {
                                var place = scope.gPlace.getPlace();
                                console.log(place);
                                $("#location").val(place.formatted_address);
                                $("#lat").val(place.geometry.location.lat());
                                $("#lng").val(place.geometry.location.lng());
                                scope.$apply(function () {
                                    model.$setViewValue(element.val());
                                });
                            });
                }
            };
        })

        .controller('AppCtrl', function ($state, $scope, $ionicHistory, $ionicSideMenuDelegate, $ionicPopup) {
            $scope.toggleLeft = function () {
                $ionicSideMenuDelegate.toggleLeft();
            };


            $scope.myGoBack = function () {
                $ionicHistory.goBack();
                /*var options = {
                    "direction": "right", // 'left|right|up|down', default 'right' (Android currently only supports left and right)
                    "duration": 500, // in milliseconds (ms), default 400
                    "iosdelay": -1, // ms to wait for the iOS webview to update before animation kicks in, default 60
                    "androiddelay": -1, // same as above but for Android, default 70
                    "winphonedelay": 150 // same as above but for Windows Phone, default 200
                };
                window.plugins.nativepagetransitions.slide(
                        options,
                        function (msg) {
                            console.log("success: " + msg);
                            window.plugins.nativepagetransitions.executePendingTransition();
                        }, // called when the animation has finished
                        function (msg) {
                            alert("error: " + msg)
                        } // called in case you pass in weird values
                );*/
            };

            $scope.goToPage = function (pageId, params) {
                if (params == undefined) {
                    $state.go(pageId);
                } else {
                    $state.go(pageId, {
                        id: params
                    });
                }
                $scope.closeDrawer();
                /*var options = {
                    "direction": "left", // 'left|right|up|down', default 'right' (Android currently only supports left and right)
                    "duration": 500, // in milliseconds (ms), default 400
                    "iosdelay": -1, // ms to wait for the iOS webview to update before animation kicks in, default 60
                    "androiddelay": -1, // same as above but for Android, default 70
                    "winphonedelay": 150, // same as above but for Windows Phone, default 200
                    //"href": "#/" + page
                };
                window.plugins.nativepagetransitions.slide(
                        options,
                        function (msg) {
                            console.log("success: " + msg);
                            window.plugins.nativepagetransitions.executePendingTransition();
                        }, // called when the animation has finished
                        function (msg) {
                            alert("error: " + msg)
                        } // called in case you pass in weird values
                );*/
            };

            $scope.openMenu = function () {
                var options = {
                    "origin": "left", // 'left|right', open the drawer from this side of the view, default 'left'
                    "action": "open", // 'open|close', default 'open', note that close is not behaving nicely on Crosswalk
                    "duration": 300, // in milliseconds (ms), default 400
                    "iosdelay": 50 // ms to wait for the iOS webview to update before animation kicks in, default 60
                };
                window.plugins.nativepagetransitions.drawer(
                        options,
                        function (msg) {
                            console.log("success: " + msg)
                        }, // called when the animation has finished
                        function (msg) {
                            alert("error: " + msg)
                        } // called in case you pass in weird values
                );
            }


            $scope.showCamera = function (destId) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Choose Method',
                    template: 'Please select method to choose profile picture.',
                    cancelText: 'Gallery',
                    okText: 'Camera'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        openCamera(destId);
                    } else {
                        openGallery(destId);
                    }
                });
            };



        })

        .controller('HomeController', function ($scope, $state) {

        })

        .controller('LoginController', function ($scope, $state, $ionicLoading, $http, $ionicPopup) {
            $scope.data = {
                email: '',
                password: ''
            };
            $scope.submitForm = function (loginForm) {
                if (loginForm.$valid) {
                    showLoader($ionicLoading);
                    var responsePromise = $http({
                        method: 'POST',
                        url: apiUrl + "merchantLogin",
                        data: $.param({
                            email: $scope.data.email,
                            password: $scope.data.password
                        }),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    responsePromise.success(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        if (data.status) {
                            userInfo = data.data.User;
                            if (userInfo.role_id == 2) {
                                $("#merchant").show();
                                $("#barber").hide();
                            } else if (userInfo.role_id == 4) {
                                $("#merchant").hide();
                                $("#barber").show();
                            }
                            /*if (device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos") {
                             pushNotification.register(
                             function(){
                             console.log("success");
                             },
                             function(){
                             console.log("error");
                             },
                             {
                             "senderID": "89616263869",
                             "ecb": "onNotification"
                             });
                             } else {
                             pushNotification.register(
                             tokenHandler,
                             errorHandler,
                             {
                             "badge": "true",
                             "sound": "true",
                             "alert": "true",
                             "ecb": "onNotificationAPN"
                             });
                             }*/
                            $scope.goToPage('dashboard.bookings');
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: 'Error',
                                scope: $scope,
                                template: data.message,
                                buttons: [
                                    {
                                        text: 'Cancel'
                                    },
                                    {
                                        text: '<b>OK</b>',
                                        type: 'button-assertive'
                                    }
                                ]
                            });
                        }
                    });
                    responsePromise.error(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: "Invalid Request",
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    });
                }
            }
        })

        .controller('LogoutController', function ($scope, $state) {
            $state.go('home');
        })

        .controller('SignUpController', function ($scope, $state, $http, $ionicLoading, $ionicPopup) {
            $scope.data = {
                email: '',
                password: ''
            };
            $scope.submitForm = function (signupForm) {
                if (signupForm.$valid) {
                    showLoader($ionicLoading);
                    var responsePromise = $http({
                        method: 'POST',
                        url: apiUrl + "merchantSignup",
                        data: $.param({
                            email: $scope.data.email,
                            password: $scope.data.password
                        }),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    responsePromise.success(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        if (data.status) {
                            userInfo.id = data.data;
                            $scope.goToPage('edit-profile');
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: 'Error',
                                scope: $scope,
                                template: data.message,
                                buttons: [
                                    {
                                        text: 'Cancel'
                                    },
                                    {
                                        text: '<b>OK</b>',
                                        type: 'button-assertive'
                                    }
                                ]
                            });
                        }
                    });
                    responsePromise.error(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: "Invalid Request",
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    });
                }
            }
        })

        .controller('ForgetController', function ($scope, $state, $ionicLoading, $http, $ionicPopup) {
            $scope.data = {
                email: ''
            };
            $scope.submitForm = function (forgetForm) {
                if (forgetForm.$valid) {
                    showLoader($ionicLoading);
                    var responsePromise = $http({
                        method: 'POST',
                        url: apiUrl + "merchantForget",
                        data: $.param({
                            email: $scope.data.email
                        }),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    responsePromise.success(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        if (data.status) {
                            var myPopup = $ionicPopup.show({
                                title: 'Success',
                                scope: $scope,
                                template: data.message,
                                buttons: [
                                    {
                                        text: 'Cancel'
                                    },
                                    {
                                        text: '<b>OK</b>',
                                        type: 'button-positive',
                                        onTap: function () {
                                            myPopup.close();
                                            $scope.goToPage('login');
                                        }
                                    }
                                ]
                            });
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: 'Error',
                                scope: $scope,
                                template: data.message,
                                buttons: [
                                    {
                                        text: 'Cancel'
                                    },
                                    {
                                        text: '<b>OK</b>',
                                        type: 'button-assertive'
                                    }
                                ]
                            });
                        }
                    });
                    responsePromise.error(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: "Invalid Request",
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    });
                }
            }
        })

        .controller('DashboardController', function ($scope, $state, $ionicModal, $ionicLoading, $http, $ionicPopup) {
            $ionicModal.fromTemplateUrl('templates/filter.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $ionicModal.fromTemplateUrl('templates/location.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.location = modal;
            });
            $scope.openFilter = function () {
                $scope.modal.show();
            };
            $scope.closeFilter = function () {
                $scope.modal.hide();
            };
            $scope.openLocation = function () {
                $scope.location.show();
            };
            $scope.closeLocation = function () {
                $scope.location.hide();
            };
            $scope.dashboardSearch = function (id) {
                $("#" + id).slideToggle();
            }

            $scope.changeBookingStatus = function (id, status) {
                showLoader($ionicLoading);
                if (status == 1) {
                    var changeStatus = "accepted";
                } else if (status == 2) {
                    var changeStatus = "declined";
                } else if (status == 3) {
                    var changeStatus = "started";
                } else if (status == 5) {
                    var changeStatus = "canceled";
                } else if (status == 4) {
                    var changeStatus = "completed";
                }
                var responsePromise = $http({
                    method: 'POST',
                    url: apiUrl + "changeMerchantBookingStatus",
                    data: $.param({
                        id: id,
                        status: status
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                responsePromise.success(function (data, status, headers, config) {
                    hideLoader($ionicLoading);
                    if (data.status) {
                        var myPopup = $ionicPopup.show({
                            title: 'Success',
                            scope: $scope,
                            template: "Appointment " + changeStatus,
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-positive',
                                    onTap: function () {
                                        console.log($state);
                                        if (changeStatus == "accepted" || changeStatus == "declined") {
                                            $scope.$broadcast('processBookings');
                                        } else if (changeStatus == "started" || changeStatus == "canceled") {
                                            $scope.$broadcast('processAccepted');
                                        } else if (changeStatus == "completed") {
                                            $scope.$broadcast('processOngoing');
                                        }
                                    }
                                }
                            ]
                        });

                    } else {
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: data.message,
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    }
                });
                responsePromise.error(function (data, status, headers, config) {
                    hideLoader($ionicLoading);
                    var myPopup = $ionicPopup.show({
                        title: 'Error',
                        scope: $scope,
                        template: "Invalid Request",
                        buttons: [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: '<b>OK</b>',
                                type: 'button-assertive'
                            }
                        ]
                    });
                });
            }

        })

        .controller('BookingController', function ($scope, $state, $ionicLoading, $ionicPopup, $http) {
            $scope.getBookings = function () {
                showLoader($ionicLoading);
                var responsePromise = $http({
                    method: 'POST',
                    url: apiUrl + "merchantBookings",
                    data: $.param({
                        user_id: userInfo.id,
                        status: 0
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                responsePromise.success(function (data, status, headers, config) {
                    hideLoader($ionicLoading);
                    if (data.status) {
                        $scope.appointments = data.data;
                    } else {
                        $scope.appointments = [];
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: data.message,
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    }
                });
                responsePromise.error(function (data, status, headers, config) {
                    hideLoader($ionicLoading);
                    var myPopup = $ionicPopup.show({
                        title: 'Error',
                        scope: $scope,
                        template: "Invalid Request",
                        buttons: [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: '<b>OK</b>',
                                type: 'button-assertive'
                            }
                        ]
                    });
                });
            }
            $scope.getBookings();

            $scope.$on('processBookings', function (e) {
                $scope.getBookings();
            });

            var cronNotification = setInterval(function () {
                getNotifications();
            }, 1000 * 60 * 5);

            $scope.$on('$destroy', function () {
                clearInterval(cronNotification);
            });

        })

        .controller('AddController', function ($scope, $state) {
            $scope.submitForm = function (addForm) {
                if (addForm.$valid) {
                    var newEmail = $scope.data.email;

                }
            }
        })

        .controller('MyProfileController', function ($scope, $state, $ionicLoading, $http, $ionicPopup) {
            showLoader($ionicLoading);
            var responsePromise = $http({
                method: 'POST',
                url: apiUrl + "merchantProfile",
                data: $.param({
                    user_id: userInfo.id
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            responsePromise.success(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                if (data.status) {
                    $scope.merchant = data.data;
                } else {
                    var myPopup = $ionicPopup.show({
                        title: 'Error',
                        scope: $scope,
                        template: data.message,
                        buttons: [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: '<b>OK</b>',
                                type: 'button-assertive'
                            }
                        ]
                    });
                }
            });
            responsePromise.error(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                var myPopup = $ionicPopup.show({
                    title: 'Error',
                    scope: $scope,
                    template: "Invalid Request",
                    buttons: [
                        {
                            text: 'Cancel'
                        },
                        {
                            text: '<b>OK</b>',
                            type: 'button-assertive'
                        }
                    ]
                });
            });
        })

        .controller('EditProfileController', function ($scope, $state, $http, $ionicPopup, $compile, $ionicLoading) {
            $scope.data = {
                name: '',
                registration_no: '',
                contact: '',
                address: '',
                location: '',
                lat: '',
                lng: ''
            };
            setTimeout(function () {
                $(".pac-container").attr("data-tap-disabled", true);
            }, 3000);
            showLoader($ionicLoading);
            var responsePromise = $http({
                method: 'POST',
                url: apiUrl + "merchantProfile",
                data: $.param({
                    user_id: userInfo.id
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            responsePromise.success(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                if (data.status) {
                    $scope.data.name = data.data.Merchant.name;
                    $scope.data.registration_no = data.data.Merchant.registration_no;
                    $scope.data.contact = data.data.Merchant.contact;
                    $scope.data.address = data.data.Merchant.address;
                    $scope.data.location = data.data.Merchant.location;
                    $("#lat").val(data.data.Merchant.lat);
                    $("#lng").val(data.data.Merchant.lng);
                    if (data.data.MerchantImage.length > 0) {
                        for (var i = 0; i < (data.data.MerchantImage.length); i++) {
                            $("#image" + (i + 1)).attr("src", data.data.MerchantImage[i].image);
                        }
                    }
                    if (data.data.MerchantOffering.length > 0) {
                        for (var i = 0; i < (data.data.MerchantOffering.length); i++) {
                            if (i == 0) {
                                $("#offering").val(data.data.MerchantOffering[i].name);
                            } else {
                                $scope.addOffering();
                                $("#offering" + (i)).val(data.data.MerchantOffering[i].name);
                            }
                        }
                    }
                    if (data.data.MerchantType.length > 0) {
                        for (var i = 0; i < (data.data.MerchantType.length); i++) {
                            $("#" + data.data.MerchantType[i].name).prop("checked", true);
                        }
                    }
                } else {
                    var myPopup = $ionicPopup.show({
                        title: 'Error',
                        scope: $scope,
                        template: data.message,
                        buttons: [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: '<b>OK</b>',
                                type: 'button-assertive'
                            }
                        ]
                    });
                }
            });
            responsePromise.error(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                var myPopup = $ionicPopup.show({
                    title: 'Error',
                    scope: $scope,
                    template: "Invalid Request",
                    buttons: [
                        {
                            text: 'Cancel'
                        },
                        {
                            text: '<b>OK</b>',
                            type: 'button-assertive'
                        }
                    ]
                });
            });
            var i = 0;
            $scope.addOffering = function () {
                i++;
                var html = '<div id="newOffering' + i + '"><input type="text" name="offering[]" id="offering' + i + '" class="float-left width-78">';
                html += '<i class="icon ion-minus-circled size-25" ng-click="removeOffering(\'newOffering' + i + '\')"></i>';
                html += '<div style="clear:both"></div><div>';
                var temp = $compile(html)($scope);
                angular.element(document.getElementById('moreOffering')).append(temp);
            }



            $scope.getCurrentLocation = function () {
                showLoader($ionicLoading);
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        $("#lat").val(position.coords.latitude);
                        $("#lng").val(position.coords.longitude);
                        var responsePromise = $http({
                            method: 'GET',
                            url: "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&sensor=true",
                        });

                        responsePromise.success(function (data, status, headers, config) {
                            hideLoader($ionicLoading);
                            var address = data.results[0].formatted_address;
                            $("#location").val(address);
                        });
                        responsePromise.error(function (data, status, headers, config) {
                            hideLoader($ionicLoading);
                            var myPopup = $ionicPopup.show({
                                title: 'Error',
                                scope: $scope,
                                template: "Can not get place",
                                buttons: [
                                    {
                                        text: 'Cancel'
                                    },
                                    {
                                        text: '<b>OK</b>',
                                        type: 'button-assertive'
                                    }
                                ]
                            });
                        });
                    }, function (error) {
                        hideLoader($ionicLoading);
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                var msg = "User denied the request for Geolocation."
                                break;
                            case error.POSITION_UNAVAILABLE:
                                var msg = "Location information is unavailable."
                                break;
                            case error.TIMEOUT:
                                var msg = "The request to get user location timed out."
                                break;
                            case error.UNKNOWN_ERROR:
                                var msg = "An unknown error occurred."
                                break;
                        }
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: msg,
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    });
                } else {
                    hideLoader($ionicLoading);
                    var myPopup = $ionicPopup.show({
                        title: 'Error',
                        scope: $scope,
                        template: "Geolocation is not supported by this browser",
                        buttons: [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: '<b>OK</b>',
                                type: 'button-assertive'
                            }
                        ]
                    });
                }
            }

            $scope.removeOffering = function (id) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm',
                    template: 'Are you sure to delete this offering?',
                    cancelText: 'No',
                    okText: 'Yes'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        $("#" + id).remove();
                    }
                });
            }

            $scope.submitForm = function (addForm) {
                if (addForm.$valid) {
                    if ($("#image1").attr("src") == 'img/file-add.png' && $("#image2").attr("src") == 'img/file-add.png' && $("#image3").attr("src") == 'img/file-add.png' && $("#image4").attr("src") == 'img/file-add.png' && $("#image5").attr("src") == 'img/file-add.png') {
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: 'Please select altleast one parlor image',
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    } else {
                        var images = [];
                        if ($("#image1").attr("src") != 'img/file-add.png') {
                            images.push($("#image1").attr("src"));
                        }
                        if ($("#image2").attr("src") != 'img/file-add.png') {
                            images.push($("#image2").attr("src"));
                        }
                        if ($("#image3").attr("src") != 'img/file-add.png') {
                            images.push($("#image3").attr("src"));
                        }
                        if ($("#image4").attr("src") != 'img/file-add.png') {
                            images.push($("#image4").attr("src"));
                        }
                        if ($("#image5").attr("src") != 'img/file-add.png') {
                            images.push($("#image5").attr("src"));
                        }
                        showLoader($ionicLoading);
                        var responsePromise = $http({
                            method: 'POST',
                            url: apiUrl + "updateMerchantProfile",
                            data: $("#addForm").serialize() + "&" + $.param({images: images, user_id: userInfo.id}),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        });

                        responsePromise.success(function (data, status, headers, config) {
                            hideLoader($ionicLoading);
                            if (data.status) {
                                $scope.goToPage('set-availability');
                            } else {
                                var myPopup = $ionicPopup.show({
                                    title: 'Error',
                                    scope: $scope,
                                    template: data.message,
                                    buttons: [
                                        {
                                            text: 'Cancel'
                                        },
                                        {
                                            text: '<b>OK</b>',
                                            type: 'button-assertive'
                                        }
                                    ]
                                });
                            }
                        });
                        responsePromise.error(function (data, status, headers, config) {
                            hideLoader($ionicLoading);
                            var myPopup = $ionicPopup.show({
                                title: 'Error',
                                scope: $scope,
                                template: "Invalid Request",
                                buttons: [
                                    {
                                        text: 'Cancel'
                                    },
                                    {
                                        text: '<b>OK</b>',
                                        type: 'button-assertive'
                                    }
                                ]
                            });
                        });
                    }
                }
            }
        })

        .controller('AcceptedController', function ($scope, $state, $ionicLoading, $http, $ionicPopup) {
            $scope.getAccepted = function () {
                showLoader($ionicLoading);
                var responsePromise = $http({
                    method: 'POST',
                    url: apiUrl + "merchantBookings",
                    data: $.param({
                        user_id: userInfo.id,
                        status: 1
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                responsePromise.success(function (data, status, headers, config) {
                    hideLoader($ionicLoading);
                    if (data.status) {
                        $scope.appointments = data.data;
                    } else {
                        $scope.appointments = [];
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: data.message,
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    }
                });
                responsePromise.error(function (data, status, headers, config) {
                    hideLoader($ionicLoading);
                    var myPopup = $ionicPopup.show({
                        title: 'Error',
                        scope: $scope,
                        template: "Invalid Request",
                        buttons: [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: '<b>OK</b>',
                                type: 'button-assertive'
                            }
                        ]
                    });
                });
            }
            $scope.getAccepted();

            $scope.$on('processAccepted', function (e) {
                $scope.getAccepted();
            });

            var cronNotification = setInterval(function () {
                getNotifications();
            }, 1000 * 60 * 5);

            $scope.$on('$destroy', function () {
                clearInterval(cronNotification);
            });
        })

        .controller('OngoingController', function ($scope, $state, $ionicLoading, $http, $ionicPopup, $ionicModal) {
            $scope.getOngoing = function () {
                showLoader($ionicLoading);
                var responsePromise = $http({
                    method: 'POST',
                    url: apiUrl + "merchantBookings",
                    data: $.param({
                        user_id: userInfo.id,
                        status: 3
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                responsePromise.success(function (data, status, headers, config) {
                    hideLoader($ionicLoading);
                    if (data.status) {
                        $scope.appointments = data.data;
                    } else {
                        $scope.appointments = [];
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: data.message,
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    }
                });
                responsePromise.error(function (data, status, headers, config) {
                    hideLoader($ionicLoading);
                    var myPopup = $ionicPopup.show({
                        title: 'Error',
                        scope: $scope,
                        template: "Invalid Request",
                        buttons: [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: '<b>OK</b>',
                                type: 'button-assertive'
                            }
                        ]
                    });
                });
            }
            $scope.getOngoing();

            $scope.$on('processOngoing', function (e) {
                $scope.getOngoing();
            });

            $ionicModal.fromTemplateUrl('templates/payment.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.payment = modal;

            });
            $scope.openPayment = function (merchantId, appointmentId) {
                $scope.payment.show();
                $("#merchantId").val(merchantId);
                $("#appointmentId").val(appointmentId);
            };
            $scope.closePayment = function () {
                $scope.payment.hide();
            };

            $scope.submitForm = function (changeForm) {
                if (changeForm.$valid) {
                    showLoader($ionicLoading);
                    var responsePromise = $http({
                        method: 'POST',
                        url: apiUrl + "createInvoice",
                        data: $("#paymentForm").serialize(),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    responsePromise.success(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        if (data.status) {
                            $scope.closePayment();
                            $scope.changeBookingStatus($("#appointmentId").val(), 4);
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: 'Error',
                                scope: $scope,
                                template: data.message,
                                buttons: [
                                    {
                                        text: 'Cancel'
                                    },
                                    {
                                        text: '<b>OK</b>',
                                        type: 'button-assertive'
                                    }
                                ]
                            });
                        }
                    });
                    responsePromise.error(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: "Invalid Request",
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    });
                }
            }
            var cronNotification = setInterval(function () {
                getNotifications();
            }, 1000 * 60 * 5);

            $scope.$on('$destroy', function () {
                clearInterval(cronNotification);
            });
        })

        .controller('CompletedController', function ($scope, $state, $ionicLoading, $http, $ionicPopup) {
            $scope.getCompleted = function () {
                showLoader($ionicLoading);
                var responsePromise = $http({
                    method: 'POST',
                    url: apiUrl + "merchantBookings",
                    data: $.param({
                        user_id: userInfo.id,
                        status: 4
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                responsePromise.success(function (data, status, headers, config) {
                    hideLoader($ionicLoading);
                    if (data.status) {
                        $scope.appointments = data.data;
                    } else {
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: data.message,
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    }
                });
                responsePromise.error(function (data, status, headers, config) {
                    hideLoader($ionicLoading);
                    var myPopup = $ionicPopup.show({
                        title: 'Error',
                        scope: $scope,
                        template: "Invalid Request",
                        buttons: [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: '<b>OK</b>',
                                type: 'button-assertive'
                            }
                        ]
                    });
                });
            }
            $scope.getCompleted();

            $scope.$on('processCompleted', function (e) {
                $scope.getCompleted();
            });

            var cronNotification = setInterval(function () {
                getNotifications();
            }, 1000 * 60 * 5);

            $scope.$on('$destroy', function () {
                clearInterval(cronNotification);
            });
        })

        .controller('ChangePasswordController', function ($scope, $state, $ionicPopup, $ionicLoading, $http) {
            $scope.data = {
                old_password: '',
                new_password: '',
                retype_password: ''
            };
            $scope.submitForm = function (changeForm) {
                if (changeForm.$valid) {
                    if ($scope.data.new_password != $scope.data.retype_password) {
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: 'Both passwords does not match',
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    } else {
                        showLoader($ionicLoading);
                        var responsePromise = $http({
                            method: 'POST',
                            url: apiUrl + "changePassword",
                            data: $("#changeForm").serialize() + "&" + $.param({user_id: userInfo.id}),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        });

                        responsePromise.success(function (data, status, headers, config) {
                            hideLoader($ionicLoading);
                            if (data.status) {
                                var myPopup = $ionicPopup.show({
                                    title: 'Success',
                                    scope: $scope,
                                    template: "Password has been changed",
                                    buttons: [
                                        {
                                            text: 'Cancel'
                                        },
                                        {
                                            text: '<b>OK</b>',
                                            type: 'button-positive'
                                        }
                                    ]
                                });
                            } else {
                                var myPopup = $ionicPopup.show({
                                    title: 'Error',
                                    scope: $scope,
                                    template: data.message,
                                    buttons: [
                                        {
                                            text: 'Cancel'
                                        },
                                        {
                                            text: '<b>OK</b>',
                                            type: 'button-assertive'
                                        }
                                    ]
                                });
                            }
                        });
                        responsePromise.error(function (data, status, headers, config) {
                            hideLoader($ionicLoading);
                            var myPopup = $ionicPopup.show({
                                title: 'Error',
                                scope: $scope,
                                template: "Invalid Request",
                                buttons: [
                                    {
                                        text: 'Cancel'
                                    },
                                    {
                                        text: '<b>OK</b>',
                                        type: 'button-assertive'
                                    }
                                ]
                            });
                        });
                    }
                }
            }
        })


        .controller('StaticPagesController', function ($scope, $state, $stateParams, $ionicLoading, $http, $ionicPopup) {
            showLoader($ionicLoading);
            var responsePromise = $http({
                method: 'POST',
                url: apiUrl + "staticPages",
                data: $.param({id: $stateParams.id}),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            responsePromise.success(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                if (data.status) {
                    $scope.pageDetail = data.data;
                } else {
                    var myPopup = $ionicPopup.show({
                        title: 'Error',
                        scope: $scope,
                        template: 'Page detail can not found',
                        buttons: [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: '<b>OK</b>',
                                type: 'button-assertive'
                            }
                        ]
                    });
                }
            });
            responsePromise.error(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                var myPopup = $ionicPopup.show({
                    title: 'Error',
                    scope: $scope,
                    template: 'Some error occured',
                    buttons: [
                        {
                            text: 'Cancel'
                        },
                        {
                            text: '<b>OK</b>',
                            type: 'button-assertive'
                        }
                    ]
                });
            });
        })



        .controller('ReviewsController', function ($scope, $state, $ionicLoading, $http, $ionicPopup) {
            showLoader($ionicLoading);
            var responsePromise = $http({
                method: 'POST',
                url: apiUrl + "merchantReviews",
                data: $.param({user_id: userInfo.id}),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            responsePromise.success(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                if (data.status) {
                    $scope.reviews = data.data;
                } else {
                    var myPopup = $ionicPopup.show({
                        title: 'Error',
                        scope: $scope,
                        template: data.message,
                        buttons: [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: '<b>OK</b>',
                                type: 'button-assertive'
                            }
                        ]
                    });
                }
            });
            responsePromise.error(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                var myPopup = $ionicPopup.show({
                    title: 'Error',
                    scope: $scope,
                    template: 'Invalid Request',
                    buttons: [
                        {
                            text: 'Cancel'
                        },
                        {
                            text: '<b>OK</b>',
                            type: 'button-assertive'
                        }
                    ]
                });
            });
        })

        .controller('AddReplyController', function ($scope, $state, $ionicLoading, $http, $ionicPopup, $stateParams) {
            $scope.submitForm = function (changeForm) {
                if (changeForm.$valid) {
                    showLoader($ionicLoading);
                    var responsePromise = $http({
                        method: 'POST',
                        url: apiUrl + "saveReply",
                        data: $("#replyForm").serialize() + "&" + $.param({user_id: userInfo.id, review_id: $stateParams.id}),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    responsePromise.success(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        if (data.status) {
                            var myPopup = $ionicPopup.show({
                                title: 'Error',
                                scope: $scope,
                                template: "Reply saved",
                                buttons: [
                                    {
                                        text: 'Cancel'
                                    },
                                    {
                                        text: '<b>OK</b>',
                                        type: 'button-positive'
                                    }
                                ]
                            });
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: 'Error',
                                scope: $scope,
                                template: data.message,
                                buttons: [
                                    {
                                        text: 'Cancel'
                                    },
                                    {
                                        text: '<b>OK</b>',
                                        type: 'button-assertive'
                                    }
                                ]
                            });
                        }
                    });
                    responsePromise.error(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: "Invalid Request",
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    });
                }
            }
        })

        .controller('OtherProfileController', function ($scope, $state, $stateParams, $ionicLoading, $ionicPopup, $http) {
            $scope.Range = function (end) {
                var result = [];
                for (var i = 1; i <= end; i++) {
                    result.push(i);
                }
                return result;
            };

            $scope.makeShare = function (id) {
                showLoader($ionicLoading);
                var responsePromise = $http({
                    method: 'POST',
                    url: apiUrl + "makeReviewShare",
                    data: $.param({user_id: userInfo.id, review_id: id}),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                responsePromise.success(function (data, status, headers, config) {
                    hideLoader($ionicLoading);
                    if (data.status) {
                        $("#reviewShare").text("(" + data.data + ")");
                    } else {
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: data.message,
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    }
                });
                responsePromise.error(function (data, status, headers, config) {
                    hideLoader($ionicLoading);
                    var myPopup = $ionicPopup.show({
                        title: 'Error',
                        scope: $scope,
                        template: "Invalid Request",
                        buttons: [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: '<b>OK</b>',
                                type: 'button-assertive'
                            }
                        ]
                    });
                });
            }

            $scope.makeLike = function (id) {
                showLoader($ionicLoading);
                var responsePromise = $http({
                    method: 'POST',
                    url: apiUrl + "makeReviewLike",
                    data: $.param({user_id: userInfo.id, review_id: id}),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                responsePromise.success(function (data, status, headers, config) {
                    hideLoader($ionicLoading);
                    if (data.status) {
                        $("#reviewLike").text("(" + data.data + ")");
                    } else {
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: data.message,
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    }
                });
                responsePromise.error(function (data, status, headers, config) {
                    hideLoader($ionicLoading);
                    var myPopup = $ionicPopup.show({
                        title: 'Error',
                        scope: $scope,
                        template: "Invalid Request",
                        buttons: [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: '<b>OK</b>',
                                type: 'button-assertive'
                            }
                        ]
                    });
                });
            }

            $scope.makeComment = function (id) {
                var myPopup = $ionicPopup.show({
                    template: '<textarea id="comment"></textarea>',
                    title: 'Enter your comment',
                    subTitle: 'Please use normal text',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancel'},
                        {
                            text: '<b>Save</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                if ($("#comment").val() != '') {
                                    showLoader($ionicLoading);
                                    var responsePromise = $http({
                                        method: 'POST',
                                        url: apiUrl + "makeReviewComment",
                                        data: $.param({user_id: userInfo.id, review_id: id, comment: $("#comment").val()}),
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        }
                                    });

                                    responsePromise.success(function (data, status, headers, config) {
                                        hideLoader($ionicLoading);
                                        if (data.status) {
                                            $("#reviewComment").text("(" + data.data + ")");
                                        } else {
                                            var myPopup = $ionicPopup.show({
                                                title: 'Error',
                                                scope: $scope,
                                                template: data.message,
                                                buttons: [
                                                    {
                                                        text: 'Cancel'
                                                    },
                                                    {
                                                        text: '<b>OK</b>',
                                                        type: 'button-assertive'
                                                    }
                                                ]
                                            });
                                        }
                                    });
                                    responsePromise.error(function (data, status, headers, config) {
                                        hideLoader($ionicLoading);
                                        var myPopup = $ionicPopup.show({
                                            title: 'Error',
                                            scope: $scope,
                                            template: "Invalid Request",
                                            buttons: [
                                                {
                                                    text: 'Cancel'
                                                },
                                                {
                                                    text: '<b>OK</b>',
                                                    type: 'button-assertive'
                                                }
                                            ]
                                        });
                                    });
                                } else {
                                    e.preventDefault();
                                }
                            }
                        }
                    ]
                });
            }

            showLoader($ionicLoading);
            var responsePromise = $http({
                method: 'POST',
                url: apiUrl + "customerProfile",
                data: $.param({user_id: $stateParams.id}),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            responsePromise.success(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                if (data.status) {
                    $scope.userDetail = data.data;
                    $scope.Math = Math;
                } else {
                    var myPopup = $ionicPopup.show({
                        title: 'Error',
                        scope: $scope,
                        template: data.message,
                        buttons: [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: '<b>OK</b>',
                                type: 'button-assertive'
                            }
                        ]
                    });
                }
            });
            responsePromise.error(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                var myPopup = $ionicPopup.show({
                    title: 'Error',
                    scope: $scope,
                    template: "Invalid Request",
                    buttons: [
                        {
                            text: 'Cancel'
                        },
                        {
                            text: '<b>OK</b>',
                            type: 'button-assertive'
                        }
                    ]
                });
            });
        })

        .controller('FeedbackController', function ($scope, $state, $ionicLoading, $http, $ionicPopup) {
            $scope.submitForm = function (changeForm) {
                if (changeForm.$valid) {
                    showLoader($ionicLoading);
                    var responsePromise = $http({
                        method: 'POST',
                        url: apiUrl + "saveFeedback",
                        data: $("#feedbackForm").serialize() + "&" + $.param({user_id: userInfo.id}),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    responsePromise.success(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        if (data.status) {
                            var myPopup = $ionicPopup.show({
                                title: 'Error',
                                scope: $scope,
                                template: "Feedback sent",
                                buttons: [
                                    {
                                        text: 'Cancel'
                                    },
                                    {
                                        text: '<b>OK</b>',
                                        type: 'button-positive',
                                        onTap: function () {
                                            $scope.goToPage('settings');
                                        }
                                    }
                                ]
                            });
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: 'Error',
                                scope: $scope,
                                template: data.message,
                                buttons: [
                                    {
                                        text: 'Cancel'
                                    },
                                    {
                                        text: '<b>OK</b>',
                                        type: 'button-assertive'
                                    }
                                ]
                            });
                        }
                    });
                    responsePromise.error(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: "Invalid Request",
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    });
                }
            }

        })

        .controller('SettingsController', function ($scope, $state, $ionicLoading, $http, $ionicPopup) {
            showLoader($ionicLoading);
            var responsePromise = $http({
                method: 'POST',
                url: apiUrl + "staticPages",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            responsePromise.success(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                if (data.status) {
                    $scope.staticPages = data.data;
                }
            });
            responsePromise.error(function (data, status, headers, config) {
                hideLoader($ionicLoading);
            });

            $scope.goToStaticPage = function (id) {
                $state.go('static-pages', {
                    'id': id
                });
            }
        })

        .controller('AccountsController', function ($scope, $state, $ionicLoading, $http, $ionicPopup) {
            showLoader($ionicLoading);
            var responsePromise = $http({
                method: 'POST',
                url: apiUrl + "getBarberAccounts",
                data: $.param({user_id: userInfo.id}),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            responsePromise.success(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                if (data.status) {
                    $scope.users = data.data;
                }
            });
            responsePromise.error(function (data, status, headers, config) {
                hideLoader($ionicLoading);
            });
        })

        .controller('SetAvailabilityController', function ($scope, $state, $ionicLoading, $http, $ionicPopup) {
            $scope.data = {
                'from': '',
                'to': '',
                'other': ''
            };
            showLoader($ionicLoading);
            var responsePromise = $http({
                method: 'POST',
                url: apiUrl + "merchantProfile",
                data: $.param({user_id: userInfo.id}),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            responsePromise.success(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                if (data.status) {
                    $scope.data.other = data.data.Merchant.other_information;
                    $("#from").val(data.data.Merchant.set_start_time);
                    angular.element($('#from')).triggerHandler('input');
                    $("#to").val(data.data.Merchant.set_end_time);
                    angular.element($('#to')).triggerHandler('input');
                    if (data.data.MerchantWorkingDay.length > 0) {
                        for (var i = 0; i < (data.data.MerchantWorkingDay.length); i++) {
                            $('#days option[value=' + data.data.MerchantWorkingDay[i].day + ']').attr('selected', true);
                        }
                    }

                } else {
                    var myPopup = $ionicPopup.show({
                        title: 'Error',
                        scope: $scope,
                        template: data.message,
                        buttons: [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: '<b>OK</b>',
                                type: 'button-assertive'
                            }
                        ]
                    });
                }
            });
            responsePromise.error(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                var myPopup = $ionicPopup.show({
                    title: 'Error',
                    scope: $scope,
                    template: "Invalid Request",
                    buttons: [
                        {
                            text: 'Cancel'
                        },
                        {
                            text: '<b>OK</b>',
                            type: 'button-assertive'
                        }
                    ]
                });
            });
            $scope.submitForm = function (addForm) {
                if (addForm.$valid) {
                    showLoader($ionicLoading);
                    var responsePromise = $http({
                        method: 'POST',
                        url: apiUrl + "updateMerchantAvailability",
                        data: $("#setAvailabilityForm").serialize() + "&" + $.param({user_id: userInfo.id}),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    responsePromise.success(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        if (data.status) {
                            $scope.goToPage('my-profile');
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: 'Error',
                                scope: $scope,
                                template: data.message,
                                buttons: [
                                    {
                                        text: 'Cancel'
                                    },
                                    {
                                        text: '<b>OK</b>',
                                        type: 'button-assertive'
                                    }
                                ]
                            });
                        }
                    });
                    responsePromise.error(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: "Invalid Request",
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    });
                }
            }
        })

        .controller('AddBarberController', function ($scope, $state, $http, $ionicLoading, $ionicPopup) {
            $scope.data = {
                email: '',
                password: '',
                name: ''
            };
            $scope.submitForm = function (signupForm) {
                if (signupForm.$valid) {
                    showLoader($ionicLoading);
                    var responsePromise = $http({
                        method: 'POST',
                        url: apiUrl + "addBarber",
                        data: $.param({
                            email: $scope.data.email,
                            password: $scope.data.password,
                            name: $scope.data.name,
                            merchant_user_id: userInfo.id
                        }),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    responsePromise.success(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        if (data.status) {
                            $scope.goToPage('manage-accounts');
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: 'Error',
                                scope: $scope,
                                template: data.message,
                                buttons: [
                                    {
                                        text: 'Cancel'
                                    },
                                    {
                                        text: '<b>OK</b>',
                                        type: 'button-assertive'
                                    }
                                ]
                            });
                        }
                    });
                    responsePromise.error(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: "Invalid Request",
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    });
                }
            }
        })


        .controller('BankDetailsController', function ($scope, $state, $http, $ionicLoading, $ionicPopup) {
            $scope.data = {
                bank_name: '',
                bank_ifsc: '',
                bank_branch: '',
                account_holder_name: '',
                account_number: ''
            };

            showLoader($ionicLoading);
            var responsePromise = $http({
                method: 'POST',
                url: apiUrl + "merchantProfile",
                data: $.param({
                    user_id: userInfo.id
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            responsePromise.success(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                if (data.status) {
                    $scope.data.bank_name = data.data.Merchant.bank_name;
                    $scope.data.bank_ifsc = data.data.Merchant.bank_ifsc;
                    $scope.data.bank_branch = data.data.Merchant.bank_branch;
                    $scope.data.account_holder_name = data.data.Merchant.account_holder_name;
                    $scope.data.account_number = data.data.Merchant.account_number;
                } else {
                    var myPopup = $ionicPopup.show({
                        title: 'Error',
                        scope: $scope,
                        template: data.message,
                        buttons: [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: '<b>OK</b>',
                                type: 'button-assertive'
                            }
                        ]
                    });
                }
            });
            responsePromise.error(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                var myPopup = $ionicPopup.show({
                    title: 'Error',
                    scope: $scope,
                    template: "Invalid Request",
                    buttons: [
                        {
                            text: 'Cancel'
                        },
                        {
                            text: '<b>OK</b>',
                            type: 'button-assertive'
                        }
                    ]
                });
            });

            $scope.submitForm = function (signupForm) {
                if (signupForm.$valid) {
                    showLoader($ionicLoading);
                    var responsePromise = $http({
                        method: 'POST',
                        url: apiUrl + "bankDetails",
                        data: $.param({
                            bank_name: $scope.data.bank_name,
                            bank_ifsc: $scope.data.bank_ifsc,
                            bank_branch: $scope.data.bank_branch,
                            account_holder_name: $scope.data.account_holder_name,
                            account_number: $scope.data.account_number,
                            merchant_user_id: userInfo.id
                        }),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    responsePromise.success(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        if (data.status) {
                            $scope.data.bank_name = data.data.Merchant.bank_name;
                            $scope.data.bank_ifsc = data.data.Merchant.bank_ifsc;
                            $scope.data.bank_branch = data.data.Merchant.bank_branch;
                            $scope.data.account_holder_name = data.data.Merchant.account_holder_name;
                            $scope.data.account_number = data.data.Merchant.account_number;
                            var myPopup = $ionicPopup.show({
                                title: 'Success',
                                scope: $scope,
                                template: "Saved successfully",
                                buttons: [
                                    {
                                        text: 'Cancel'
                                    },
                                    {
                                        text: '<b>OK</b>',
                                        type: 'button-positive'
                                    }
                                ]
                            });
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: 'Error',
                                scope: $scope,
                                template: data.message,
                                buttons: [
                                    {
                                        text: 'Cancel'
                                    },
                                    {
                                        text: '<b>OK</b>',
                                        type: 'button-assertive'
                                    }
                                ]
                            });
                        }
                    });
                    responsePromise.error(function (data, status, headers, config) {
                        hideLoader($ionicLoading);
                        var myPopup = $ionicPopup.show({
                            title: 'Error',
                            scope: $scope,
                            template: "Invalid Request",
                            buttons: [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    });
                }
            }
        }
        )

        .controller('NotificationsController', function ($scope, $state, $http, $ionicLoading, $ionicPopup) {
            showLoader($ionicLoading);
            var responsePromise = $http({
                method: 'POST',
                url: apiUrl + "getAllNotifications",
                data: $.param({
                    user_id: userInfo.id
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            responsePromise.success(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                if (data.status) {
                    $scope.notifications = data.data;
                } else {
                    var myPopup = $ionicPopup.show({
                        title: 'Error',
                        scope: $scope,
                        template: data.message,
                        buttons: [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: '<b>OK</b>',
                                type: 'button-assertive'
                            }
                        ]
                    });
                }
            });
            responsePromise.error(function (data, status, headers, config) {
                hideLoader($ionicLoading);
                var myPopup = $ionicPopup.show({
                    title: 'Error',
                    scope: $scope,
                    template: "Invalid Request",
                    buttons: [
                        {
                            text: 'Cancel'
                        },
                        {
                            text: '<b>OK</b>',
                            type: 'button-assertive'
                        }
                    ]
                });
            });
        })
        