'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/all', {templateUrl: 'partials/raw.html', controller: 'rawDataCtrl'});
  $routeProvider.when('/players', {templateUrl: 'partials/players.html', controller: 'playersCtrl'});
  $routeProvider.otherwise({redirectTo: '/players'});
}]);
