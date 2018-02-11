'use strict';

/**
 * @ngdoc overview
 * @name wanderwagon-webapp
 * @description
 * # wanderwagon-webapp
 *
 * Main module of the application.
 */
angular
  .module('wanderwagon-webapp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'ngCsv',
    'ui.router',
    'config',
    'ae-datetimepicker',
    'ngMap',
    'sticky',
    'duScroll',
    'vAccordion',
    'satellizer',
    '720kb.socialshare',
    'angular-owl-carousel-2',
    'ng.picturefill',
    'hm.readmore'
  ])
  .config(['$routeProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider', '$authProvider', function ($routeProvider, $urlRouterProvider, $stateProvider, $locationProvider, $authProvider) {

    // $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('');

    $authProvider.baseUrl = '/';

    $authProvider.facebook({
      clientId: '1758555154405794',
      responseType: 'token',
      redirectUri : window.location.origin + '/home'
    });


    $authProvider.google({
      clientId: '1074764438873-k221gusckcgqaalhqnsqn891kjoigcas.apps.googleusercontent.com',
      responseType: 'token',
      redirectUri : window.location.origin + '/home'
    });

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .state('signUp', {
        url: '/signUp',
        templateUrl: 'views/signUp.html',
        controller: 'LoginCtrl',
      })
      // .state('user-profile', {
      //   url: '/user-profile',
      //   templateUrl: 'views/account.html',
      //   controller: 'AccountCtrl'
      // })
      .state('plan-trip', {
        url: '/plan-trip',
        templateUrl: 'views/plan-trip.html',
        controller: 'PlanTripCtrl'
      })

      .state('destination', {
        url: '/destination',
        abstract: true,
        template: "<ui-view></ui-view>"
      })
      .state('destination.list', {
        url: '/list',
        templateUrl: 'views/destination.html',
        controller: 'DestinationCtrl'
      })
      .state('destination.detail', {
        url: '/list/:id',
        templateUrl: 'views/destination-detail.html',
        controller: 'DestinationDetailCtrl'
      })
      .state('blog', {
        url: '/blog',
        abstract: true,
        template: "<ui-view></ui-view>"
      })
      .state('blog.list', {
        url: '/list',
        templateUrl: 'views/blog-list.html',
        controller: 'BlogListCtrl'
      })
      .state('blog.detail', {
        url: '/list/:postId',
        templateUrl: 'views/blog-detail.html',
        controller: 'BlogDetailCtrl'
      })
      .state('travel-plan', {
        url: '/travel-plan',
        abstract: true,
        template: "<ui-view></ui-view>"
      })
      .state('travel-plan.list', {
        url: '',
        templateUrl: 'views/travel-plan.html',
        controller: 'TravelPlanCtrl'
      })
      .state('travel-plan.detail', {
        url: '/:id',
        templateUrl: 'views/travel-plan-detail.html',
        controller: 'TravelPlanDetailCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .state('form', {
        url: '/contact/plan-trip-form',
        templateUrl: 'views/plan-trip-form.html',
        controller: 'ContactCtrl'
      })
      .state('cancellation', {
        url: '/cancellation',
        templateUrl: 'views/cancellation-policy.html',
        controller: 'ContactCtrl'
      })
      .state('faq', {
        url: '/faq',
        templateUrl: 'views/faq.html',
        controller: 'ContactCtrl'
      })
      .state('tnc', {
        url: '/tnc',
        templateUrl: 'views/tnc.html',
        controller: 'ContactCtrl'
      })
      .state('testimonials', {
        url: '/testimonials',
        templateUrl: 'views/testimonials.html',
        controller: 'ContactCtrl'
      })
      .state('emailVerify', {
        url: '/emailVerify',
        templateUrl: 'views/email-verification.html',
        controller: 'EmailVerificationCtrl'
      })
      .state('changePassword', {
        url: '/changePassword',
        templateUrl: 'views/change-password.html',
        controller: 'ChangePasswordCtrl'
      })
      .state('privacy-policy', {
        url: '/privacy-policy',
        templateUrl: 'views/privacy-policy.html',
        controller: 'ContactCtrl'
      })
      .state('payment', {
        url: '/payment',
        templateUrl: 'views/payment.html',
        controller: 'PaymentCtrl'
      })
      .state('valentine', {
        url: '/event/1/:eventSlug',
        templateUrl: 'views/valentine.html',
        controller: 'EventCtrl'
      })
      .state('holi', {
        url: '/event/2/:eventSlug',
        templateUrl: 'views/holi.html',
        controller: 'EventCtrl'
      });

  }])
  .run(function ($rootScope, $location, $window, auth, $anchorScroll) {

    $rootScope.changeLocation = function (path) {
      $rootScope.$evalAsync(function () {
        $location.path(path);
      });
    };

    $rootScope.$on("$locationChangeSuccess", function () {
      $window.ga('send', 'pageview', $location.path());
      $anchorScroll();
    });

  });