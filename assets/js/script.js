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
var attemptProgression = [11, 7];
var currentLevel = 0;

function initializeApp () {
  $('.stats').find('.attempts').text('Attempts: ' + attempts);

  constructDeck();
  eventHandlers();
}

function eventHandlers () {
  $('.card').on('click', cardClicked);
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
    cards = [];

    setTimeout(checkLoss(), 750);
    if (cardMatches === totalMatches) {
      $('.circle:nth-child(' + (currentLevel+1) + ')').addClass('circle-fill');
      goToNextLevel();
      showModal();
    }

  } else {
      setTimeout(checkLoss(), 750);
      setTimeout(function () {
        $(cards[0]).removeClass('flip-card flipped');
        $(cards[1]).removeClass('flip-card flipped');
        cards = [];
      }, 500);
  }
}

function checkLoss () {
  if (currentLevel) {
    if (attempts === attemptProgression[currentLevel - 1] &&
      !(cardMatches === totalMatches)) {
      currentLevel = 0;
      $('.modal-message').text('You Lose!!!');
      showModal();
    }
  }
}

function goToNextLevel() {
  if (currentLevel === attemptProgression.length) {
    $('.modal-message').text('Woah! You Won!!!');
    currentLevel = 0;
  } else {
    ++currentLevel;
  }
}

function showModal() {
  setTimeout(function () {
    $('.modal, .modal-overlay').removeClass('hidden');

  }, 500);
}

function restart() {
  cardMatches = 0;
  attempts = 0;

  $('.modal-message').text('Sweet!!!');
  $('.modal, .modal-overlay').addClass('hidden');
  $('.stats').find('.attempts').text('Attempts: ' + attempts);

  if (currentLevel - 1 === -1) {
    $('.circle').removeClass('circle-fill');
  }
  $('.card-container').empty();

  levelTransition();
}

function levelTransition () {
  $('body').addClass('overflow-y');
  $('.card-container').addClass('slide-hide');
  $('.stats').addClass('slide');
  $('.title').addClass('slide enlarge-text');

  constructDeck();
  eventHandlers();

  setTimeout(function () {
    $('.title').removeClass('slide enlarge-text');
    $('.stats').removeClass('slide');
    $('.card-container').removeClass('slide-hide');

    setTimeout(function () {
      $('body').removeClass('overflow-y');
    }, 750);
  }, 750);
}
