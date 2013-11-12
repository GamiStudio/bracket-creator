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

        if (round.matches.length == 1) {
          roundElm.append(Bracket.buildGroup(round, 1));

          var m1 = round.matches.shift();
        };

        while(round.matches.length >= 2) {
          roundElm.append(Bracket.buildGroup(round, 2));

          var m1 = round.matches.shift();
          var m2 = round.matches.shift();
        };
        count++;
        $('.container').append(roundElm);
      });
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
      match.append(Bracket.buildPlayer(data.player_1));
      match.append(Bracket.buildPlayer(data.player_2));
      Bracket.matchesList.push(match);
      return match;
    },
    buildPlayer: function(data) {
      var playerElm = $(Bracket.playerHtml)
      var nameElm = $(Bracket.nameHtml);
      var scoreElm = $(Bracket.scoreHtml);
      nameElm.text(data.name);
      scoreElm.text('0');
      playerElm.append(nameElm);
      playerElm.append(scoreElm);
      return playerElm;
    }
  };
})()


var rounds = [{
  "matches": [{
    "id": null,
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
    "id": null,
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
      "id": null,
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
      "id": null,
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
    "id": null,
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
    "id": null,
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
    "id": null,
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
}]

Bracket.setup(rounds);
