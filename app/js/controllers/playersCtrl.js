'use strict';

/* Controllers */

angular.module('myApp.controllers')
  .controller('playersCtrl', ['$scope', 'Data', function($scope, data) {

    $scope.reverse = false;
    $scope.predicate = '';
    $scope.search = { };
    $scope.search.minMinutes = 1;

    $scope.sort = function(col) {

      if ($scope.predicate == col)
        $scope.reverse = !$scope.reverse;
      else
        $scope.predicate = col;
    };

    data.getJson().then(function(resp) {

      $scope.teams = data.teams(resp);
      $scope.roster = data.roster(resp);
      $scope.stat = data.stats(resp);
      $scope.allPlayers = data.players(resp);

      $scope.columns = ['web_name', 'team'];
      $scope.players = data.cleanData($scope.allPlayers, $scope.teams, $scope.stat);

    });

    $scope.searchFilter = function(player) {

        // alias
        var s = $scope.search;

        var name = s.web_name == undefined || player.web_name.toUpperCase().indexOf(s.web_name.toUpperCase()) > -1;
        var team = s.team == undefined || player.team.indexOf(s.team.toUpperCase()) > -1;
        var minutes = s.minMinutes == undefined || s.minMinutes < 0 || (player.minutes >= s.minMinutes);
        var posn = s.position == undefined || s.position == '' || s.position.toUpperCase() == player.position.toUpperCase();

        return name && team && minutes && posn;
    };

  }]);
