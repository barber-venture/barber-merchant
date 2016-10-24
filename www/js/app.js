angular.module('barber', ['ionic', 'ui.router', 'ngMessages'])

        .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

            $ionicConfigProvider.views.maxCache(0);
            $ionicConfigProvider.scrolling.jsScrolling(false);
            $ionicConfigProvider.tabs.position('bottom');
            $ionicConfigProvider.views.transition('none');
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


            $stateProvider.state('dashboard.dash', {
                url: '/dash',
                views: {
                    'dashboard-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashboardController'
                    }
                }
            })

            $stateProvider.state('dashboard.add', {
                url: '/add',
                views: {
                    'dashboard-add': {
                        templateUrl: 'templates/tab-add.html',
                        controller: 'AddController'
                    }
                }
            })

            $stateProvider.state('dashboard.feeds', {
                url: '/feeds',
                views: {
                    'dashboard-feeds': {
                        templateUrl: 'templates/tab-feeds.html',
                        controller: 'FeedsController'
                    }
                }
            })

            $stateProvider.state('dashboard.account', {
                url: '/account',
                views: {
                    'dashboard-account': {
                        templateUrl: 'templates/tab-account.html'
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

            $stateProvider.state('my-bookings', {
                url: '/my-bookings',
                templateUrl: 'templates/my-bookings.html',
                controller: 'MyBookingsController'
            });

            $stateProvider.state('recent-viewed-saloons', {
                url: '/recent-viewed-saloons',
                templateUrl: 'templates/recent-viewed-saloons.html',
                controller: 'RecentViewedSaloonsController'
            });

            $stateProvider.state('find-friends', {
                url: '/find-friends',
                templateUrl: 'templates/find-friends.html',
                controller: 'FindFriendsController'
            });

            $stateProvider.state('settings', {
                url: '/settings',
                templateUrl: 'templates/settings.html'
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
                url: '/static-pages',
                templateUrl: 'templates/static-pages.html',
                controller: 'StaticPagesController'
            });

            $stateProvider.state('saloon-detail', {
                url: '/saloon-detail',
                templateUrl: 'templates/saloon-detail.html',
                controller: 'SaloonDetailController'
            });

            $stateProvider.state('reviews', {
                url: '/reviews',
                templateUrl: 'templates/reviews.html',
                controller: 'ReviewsController'
            });

            $urlRouterProvider.otherwise('/')
        })

        
        .controller('AppCtrl', function ($state, $scope, $ionicHistory, $ionicSideMenuDelegate, $ionicPopup, $ionicPlatform) {
            ionic.Platform.ready(function () {
                // then override any default you want
                window.plugins.nativepagetransitions.globalOptions.duration = 500;
                window.plugins.nativepagetransitions.globalOptions.iosdelay = 350;
                window.plugins.nativepagetransitions.globalOptions.androiddelay = 350;
                window.plugins.nativepagetransitions.globalOptions.winphonedelay = 350;
                window.plugins.nativepagetransitions.globalOptions.slowdownfactor = 4;
                // these are used for slide left/right only currently
                window.plugins.nativepagetransitions.globalOptions.fixedPixelsTop = 0;
                window.plugins.nativepagetransitions.globalOptions.fixedPixelsBottom = 0;


            });



            $scope.toggleLeft = function () {
                $ionicSideMenuDelegate.toggleLeft();
            };

            $scope.myGoBack = function () {
                $ionicHistory.goBack();
                window.plugins.nativepagetransitions.slide(
                        {"direction": "right"},
                        function (msg) {
                            //alert("success: " + msg)
                        }, // called when the animation has finished
                        function (msg) {
                            //alert("error: " + msg)
                        } // called in case you pass in weird values
                );
            };

            $scope.goToPage = function (pageId) {
                $state.go(pageId);
                window.plugins.nativepagetransitions.slide(
                        {"direction": "left"},
                        function (msg) {
                            //alert("success: " + msg)
                        }, // called when the animation has finished
                        function (msg) {
                            //alert("error: " + msg)
                        } // called in case you pass in weird values
                );
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

        .controller('LoginController', function ($scope, $state) {
            $scope.submitForm = function (loginForm) {
                if (loginForm.$valid) {
                    //var newEmail = $scope.data.email;
                    $scope.goToPage('dashboard.dash');
                }
            }
        })

        .controller('LogoutController', function ($scope, $state) {
            $scope.goToPage('home');
        })

        .controller('SignUpController', function ($scope, $state) {
            $scope.submitForm = function (signupForm) {
                if (signupForm.$valid) {
                    //var newEmail = $scope.data.email;
                    $scope.goToPage('dashboard.dash');
                }
            }
        })

        .controller('ForgetController', function ($scope, $state) {
            $scope.submitForm = function (forgetForm) {
                if (forgetForm.$valid) {
                    var newEmail = $scope.data.email;

                }
            }
        })

        .controller('DashboardController', function ($scope, $state, $ionicModal) {
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
        })

        .controller('AddController', function ($scope, $state) {
            $scope.submitForm = function (addForm) {
                if (addForm.$valid) {
                    var newEmail = $scope.data.email;

                }
            }
        })

        .controller('MyProfileController', function ($scope, $state) {

        })

        .controller('EditProfileController', function ($scope, $state) {

        })

        .controller('MyBookingsController', function ($scope, $state) {

        })

        .controller('RecentViewedSaloonsController', function ($scope, $state) {

        })

        .controller('FindFriendsController', function ($scope, $state) {

        })

        .controller('ChangePasswordController', function ($scope, $state) {

        })

        .controller('FeedbackController', function ($scope, $state) {

        })

        .controller('StaticPagesController', function ($scope, $state) {

        })

        .controller('SaloonDetailController', function ($scope, $state) {

        })

        .controller('ReviewsController', function ($scope, $state) {

        })

        