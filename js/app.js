var myApp = angular.module('brackets-creator', []);

myApp.controller('tournamentOrganizer', function($scope, $http) {
  $http.get('js/data.json').success(function(data) {
    $scope.rounds = data;

    $scope.byes= [];

    findByes($scope.rounds);

    byeToNextRound($scope.byes, $scope.rounds);
  });

  var getScore = function(result) {
    var total = [0,0];

    if(result) {
      for(var i = 0; i < result.length; i++) {
        if(result[i][0] > result[i][1]) {
          total[0]++;
        } else total[1]++;
      }
      return total;
    };
  };

  $scope.isNotBye = function(player) {
    return ['bye', 'waited'].indexOf(player.type) === -1;
  };

  $scope.printScore = function(player, result) {
    total = getScore(result);
    if(total) {
      return total[player];
    }
    return null;
  };

  $scope.isBye = function(match, index) {
    return [match.player_1.type, match.player_2.type].indexOf('bye') === 1;
  };

  function findByes(rounds) {
    for(var i = 0; i < rounds[0].matches.length; i++) {
      if(!rounds[0].matches[i].player_2 || !rounds[0].matches[i].player_1) {
        $scope.byes.push(i);
      };
    };
  };

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
