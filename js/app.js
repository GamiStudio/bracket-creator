var myApp = angular.module('brackets-creator', []);

myApp.controller('tournamentOrganizer', function($scope, $http) {

  $http.get('js/data.json').success(getData);

  function getData(data) {
    $scope.rounds = data;

    $scope.initRoundNumber = $scope.rounds.length;
    $scope.firstRoundMatchesNum = $scope.rounds[0].matches.length;
    $scope.playerNumber = $scope.firstRoundMatchesNum * 2;
    $scope.totalRoundsNumber = Math.log($scope.playerNumber) / Math.log(2);

    for (var i = 0; i < totalRoundsNumber - initRoundNumber; i++) {
      $scope.rounds.push(null);
    }

    console.log($scope.rounds);
  }
});