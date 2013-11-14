/*

0
  0
1
    0
2
  1
3

4
  2
5
    1
6
  3
7


armazenar ByeTo
for para achar bye
  se bye[x] for par
    byeTo = bye[x]/2
    joga para p1
  se bye[x] for impar
    byeTo = (bye[x] - 1)/2
    joga para p2
*/




var myApp = angular.module('brackets-creator', []);

myApp.controller('tournamentOrganizer', function($scope, $http) {

  $http.get('js/data.json').success(function(data) {
    $scope.rounds = data;

    $scope.byes= [];

    findByes($scope.rounds);

    console.log($scope.byes);

    byeToNextRound($scope.byes, $scope.rounds);
  });

  $scope.isBye = function(matches, index) {
    if(!matches[index].player_2 || !matches[index].player_1) {
      return 'bye';
    };
  };

  function findByes(rounds) {
    for(var i = 0; i < rounds[0].matches.length; i++) {
      if(!rounds[0].matches[i].player_2 || !rounds[0].matches[i].player_1) {
        $scope.byes.push(i);
      }
    }
  }

  function byeToNextRound(byes, rounds) {

    // var byeTo;

    // console.log(byes.length);

    for(var i = 0; i < (byes.length); i++) {

      if(byes[i] % 2 == 0) {
        var byeTo = byes[i] / 2;
        if(rounds[0].matches[byes[i]].player_1) {
          rounds[1].matches[byeTo].player_1 = rounds[0].matches[byes[i]].player_1;
        }
        else if(rounds[0].matches[byes[i]].player_2) {
          rounds[1].matches[byeTo].player_1 = rounds[0].matches[byes[i]].player_2;
        }
      }
      else if(byes[i] % 2 == 1) {
        byeTo = (byes[i] - 1) / 2;
        if(rounds[0].matches[byes[i]].player_1) {
          rounds[1].matches[byeTo].player_2 = rounds[0].matches[byes[i]].player_1;
        }
        else if(rounds[0].matches[byes[i]].player_2) {
          rounds[1].matches[byeTo].player_2 = rounds[0].matches[byes[i]].player_2;
        }
      }
    }
  }

  $scope.getConnectorsNumber = function(parentIndex) {
    var number = $scope.rounds[0].matches.length / 2;
    return new Array(number);
  }
});
