'use strict';

angular.module('myApp.services', [])
    .factory('Data', ['$http', '$filter', '$log', function($http, $filter, $log) {


        var getCleanData = function(items, teams) {

            return getTwitterJson().then(function(handles) {
                return cleanData(items, teams, handles);
            });

        };

        var cleanData = function(items, teams, handles) {

            var players = _.map(items, function(p) {

                if (p == null) p = {};

                // custom data
                if (p.team > 0) {
                    p.team = _.find(teams, function(t) {
                        return t.id === p.team;
                    });
                }

                p.position = $filter('pos')(p.element_type);

                if (p.element_type === 1) p.posn = 'K';
                if (p.element_type == 2) p.posn = 'D';
                if (p.element_type == 3) p.posn = 'M';
                if (p.element_type == 4) p.posn = 'F';

                p.selected_by_percent = parseFloat(p.selected_by_percent);
                p.points_per_cost = p.total_points / (p.now_cost / 10);
                p.transfer_diff = p.transfers_in_event - p.transfers_out_event;
                p.pinned = false;


                p.name = p.first_name + ' ' + p.second_name;

                var handle = _.find(handles, function(h) {
                    return h.id == p.id || ((p.first_name + ' ' + p.second_name) == h.name);
                });
                if (handle != null) {
                    handle.id = p.id;
                    p.twitter = handle.twitter;
                }

                return p;

            });

            return _.where(players, function(p) {
                return p.id > 0;
            });
        };

        var getTeams = function(data) {
            return data.teams;
        };

        var getRoster = function(data) {
            return data.elements;
        };

        var getStatColumns = function(data) {
            return data.elStat;
        };

        var getPlayers = function(data) {
            return data.elements;
        };

        var getJson = function() {
            return $http.get('js/static-data.json').then(function(res) {
                return res.data;
            });
        };

        var getTwitterJson = function() {
            return $http.get('js/twitter.json').then(function(res) {
                return res.data;
            });
        };


        var getLeagueTable = function() {
            return $http.get('js/table.json').then(function(res) {
                return res.data;
            });
        };

        var getFixtures = function() {
            // http://api.football-data.org/alpha/teams/66/fixtures
            return $http.get('js/fixtures.json').then(function(res) {
                return res.data;
            });
        };

        var getMeta = function() {
            // http://api.football-data.org/alpha/teams/66/fixtures
            return $http.get('js/meta.json').then(function(res) {
                return res.data;
            });
        };

        return {
            getMeta: getMeta,
            getJson: getJson,
            getCleanData: getCleanData,
            players: getPlayers,
            teams: getTeams,
            getLeagueTable: getLeagueTable,
            roster: getRoster,
            stats: getStatColumns,
            twitter: function() {
                return handles;
            },
            getTeams: getTeams,
            getFixtures: getFixtures
        };

    }]);
