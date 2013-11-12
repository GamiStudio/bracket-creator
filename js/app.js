// var myApp = angular.module('bababa', []);

(function() {
  window.Bracket = {
    roundHtml: '<div class="round"></div>',
    groupHtml: '<div class="group"></div>',
    matchesHtml: '<div class="matches"></div>',
    matchHtml: '<div class="match"></div>',
    playerHtml: '<div class="player"></div>',
    nameHtml: '<span class="name"></span>',
    scoreHtml: '<span class="score"></span>',
    linesHtml: '<div class="lines"><div class="corner"></div><div class="connector"></div></div>',
    matchesList: [],
    setup: function(params) {
      var bracket;

      var numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];
      var count = 1;
      var roundsTemp = $.extend({}, rounds);

      _.forEach(roundsTemp, function(round) {
        var roundElm = $(Bracket.roundHtml);
        roundElm.addClass(numbers[count]);
        var m1, m2;

        if (round.matches.length == 1) {
          roundElm.append(Bracket.buildGroup(round, 1));

          m1 = round.matches.shift();
          m2 = null;
        }

        while(round.matches.length >= 2) {
          roundElm.append(Bracket.buildGroup(round, 2));

          m1 = round.matches.shift();
          m2 = round.matches.shift();
        }

        count++;
        $('.container').append(roundElm);
      });

      Bracket.defineClicks();
    },
    buildGroup: function(round, matchesNumber) {
      var groupElm = $(Bracket.groupHtml);
      groupElm.append(Bracket.buildMatches(round, matchesNumber));
      groupElm.append(Bracket.linesHtml);
      return groupElm;
    },
    buildMatches: function(round, matchesNumber) {
      var matchesElm = $(Bracket.matchesHtml);

      if(matchesNumber != 1) {
        matchesElm.append(Bracket.buildMatch(round.matches[0]));
        matchesElm.append(Bracket.buildMatch(round.matches[1]));
      }

      else if (matchesNumber == 1) {
        matchesElm.append(Bracket.buildMatch(round.matches[0]));
      }

      return matchesElm;
    },
    buildMatch: function(data) {
      var match = $(Bracket.matchHtml);
      match.attr('data-index', data.id);
      match.append(Bracket.buildPlayer(data.player_1));
      match.append(Bracket.buildPlayer(data.player_2));
      Bracket.matchesList.push(match);
      return match;
    },
    buildPlayer: function(data) {
      var playerElm = $(Bracket.playerHtml);
      var nameElm = $(Bracket.nameHtml);
      var scoreElm = $(Bracket.scoreHtml);
      nameElm.text(data.name);
      scoreElm.text('0');
      playerElm.append(nameElm);
      playerElm.append(scoreElm);
      return playerElm;
    },
    defineClicks: function() {
      $('.container').on('click', '.match', function(event) {
        $('.popup-container').toggle();
        var matchIndex = $(this).data('index');
        var names = _.map($(this).find('.player .name'), function(elem) {
          return $(elem).text();
        });
        Bracket.copyInfoToPopup(matchIndex, names);
      });

      $('.popup').click(function(event) {
        event.stopPropagation();
      });

      $('.popup-container').click(function(event) {
        $('.popup-container').toggle();
      });

      $('form').submit(function(event) {
        event.preventDefault();
        Bracket.copyPopupInfoToMatch();
        $('.popup-container').toggle();
      });
    },
    copyInfoToPopup: function(id, playerNames) {
      $('form input[type=hidden]').val(id);
      $('.player-one .player-name').text(playerNames[0]);
      $('.player-two .player-name').text(playerNames[1]);
    },
    copyPopupInfoToMatch: function() {
      var inputInfo = _.map($('.popup input'), function(elem) {
        return $(elem).val();
      });
    }
  };
})();


var rounds = [{
  "matches": [{
    "id": 1,
    "player_1": {
      "id": 1,
      "name": "Jan-Ove Waldner",
      "points": 99,
      "club": "sweden"
    },
    "player_2": {
      "id": 8,
      "name": "Chuen Chi Chuan",
      "points": 22,
      "club": "china taipey"
    }
  }, {
    "id": 2,
    "player_1": {
      "id": 2,
      "name": "Werner Schlager",
      "points": 88,
      "club": "austria"
    },
    "player_2": {
      "id": 7,
      "name": "Jun Mizutani",
      "points": 33,
      "club": "japan"
    }
  }, {
      "id": 3,
      "player_1": {
        "id": 3,
        "name": "Ma Long",
        "points": 77,
        "club": "china"
      },
      "player_2": {
        "id": 6,
        "name": "Ma Lin",
        "points": 44,
        "club": "china"
      }
  }, {
      "id": 4,
      "player_1": {
        "id": 4,
        "name": "Timo Boll",
        "points": 66,
        "club": "germany"
      },
      "player_2": {
        "id": 5,
        "name": "Xu Xin",
        "points": 55,
        "club": "china"
      }
  }]
},{
  "matches": [{
    "id": 5,
    "player_1": {
      "id": 1,
      "name": "Jan-Ove Waldner",
      "points": 99,
      "club": "sweden"
    },
    "player_2": {
      "id": 8,
      "name": "Chuen Chi Chuan",
      "points": 22,
      "club": "china taipey"
    }
  }, {
    "id": 6,
    "player_1": {
      "id": 2,
      "name": "Werner Schlager",
      "points": 88,
      "club": "austria"
    },
    "player_2": {
      "id": 7,
      "name": "Jun Mizutani",
      "points": 33,
      "club": "japan"
    }
  }]
},{
  "matches": [{
    "id": 7,
    "player_1": {
      "id": 1,
      "name": "Jan-Ove Waldner",
      "points": 99,
      "club": "sweden"
    },
    "player_2": {
      "id": 8,
      "name": "Chuen Chi Chuan",
      "points": 22,
      "club": "china taipey"
    }
  }]
}];

Bracket.setup(rounds);
