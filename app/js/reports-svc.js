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


  var reports = [
      { name: "Unavailable", func: unavailable },
      { name: "Injured", func: injured },
      { name: "Loans", func: loaned },
      { name: "Transfered", func: transfers },
      { name: "Dream Team", func: dreamTeam },
      { name: "Bad Boys", func: badBoys, sort: { predicate: "red_cards", reverse: true} },
  ];


  return reports;
}]);
