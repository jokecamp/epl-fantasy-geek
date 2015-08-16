'use strict';

/* Controllers */

angular.module('myApp.controllers')
  .controller('teamsCtrl', ['$scope', 'Data', function($scope, data) {

    data.getLeagueTable().then(function(d) {
      $scope.league = d;

      data.getFixtures().then(function(items) {
        $scope.fixtures = items.fixtures;

        _.each($scope.fixtures, function(f) {

          // has not played yet
          f.desc = f.homeTeamName + " vs " + f.awayTeamName;
          if (f.result.goalsHomeTeam == -1 && f.result.goalsAwayTeam == -1) {
            f.upcoming = true;
            return;
          }

          if (f.result.goalsHomeTeam == f.result.goalsAwayTeam) {
            f.home = { result: 'draw'};
            f.away = { result: 'draw'};
          }

          if (f.result.goalsHomeTeam > f.result.goalsAwayTeam) {
            f.home = { result: 'win'};
            f.away = { result: 'loss'};
          }

          if (f.result.goalsHomeTeam < f.result.goalsAwayTeam) {
            f.home = { result: 'loss'};
            f.away = { result: 'win'};
          }

          f.desc = f.homeTeamName + " " + f.result.goalsHomeTeam + " - " + f.result.goalsAwayTeam + " " + f.awayTeamName;

        });

        _.each($scope.league.standing, function(t) {

          t.fixtures = _.where($scope.fixtures, function(f) {
            return (f.homeTeamName == t.teamName) || (f.awayTeamName == t.teamName)
          });


        });

      });

    });

  }]);
