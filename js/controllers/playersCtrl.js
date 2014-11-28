'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('playersCtrl', ['$scope', 'Data', 'Reports', function($scope, data, reports) {

    $scope.reset = function() {
      $scope.sort = {};
      $scope.sort.reverse = false;
      $scope.sort.predicate = '';
      $scope.sort.orders = ['-pinned'];
      $scope.search = { };
      $scope.search.position = "ALL";
      $scope.search.minMinutes = 0;
      $scope.searchFilter = formFilter;
    };

    $scope.clearPins = function() {
      _.each($scope.players, function(p) {
        p.pinned = false;
      });
    };

    $scope.sortByColumn = function(col) {

      console.log($scope.sort);
      if ($scope.sort.predicate == col)
        $scope.sort.reverse = !$scope.sort.reverse;

      $scope.sort.predicate = col;

      if ($scope.sort.reverse)
        $scope.sort.orders = ['-' + col];
      else
        $scope.sort.orders = [col];

        $scope.columns = [];
        $scope.columns[col] = "highlight";
    };

    $scope.reports = reports;

    $scope.loadReport = function(report) {

      $scope.reset();
      $scope.searchFilter = function(p) {
        if (p.pinned) return true;
        return report.func(p);
      };

      if (report.sort != undefined) {

        $scope.sort.orders = $.merge(['-pinned'], report.sort);

        $scope.columns = [];
        _.forEach(report.sort, function(c) {
          c = c.replace('-', '');
          $scope.columns[c] = "highlight";  });
      }
    };

    data.getJson().then(function(resp) {

      $scope.teams = data.teams(resp);
      $scope.roster = data.roster(resp);
      $scope.stat = data.stats(resp);
      $scope.allPlayers = data.players(resp);

      $scope.columns = ['web_name', 'team'];

      data.getCleanData($scope.allPlayers, $scope.teams, $scope.stat).then(function(items) {
        $scope.players = items;
      });

      // console.log(JSON.stringify(data.twitter()));

      $scope.reset();
    });

    var formFilter = function(player) {

        if (player.pinned) return true;

        // alias
        var s = $scope.search;

        var name = s.web_name == undefined || player.web_name.toUpperCase().indexOf(s.web_name.toUpperCase()) > -1;
        var team = s.team == undefined  || player.team.short_name.indexOf(s.team.short_name.toUpperCase()) > -1;
        var minutes = s.minMinutes == undefined || s.minMinutes < 0 || (player.minutes >= s.minMinutes);

        var position = s.position == "ALL" ? '' : s.position.toUpperCase();
        var posn = position == '' || position == player.position;

        return name && team && minutes && posn;
    };

  }]);
