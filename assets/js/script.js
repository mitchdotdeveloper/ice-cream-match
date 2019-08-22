$(document).ready(initializeApp);

var cardImages = ['assets/images/chocolate-scoop.png', 'assets/images/mint-scoop.png',
                  'assets/images/pistachio-coil.png', 'assets/images/pistachio-scoop.png',
                  'assets/images/strawberry-coil.png', 'assets/images/vanilla-coil-caramel.png'];
var cards = [];
var attempts = 0;
var totalMatches = 6;
var matches = 0;

function initializeApp () {
  $('.stats').find('.attempts').text('Attempts: ' + attempts);

  constructDeck();
  eventHandlers();
}

function eventHandlers () {
  $('.card').on('click', cardClicked);
  $('.win-modal button').on('click', restart);
}

function cardClicked () {
  var card = $(event.currentTarget);

  if (card.hasClass('flipped') ||
      card.hasClass('match')   ||
      cards.length === 2) {
    return;
  }''

  card.addClass('flip-card flipped');
  cards.push(card);

  if (cards.length === 2) {
    $('.stats').find('.attempts').text('Attempts: ' + (++attempts));
    if (checkMatch(cards[0], cards[1])) {
      $(cards[0]).removeClass('flipped');
      $(cards[0]).addClass('match');
      $(cards[1]).removeClass('flipped');
      $(cards[1]).addClass('match');

      ++matches;
      $('.circle:nth-child(' + matches + ')').addClass('circle-fill');

      cards = [];
      if (matches === totalMatches) {
        setTimeout(function(){
          $('.win-modal').removeClass('hidden');
        }, 500);
      }
    } else {
      setTimeout(function () {
        $(cards[0]).removeClass('flip-card flipped');
        $(cards[1]).removeClass('flip-card flipped');

        cards = [];
      }, 1000);
    }
  }
}

function shuffle(array) {
  for (var index = array.length - 1; index > 0; index--) {
    var randomIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  }
}

function constructDeck () {
  var deck = cardImages.concat(cardImages);
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

function restart () {
  matches = 0;
  attempts = 0;
  $('.win-modal').addClass('hidden');
  $('.stats').find('.attempts').text('Attempts: ' + attempts);
  $('.circle').removeClass('circle-fill');
  $('.card-container').empty();

  constructDeck();
  eventHandlers();
}
