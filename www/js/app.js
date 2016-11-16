var apiUrl = 'http://fablysh.esy.es/api/';
var userInfo = {};
angular.module('barber', ['ionic', 'ui.router', 'ngMessages'])

        .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

            $ionicConfigProvider.views.maxCache(0);
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
                url: '/other-profile',
                templateUrl: 'templates/other-profile.html',
                controller: 'OtherProfileController'
            });

            $stateProvider.state('set-availability', {
                url: '/set-availability',
                templateUrl: 'templates/set-availability.html',
                controller: 'SetAvailabilityController'
            });


            $urlRouterProvider.otherwise('/')
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
            ionic.Platform.ready(function () {

            });



            $scope.toggleLeft = function () {
                $ionicSideMenuDelegate.toggleLeft();
            };

            $scope.myGoBack = function () {
                $ionicHistory.goBack();

            };

            $scope.goToPage = function (pageId, params) {
                if (params == undefined) {
                    $state.go(pageId);
                } else {
                    $state.go(pageId, {
                        id: params
                    });
                }
            };


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
                    var changeStatus = "finished";
                } else {
                    var changeStatus = "";
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
                                            $scope.goToPage('dashboard.accepted');
                                        } else if (changeStatus == "started" || changeStatus == "canceled") {
                                            $scope.goToPage('dashboard.ongoing');
                                        } else if (changeStatus == "finished") {
                                            $scope.goToPage('dashboard.completed');
                                        } else {
                                            $scope.goToPage('dashboard.pending');
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

        .controller('OngoingController', function ($scope, $state, $ionicLoading, $http, $ionicPopup) {
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

        .controller('CompletedController', function ($scope, $state, $ionicLoading, $http, $ionicPopup) {
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

        .controller('OtherProfileController', function ($scope, $state) {

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
                    $("#from").val(data.data.Merchant.start_time);
                    angular.element($('#from')).triggerHandler('input');
                    $("#to").val(data.data.Merchant.end_time);
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
        