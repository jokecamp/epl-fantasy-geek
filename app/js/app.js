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
  $routeProvider.when('/players', {templateUrl: 'partials/players.html', controller: 'playersCtrl'});
  $routeProvider.when('/teams', {templateUrl: 'partials/teams.html', controller: 'teamsCtrl'});
  $routeProvider.otherwise({redirectTo: '/players'});
}]);
