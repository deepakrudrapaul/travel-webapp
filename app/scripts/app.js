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
    '720kb.socialshare'
  ])
  .config(['$routeProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider', '$authProvider', function ($routeProvider, $urlRouterProvider, $stateProvider, $locationProvider, $authProvider) {

    // $locationProvider.html5Mode(true);
    $authProvider.baseUrl = null;
    $authProvider.facebook({
      clientId: '1872872876259517',
      responseType: 'token'
    });


    $authProvider.google({
      clientId: '1074764438873-k221gusckcgqaalhqnsqn891kjoigcas.apps.googleusercontent.com',
      responseType: 'token'
    });

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
      })
      .state('signUp', {
        url: '/signUp',
        templateUrl: 'views/signUp.html',
        controller: 'LoginCtrl',
      })
      .state('account', {
        url: '/account',
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl'
      })
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
      .state('travel-plan', {
        url: '/travel-plan',
        templateUrl: 'views/travel-plan.html',
        controller: 'TravelPlanCtrl'
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

  }])
  .run(function ($rootScope, $location, auth, $anchorScroll) {

    $rootScope.changeLocation = function (path) {
      $rootScope.$evalAsync(function () {
        $location.path(path);
      });
    };

    $rootScope.$on("$locationChangeSuccess", function () {
      $anchorScroll();
    });

  });
