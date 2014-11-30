'use strict';

/* Filters */

angular.module('myApp.filters', []).


filter('n', [ function() {
  return function(i) {
    return i == 0 ? "" : i;
  };
}]

)

.filter('pos', [ function() {
  return function(i) {

    if (i == 1) return "GK";
    if (i == 2) return "DEF";
    if (i == 3) return "MID";
    if (i == 4) return "FWD";

    return i;
  };
}]
)

.filter('movement', [ function() {
  return function(i) {

    if (i > 0) return "positive";
    if (i < 0) return "negative";

    return "";
  };
}]
)

.filter('status', [ function() {
  return function(i, chance, news) {

    if (i == 'd') {

      if (chance == 25 || chance == 50 || chance == 75) return "doubt" + chance;

       return "doubt";
     }
    if (i == 'u' || news) return "warn";

    return i;
  };
}]

)

.filter('statusText', [ function() {
  return function(i, chance, news) {

    if (i == 'd') {
      if (chance == 25 || chance == 50 || chance == 75) return chance + "%";
      return "d" // doubt;
     }

    if (i == 'i') return "i";
    if (i == 'u' || i == 'n') return "x";

    return i;
  };
}]

).filter('maskBool', [ function() {
  return function(i, trueText, falseText) {

    if (i == true) return trueText;
    if (i == false) return falseText;

    return "";
  };
}]
);
