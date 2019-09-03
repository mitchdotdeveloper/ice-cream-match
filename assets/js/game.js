class Game {
  constructor () {
    this.deck = new Deck();
    this.currentAttempts = 0;
    this.currentMatches = 0;
    this.totalMatches = 6;
    this.currentLevel = 0;
    this.levelAttemptProgression = [11, 8];
    this.gameStats = {
      attempts: 0,
      matches: 0,
      accuracy: 0,
      toString: function () {
        return 'Attempts: ' + this.attempts +
          '<br>Matches: ' + this.matches +
          '<br>Accuracy: ' + this.accuracy;
      }
    };
    this.eventHandlers = this.eventHandlers.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.restart = this.restart.bind(this);

    this.eventHandlers();
    this.deck.constructDeck();
  }

  showStartScreen () {
    $('body').addClass('overflow-y');
    $('.title, .stats').addClass('home');
    $('.stats').addClass('flex-center');
    $('.start').removeClass('hidden');
    $('.leftSide, .rightSide, .card-container').addClass('hidden');

    setTimeout(function () {
      $('body').removeClass('overflow-y');
    }, 500);
  }
  hideStartScreen () {
    $('body').addClass('overflow-y');
    $('.title, .stats').removeClass('home');
    $('.stats').removeClass('flex-center');
    $('.start').addClass('hidden');
    $('.leftSide, .rightSide, .card-container').removeClass('hidden');

    setTimeout(function () {
      $('body').removeClass('overflow-y');
    }, 500);
  }

  levelTransition () {
    $('body').addClass('overflow-y');
    $('.card-container').addClass('hidden');
    $('.stats').addClass('slide');
    $('.title').addClass('slide enlarge-text');

    this.deck.constructDeck();

    setTimeout(function () {
      $('.title').removeClass('slide enlarge-text');
      $('.stats').removeClass('slide');
      $('.card-container').removeClass('hidden');
      setTimeout(function () {
        $('body').removeClass('overflow-y');
      }, 750);
    }, 750);
  }

  eventHandlers () {
    $('.start').on('click', this.handleStartClick);
    $('.modal button').on('click', this.restart);
  }

  handleStartClick () {
    $('.stats').find('.attempts').text('Attempts: ' + this.currentAttempts);
    this.hideStartScreen();
  }

  restart() {
    this.deck = new Deck();
    this.currentAttempts = null;
    this.currentMatches = null;
    this.currentLevel = 0;
    this.gameStats.attempts = 0;
    this.gameStats.matches = 0;
    this.gameStats.accuracy = 0;

    this.deck.constructDeck();
    this.showStartScreen();
  }

}
