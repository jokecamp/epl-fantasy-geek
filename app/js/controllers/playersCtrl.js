'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('playersCtrl', ['$scope', 'Data', 'Reports', function($scope, data, reports) {

    var reportFilter = null;

    $scope.reset = function() {
      $scope.sort = {};
      $scope.sort.predicate = '';
      $scope.sort.orders = ['-pinned'];

      $scope.columns = [];
      $scope.search = { };
      $scope.search.position = "ALL";
      $scope.search.minMinutes = 0;
      reportFilter = null;
    };

    $scope.searchFilter = function(p) {

      if (p.pinned) return true;

      if (reportFilter) return reportFilter(p) && formFilter(p);

      return formFilter(p);
    };

    $scope.clearPins = function() {
      _.each($scope.players, function(p) {
        p.pinned = false;
      });
    };

    $scope.highlight = function(col) {
      if (!$scope.sort) return '';
      if (!$scope.sort.orders) return '';

      if (_.chain($scope.sort.orders).map(function(c) { return c.replace('-', '').replace('-', '');}).contains(col).value())
        return 'highlight';

      return '';
    };

    $scope.sortByColumn = function(col) {

      if ($scope.sort.predicate == col) col = '-' + col;

      if (col.indexOf('--') > -1) col = col.substring(2, col.length);

      $scope.sort.predicate = col;
      $scope.sort.orders = $.merge(['-pinned'], [col]);

      $scope.columns = ['-pinned'];
      $scope.columns[col] = "highlight";
    };

    $scope.reports = reports;

    $scope.loadReport = function(report) {

      $scope.reset();

      reportFilter = function(p) {
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

    data.getMeta().then(function(resp) {
        $scope.lastUpdated = resp.date;
    });

    data.getJson().then(function(resp) {

      $scope.teams = data.teams(resp);
      $scope.roster = data.roster(resp);
      //$scope.stat = data.stats(resp);
      $scope.allPlayers = data.players(resp);

      $scope.columns = ['web_name', 'team'];

      data.getCleanData($scope.allPlayers, $scope.teams).then(function(items) {
        $scope.players = items;
        //console.log(JSON.stringify($scope.players));
      });



      $scope.reset();
    });

    var formFilter = function(player) {

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
