
angular.module('myApp.services', [])
.factory('Data', ['$http', '$filter', function ($http, $filter) {

    var cleanData = function(items, teams, stat) {

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
        x.transfer_diff = x.transfers_in_event - x.transfers_out_event;

        x.pinned = false;
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

    return {
      getJson: getJson,
      cleanData: cleanData,
      players: getPlayers,
      teams: getTeams,
      roster: getRoster,
      stats: getStatColumns
    };

}]);
