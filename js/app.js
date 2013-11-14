var myApp = angular.module('brackets-creator', []);

myApp.controller('tournamentOrganizer', function($scope, $http) {

  $http.get('js/data.json').success(function(data) {
    $scope.rounds = data;

    $scope.byes= [];

    $scope.byes.push(findByes($scope.rounds));

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
        return i;
      }
    }
  }

  function byeToNextRound(byes, rounds) {
    for(var i = 0; i < byes.length; i++) {
      if(rounds[0].matches[byes[i]].player_1) {

        //ainda tenho que calcular para aonde, exatamente, mandar o jogador

        rounds[1].matches[byes[i]].player_1 = rounds[0].matches[byes[i]].player_1;
      }
    }
  }

  $scope.getConnectorsNumber = function(parentIndex) {
    var number = $scope.rounds[0].matches.length / 2;
    return new Array(number);
  }
});
