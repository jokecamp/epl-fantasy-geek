'use strict';

/* Controllers */

angular.module('myApp.controllers')
  .controller('playersCtrl', ['$scope', 'Data', function($scope, data) {

    $scope.reset = function() {
      $scope.reverse = false;
      $scope.predicate = '';
      $scope.search = { };
      $scope.search.position = "ALL";
      $scope.search.minMinutes = 0;
    };

    $scope.reset();

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
        var team = s.team == undefined  || player.team.indexOf(s.team.short_name.toUpperCase()) > -1;
        var minutes = s.minMinutes == undefined || s.minMinutes < 0 || (player.minutes >= s.minMinutes);

        var position = s.position == "ALL" ? '' : s.position.toUpperCase();
        var posn = position == '' || position == player.position;

        return name && team && minutes && posn;
    };

  }]);
