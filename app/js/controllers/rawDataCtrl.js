'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('rawDataCtrl', ['$scope', '$http', 'Data', function($scope, $http, data) {

    data.getJson().then(function(resp) {

      $scope.teams = data.teams(resp);
      $scope.roster = data.roster(resp);
      $scope.stat = data.stats(resp);
      $scope.allPlayers = data.players(resp);

      $scope.columns = Object.keys($scope.stat);
      $scope.players = data.cleanData($scope.allPlayers, $scope.teams, $scope.stat);

    });

  }]);
