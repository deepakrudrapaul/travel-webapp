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
    'ngProgress',
  ])
  .config(['$routeProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider', function ($routeProvider, $urlRouterProvider, $stateProvider, $locationProvider, socialProvider) {


    // $locationProvider.html5Mode(true);

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

      .state('wander-info', {
        url: '/wander-info',
        templateUrl: 'views/wander-info.html',
        controller: 'WanderInfoCtrl'
      })
      .state('blog', {
        url: '/blog',
        abstract: true,
        template:"<ui-view></ui-view>"
      })
      .state('blog.list', {
        url: '/list',
        templateUrl: 'views/blog-list.html',
        controller: 'BlogCtrl'
      })
      .state('blog.detail', {
        url: '/detail',
        templateUrl: 'views/blog-detail.html',
        controller: 'BlogCtrl'
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
      .state('wander-cap', {
        url: '/wander-cap',
        templateUrl: 'views/wander-cap.html',
        controller: 'WanderCapCtrl'
      })
      .state('partner', {
        url: '/partner',
        templateUrl: 'views/partner.html',
        controller: 'ContactCtrl'
      })

  }])
  .run(function ($rootScope, $location, auth) {

    $rootScope.changeLocation = function (path) {
      $rootScope.$evalAsync(function () {
        $location.path(path);
      });
    };


  });
