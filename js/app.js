var myApp = angular.module('brackets-creator', []);

myApp.controller('tournamentOrganizer', function($scope, $http) {

  $http.get('js/data.json').success(getData);

  function getData(data) {
    $scope.rounds = data;
  }

  $scope.hidePlayer1 = function(parentIndex, index) {
    console.log(parentIndex);
    if(!$scope.rounds[parentIndex].matches[index].player_1) {
      return true;
    }
    else return false;
  };

  $scope.hidePlayer2 = function(parentIndex, index) {
    console.log(parentIndex);
    if(!$scope.rounds[parentIndex].matches[index].player_2) {
      return true;
    }
    else return false;
  };
  // $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
  //   var roundsNumber = $scope.rounds.length;
  //   var matchesArray = $('.match-container');

  //   console.log('working');

  //   for (var j = 0; j < $scope.rounds[0].length; j++) {
  //     if (!scope.rounds[0].matches[j].player_1) {
  //       matchesArray[j].remove('.one');
  //       matchesArray[j].find('.player').removeClasse('.two').addClass('one');
  //     }
  //     else if (!scope.rounds[0].matches[j].player_2) {
  //       matchesArray[j].remove('.two');
  //     }
  //   }
  // });
});