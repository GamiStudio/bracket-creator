var myApp = angular.module('brackets-creator', []);

myApp.controller('tournamentOrganizer', function($scope, $http) {

  $http.get('js/data.json').success(getData);

  function getData(data) {
    $scope.rounds = data;

    $scope.byes= [];

    $scope.byes.push(findByes($scope));

    byeToNextRound($scope);
  }

  $scope.hidePlayer1 = function(parentIndex, index) {
    if(!$scope.rounds[parentIndex].matches[index].player_1) {
      return true;
    }
    else return false;
  };

  $scope.hidePlayer2 = function(parentIndex, index) {
    if(!$scope.rounds[parentIndex].matches[index].player_2) {
      return true;
    }
    else return false;
  };

  $scope.byeClass = function(parentIndex, index) {

    if(!$scope.rounds[parentIndex].matches[index].player_2 || !$scope.rounds[parentIndex].matches[index].player_1) {
      return 'match-container bye';
    }
    else return 'match-container';
  };

  function findByes($scope) {
    for(var i = 0; i < $scope.rounds[0].matches.length; i++) {
      if(!$scope.rounds[0].matches[i].player_2 || !$scope.rounds[0].matches[i].player_1) {
        return i;
      }
    }
  }

  function byeToNextRound($scope) {
    for(var i = 0; i < $scope.byes.length; i++) {
      if($scope.rounds[0].matches[$scope.byes[i]].player_1) {

        //ainda tenho que calcular para aonde, exatamente, mandar o jogador

        $scope.rounds[1].matches[$scope.byes[i]].player_1 = $scope.rounds[0].matches[$scope.byes[i]].player_1;
      }
    }
  }

  $scope.getConnectorsNumber = function(parentIndex) {
    var number = $scope.rounds[0].matches.length / 2;
    return new Array(number);
  }
});