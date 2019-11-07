class Game {
  constructor () {
    this.eventHandlers = this.eventHandlers.bind(this);
    this.gameHandler = this.gameHandler.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.restart = this.restart.bind(this);
    this.levelTransition = this.levelTransition.bind(this);
    this.transitionHandler = this.transitionHandler.bind(this);

    this.deck = new Deck(this.gameHandler);
    this.currentAttempts = 0;
    this.currentMatches = 0;
    this.totalMatches = 6;
    this.currentLevel = 0;
    this.levelAttemptProgression = [11, 8];
    this.needsRestart = false;
    this.gameStats = {
      attempts: 0,
      matches: 0,
      toString: () => {
        return 'Attempts: ' + this.gameStats.attempts +
          '<br>Matches: ' + this.gameStats.matches +
          '<br>Accuracy: ' + (this.gameStats.matches / this.gameStats.attempts * 100).toFixed(2) + '%';
      }
    };

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
    $('.circle:nth-child(1)').addClass('circle-fill');
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

    setTimeout(() => {
      $('.circle:nth-child(' + (this.currentLevel + 1) + ')').addClass('circle-fill');
      $('.title').removeClass('slide enlarge-text');
      $('.stats').removeClass('slide');
      $('.card-container').removeClass('hidden');
      setTimeout(function () {
        $('body').removeClass('overflow-y');
      }, 750);
    }, 750);
  }

  transitionHandler () {
    $('.modal, .modal-overlay').addClass('hidden');
    $('.stats').find('.attempts').text('Attempts: ' + 0);
    $('.card-container').empty();

    if ( this.needsRestart ) {
      $('.circle').removeClass('circle-fill');
      this.restart();
    } else {
      this.currentAttempts = 0;
      this.currentMatches = 0;
      this.levelTransition();
    }
  }

  eventHandlers () {
    $('.start').on('click', this.handleStartClick);
    $('.modal button').on('click', this.transitionHandler);
  }

  handleStartClick () {
    $('.stats').find('.attempts').text('Attempts: ' + this.currentAttempts);
    this.hideStartScreen();
  }

  didPassLevel () {
    if ( !this.currentLevel && this.currentMatches === this.totalMatches ) {
      return true;
    }
    return ( this.currentLevel &&
             this.currentMatches === this.totalMatches &&
             this.currentAttempts <= this.levelAttemptProgression[this.currentLevel-1] );
  }

  gameHandler (madeMatch) {
    $('.stats').find('.attempts').text('Attempts: ' + (++this.currentAttempts));
    ++this.gameStats.attempts;
    if ( madeMatch ) {
      ++this.currentMatches;
      ++this.gameStats.matches;
      if (this.didPassLevel()) {
        if (this.currentLevel === 2) {
          this.needsRestart = true;
          this.showStats("Woah, you actually won!!!");
        } else {
          ++this.currentLevel;
          this.showModal("Sweet! On to level " + (this.currentLevel + 1) + "!!!");
        }
      }

      if (this.currentLevel) {
        if (this.currentAttempts === this.levelAttemptProgression[this.currentLevel-1]) {
          this.needsRestart = true;
          this.showStats("Bummer! You lost!!!");
        }
      }

    } else {
      if (this.currentAttempts === this.levelAttemptProgression[this.currentLevel-1]) {
        this.needsRestart = true;
        this.showStats("Bummer! You lost!!!");
      }
    }

  }

  showModal(message) {
    setTimeout(function () {
      $('.modal-message').text(message);
      $('.modal, .modal-overlay').removeClass('hidden');
    }, 500);
  }

  showStats(message) {
    this.showModal(message);
    setTimeout(() => {
      $('.modal-message').addClass('result-message');
      $('.modal-message').html(this.gameStats.toString());
    }, 1500);
  }

  restart() {
    this.deck = new Deck(this.gameHandler);
    this.currentAttempts = 0;
    this.currentMatches = 0;
    this.currentLevel = 0;
    this.gameStats.attempts = 0;
    this.gameStats.matches = 0;
    this.gameStats.accuracy = 0;
    this.needsRestart = false;

    this.deck.constructDeck();
    this.showStartScreen();
  }

}
