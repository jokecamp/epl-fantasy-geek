
angular.module('myApp.services', [])
.factory('Data', ['$http', '$filter', function ($http, $filter) {


    var getCleanData = function(items, teams, stat) {

      return getTwitterJson().then(function(handles) {
        return cleanData(items, teams, stat, handles)
      });

    };

    var cleanData = function(items, teams, stat, handles) {

      var players = _.map(items, function(p) {
        if (p == null) p = {};

        var x = {};
        angular.extend(x, stat);

        _.forOwn(x, function(value, key) {
          x[key] = p[value];
        });

        // custom data
        if (x.team_id > 0) {
          x.team = _.find(teams, function(t) { return t.id == x.team_id; });
        }
        x.position = $filter('pos')(x.element_type_id);

        if (x.position == 'GK') x.posn = 'K';
        if (x.position == 'FWD') x.posn = 'F';
        if (x.position == 'MID') x.posn = 'M';
        if (x.position == 'DEF') x.posn = 'D';

        x.transfer_diff = x.transfers_in_event - x.transfers_out_event;
        x.pinned = false;

        var handle = _.find(handles, function(h) {
          return h.id == x.id || ((x.first_name + ' ' + x.second_name) == h.name);
        });
        if (handle != null){
          handle.id = x.id;
          x.twitter = handle.twitter;
        }

        return x;

      });

      return _.where(players, function (p) { return p.id > 0; } );
    };

    var getTeams = function(data) {

      var teams = [];
      for(var i = 1; i <= 20; i++) {
        teams.push( data.eiwteams[i]);
      }

      return teams;
    };

    var getRoster = function(data) {
      return data.elements;
    };

    var getStatColumns = function(data) {
      return data.elStat;
    };

    var getPlayers = function(data) {
      return data.elInfo;
    };

    var getJson = function(){
      return $http.get('js/data.json').then(function(res){
        return res.data;
      });
    };

    var getTwitterJson = function(){
      return $http.get('js/twitter.json').then(function(res){
        return res.data;
      });
    };


    return {
      getJson: getJson,
      getCleanData: getCleanData,
      players: getPlayers,
      teams: getTeams,
      roster: getRoster,
      stats: getStatColumns,
      twitter: function() { return handles; }
    };

}]);
