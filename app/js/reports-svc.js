angular.module('myApp.services')
.factory('Reports', [function () {


  var unavailable = function(player) {
    return player.status != 'a';
  };

  var injured = function(player) {
    return player.status == 'i' || player.status == 'd' || player.news.indexOf('injury') > -1;
  };


  var loaned = function(p) {
    return p.news.indexOf('loan') > -1;
  };

  var transfers = function(p) {
    return p.status == 'u' && p.news.indexOf("loan") == -1;
  };

  var dreamTeam = function(p) {
    return p.in_dreamteam || p.dreamteam_count > 0;
  };

  var badBoys = function(p) {
    return p.yellow_cards > 0 || p.red_cards > 0;
  };

  var keepersWhoPlay = function(p) {
    return p.position == "GK" && p.minutes > 0;
  };

  var attackingDefenders = function(p) {
    return p.position == "DEF"  && (p.goals_scored > 0 || p.assists > 0);
  };

  var lastWeekDreamTeam = function(p) {
    return p.in_dreamteam;
  };

  var cheapWhoPlay = function(p) {
    return p.minutes >= 1;
  };

  var reports = [
      { name: "Unavailable", func: unavailable, sort: ['team'] },
      { name: "Injured", func: injured, sort: ['team'] },
      { name: "Loans", func: loaned, sort: ['team'] },
      { name: "Transfered", func: transfers, sort: ['team'] },
      { name: "Dream Team", func: dreamTeam, sort: ['-dreamteam_count'] },
      { name: "Bad Boys", func: badBoys, sort: ['-red_cards', '-yellow_cards'] },
      { name: "Keepers", func: keepersWhoPlay, sort: ['now_cost', '-total_points'] },
      { name: "Attacking Defenders", func: attackingDefenders, sort: ['-goals_scored', '-assists'] },
      { name: "Last Week's Dream Team", func: lastWeekDreamTeam, sort: ['position'] },
      { name: "Cheapest players with minutes", func: cheapWhoPlay, sort: ['now_cost', '-minutes'] },
  ];


  return reports;
}]);
