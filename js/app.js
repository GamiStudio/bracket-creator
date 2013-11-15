var myApp = angular.module('brackets-creator', []);

myApp.controller('tournamentOrganizer', function($scope, $http) {

  $http.get('js/data.json').success(function(data) {
    $scope.rounds = data;

    $scope.byes= [];

    findByes($scope.rounds);

    byeToNextRound($scope.byes, $scope.rounds);
  });

  $scope.getScore = function(result) {
    var total = [0,0];

    if(result) {
      for(var i = 0; i < result.length; i++) {
        if(result[i][0] > result[i][1]) {
          total[0]++;
        } else total[1]++;
      }
      return total;
    }
  };

  $scope.printScore = function(player, result) {
    total = $scope.getScore(result);
    if(total) {
      return total[player];
    }

    return null;
  };

  $scope.isBye = function(matches, index) {
    if(!matches[index].player_2 || !matches[index].player_1) {
      return 'bye';
    }
  };

  function findByes(rounds) {
    for(var i = 0; i < rounds[0].matches.length; i++) {
      if(!rounds[0].matches[i].player_2 || !rounds[0].matches[i].player_1) {
        $scope.byes.push(i);
      }
    }
  }

  function byeToNextRound(byes, rounds) {

    var byeTo;

    for(var i = 0; i < (byes.length); i++) {

      if(byes[i] % 2 === 0) {
        byeTo = byes[i] / 2;
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

  $scope.getConnectorsNumber = function(thisRoundLength) {
    console.log(thisRoundLength);
    var number = thisRoundLength / 2;
    if(number >= 1) {
      return new Array(2);
    }
    else return 0;
  };
});
