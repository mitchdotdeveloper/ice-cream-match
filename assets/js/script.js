$(document).ready(initializeApp);

var cardImages = ['assets/images/chocolate-coil-chocolatechips.png', 'assets/images/chocolate-scoop-sprinkles.png',
                  'assets/images/chocolate-scoop.png', 'assets/images/coffee-coil-chocolate.png',
                  'assets/images/coffee-coil.png', 'assets/images/mint-coil-chocolatechips.png',
                  'assets/images/mint-scoop.png', 'assets/images/pistachio-coil.png',
                  'assets/images/pistachio-scoop.png', 'assets/images/strawberry-coil-strawberry.png',
                  'assets/images/strawberry-coil.png', 'assets/images/strawberry-scoop-chocolatechips.png',
                  'assets/images/vanilla-coil-caramel.png', 'assets/images/vanilla-coil-chocolate.png'];

var cards = [];
var attempts = 0;
var totalMatches = 6;
var cardMatches = 0;
var attemptProgression = [11, 8];
var currentLevel = 0;
var gameStats = {
  attempts: 0,
  matches: 0,
  accuracy: 0,
  toString: function() {
    return 'Attempts: ' + this.attempts +
           '<br>Matches: ' + this.matches +
           '<br>Accuracy: ' + this.accuracy;
  }
};

var levelMessage = 'Sweet! On to level ';
var winMessage = 'Woah! You actually won!!!';
var loseMessage = 'Bummer! You lost!!!';

function initializeApp () {
  startScreen();

  $('.stats').find('.attempts').text('Attempts: ' + attempts);
  $('.modal-message').text(levelMessage + (currentLevel + 1) + '!!!');

  constructDeck();
  eventHandlers();
}

function startScreen () {
  $('body').addClass('overflow-y');
  $('.title, .stats').toggleClass('home');
  $('.stats').toggleClass('flex-center');
  $('.start, .leftSide, .rightSide, .card-container').toggleClass('hidden');

  setTimeout(function(){
    $('body').removeClass('overflow-y');
  }, 500);
}

function eventHandlers () {
  $('.card').on('click', cardClicked);
  $('.start').on('click', startScreen);
  $('.modal button').on('click', restart);
}

function cardClicked () {
  var card = $(event.currentTarget);

  if (card.hasClass('flipped') ||
      card.hasClass('match')   ||
      cards.length === 2) {
    return;
  }

  card.addClass('flip-card flipped');
  cards.push(card);

  if (cards.length === 2) {
    $('.stats').find('.attempts').text('Attempts: ' + (++attempts));
    ++gameStats.attempts;
    checkWin();
  }
}

function shuffle(array) {
  for (var index = array.length - 1; index > 0; index--) {
    var randomIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  }
}

function constructDeck () {
  var deck = cardImages;

  shuffle(deck);

  deck = deck.slice(8);
  deck = deck.concat(deck);
  shuffle(deck);
  deck.forEach(constructCards);
}

function constructCards(cardSrc) {
  var card = $('<div>').addClass('card');
  var cardBack = $('<div>').addClass('card-back');
  var backImg = $('<img>').attr('src', 'assets/images/cardback.png');
  var cardFace = $('<div>').addClass('card-face');
  var faceImg = $('<img>').attr('src', cardSrc);

  cardBack.append(backImg);
  cardFace.append(faceImg);

  card.append(cardBack, cardFace);
  $('.card-container').append(card);
}

function checkMatch (card1, card2) {
  card1 = $(card1)[0].childNodes[1].childNodes[0];
  card1 = $(card1).attr('src');
  card2 = $(card2)[0].childNodes[1].childNodes[0];
  card2 = $(card2).attr('src');

  return card1 === card2;
}

function checkWin () {
  if (checkMatch(cards[0], cards[1])) {
    $(cards[0]).removeClass('flipped');
    $(cards[0]).addClass('match');
    $(cards[1]).removeClass('flipped');
    $(cards[1]).addClass('match');

    ++cardMatches;
    ++gameStats.matches;
    cards = [];

    setTimeout(checkResult, 500);
    if (cardMatches === totalMatches) {
      $('.circle:nth-child(' + (currentLevel + 1) + ')').addClass('circle-fill');
      goToNextLevel();
    }
  } else {
    setTimeout(checkResult, 500);
    setTimeout(function(){
      $(cards[0]).removeClass('flip-card flipped');
      $(cards[1]).removeClass('flip-card flipped');
      cards = [];
    }, 500);
  }

  gameStats.accuracy = (gameStats.matches / gameStats.attempts * 100).toFixed(2) + '%';
}

function checkResult () {
  if (currentLevel) {
    if (attempts === attemptProgression[currentLevel - 1] &&
      !(cardMatches === totalMatches)) {
      currentLevel = 0;
      showStats(loseMessage);
    }
  }
}

function goToNextLevel() {
  if (currentLevel === attemptProgression.length) {
    currentLevel = 0;
    showStats(winMessage);
  } else {
    ++currentLevel;
    showModal(levelMessage + (currentLevel + 1) + '!!!');
  }
}

function showModal(message) {
  setTimeout(function () {
    $('.modal-message').text(message);
    $('.modal, .modal-overlay').removeClass('hidden');
  }, 500);
}

function showStats(message) {
  showModal(message);
  setTimeout(function () {
    $('.modal-message').addClass('result-message');
    $('.modal-message').html(gameStats.toString());
  }, 1500);
}

function restart() {
  cardMatches = 0;
  attempts = 0;

  $('.modal, .modal-overlay').addClass('hidden');
  $('.stats').find('.attempts').text('Attempts: ' + attempts);

  $('.card-container').empty();

  if (currentLevel - 1 === -1) {
    $('.circle').removeClass('circle-fill');
    gameStats.attempts = 0;
    gameStats.matches = 0;
    gameStats.accuracy = 0;
  }
  levelTransition();
}

function levelTransition () {
  $('body').addClass('overflow-y');
  $('.card-container').addClass('hidden');
  $('.stats').addClass('slide');
  $('.title').addClass('slide enlarge-text');

  constructDeck();
  eventHandlers();

  setTimeout(function () {
    $('.title').removeClass('slide enlarge-text');
    $('.stats').removeClass('slide');
    $('.card-container').removeClass('hidden');
    setTimeout(function () {
      $('body').removeClass('overflow-y');
    }, 750);
  }, 750);
}
