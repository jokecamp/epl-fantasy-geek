'use strict';

/* Controllers */

angular.module('myApp.controllers')
  .controller('playersCtrl', ['$scope', 'Data', 'Reports', function($scope, data, reports) {

    $scope.reset = function() {
      $scope.sort = {};
      $scope.sort.reverse = false;
      $scope.sort.predicate = '';
      $scope.search = { };
      $scope.search.position = "ALL";
      $scope.search.minMinutes = 0;
      $scope.searchFilter = formFilter;
    };

    $scope.reset();

    $scope.sortByColumn = function(col) {

      console.log($scope.sort);
      if ($scope.sort.predicate == col)
        $scope.sort.reverse = !$scope.sort.reverse;

      $scope.sort.predicate = col;

      if ($scope.sort.reverse)
        $scope.sort.orders = ['-' + col];
      else
        $scope.sort.orders = [col];
    };

    $scope.reports = reports;

    $scope.loadReport = function(report) {
      console.log(report);
      $scope.searchFilter = report.func;
      if (report.sort != undefined) $scope.sort.orders = report.sort;
    };

    data.getJson().then(function(resp) {

      $scope.teams = data.teams(resp);
      $scope.roster = data.roster(resp);
      $scope.stat = data.stats(resp);
      $scope.allPlayers = data.players(resp);

      $scope.columns = ['web_name', 'team'];
      $scope.players = data.cleanData($scope.allPlayers, $scope.teams, $scope.stat);

    });

    var formFilter = function(player) {

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
