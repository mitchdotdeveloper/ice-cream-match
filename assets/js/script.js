$(document).ready(initializeApp);

var cardImages = ['assets/images/chocolate-scoop.png', 'assets/images/mint-scoop.png',
                  'assets/images/pistachio-coil.png', 'assets/images/pistachio-scoop.png',
                  'assets/images/strawberry-coil.png', 'assets/images/vanilla-coil-caramel.png'];
var cards = [];
var attempts = 0;
var totalMatches = 6;
var cardMatches = 0;
var attemptProgression = [11, 6];
var currentLevel = 0;

function initializeApp () {
  $('.stats').find('.attempts').text('Attempts: ' + attempts);

  constructDeck();
  eventHandlers();
}

function eventHandlers () {
  $('.card').on('click', cardClicked);
  $('.win-modal button').on('click', function(){
    restart();
    // if (currentLevel < 2) {
    //   goToNextLevel();
    // } else {
    //   currentLevel = 0;
    // }
  });
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

    // if (currentLevel) {
    //   if (attempts === attemptProgression[currentLevel - 1] &&
    //     !(cardMatches === totalMatches)) {
    //     alert('you lose');
    //     currentLevel = 0;
    //     restart();
    //   }
    // }

    checkWin();

    // if (checkMatch(cards[0], cards[1])) {
    //   $(cards[0]).removeClass('flipped');
    //   $(cards[0]).addClass('match');
    //   $(cards[1]).removeClass('flipped');
    //   $(cards[1]).addClass('match');

    //   $('.circle:nth-child(' + (++cardMatches) + ')').addClass('circle-fill');

    //   cards = [];

    //   // setTimeout(function(){
    //   //   if (currentLevel) {
    //   //     if (attempts === attemptProgression[currentLevel - 1] &&
    //   //       !(cardMatches === totalMatches)) {
    //   //       alert('you lose match');
    //   //       currentLevel = 0;
    //   //       restart();
    //   //     }
    //   //   }
    //   // }, 750);

    //   if (cardMatches === totalMatches) {
    //     goToNextLevel();
    //     setTimeout(function(){
    //       $('.win-modal').removeClass('hidden');
    //     }, 500);
    //   }
    // } else {
    //   setTimeout(function(){
    //     if (currentLevel) {
    //       if (attempts === attemptProgression[currentLevel - 1] &&
    //         !(cardMatches === totalMatches)) {
    //         alert('you lose match');
    //         currentLevel = 0;
    //         restart();
    //       }
    //     }
    //   }, 750);

    //   setTimeout(function () {
    //     $(cards[0]).removeClass('flip-card flipped');
    //     $(cards[1]).removeClass('flip-card flipped');

    //     cards = [];
    //   }, 1000);
    // }
  }
}
function goToNextLevel(){
  if(currentLevel === attemptProgression.length){
    alert('that is the end')
  }
  currentLevel++;
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
  cardMatches = 0;
  attempts = 0;
  $('.win-modal').addClass('hidden');
  $('.stats').find('.attempts').text('Attempts: ' + attempts);
  $('.circle').removeClass('circle-fill');
  $('.card-container').empty();

  constructDeck();
  eventHandlers();
}

function checkWin () {
  if (checkMatch(cards[0], cards[1])) {
    $(cards[0]).removeClass('flipped');
    $(cards[0]).addClass('match');
    $(cards[1]).removeClass('flipped');
    $(cards[1]).addClass('match');

    $('.circle:nth-child(' + (++cardMatches) + ')').addClass('circle-fill');

    cards = [];

    setTimeout(function(){
      if (currentLevel) {
        if (attempts === attemptProgression[currentLevel - 1] &&
          !(cardMatches === totalMatches)) {
          alert('you lose match');
          currentLevel = 0;
          restart();
        }
      }
    }, 750);

    if (cardMatches === totalMatches) {
      goToNextLevel();
      setTimeout(function () {
        $('.win-modal').removeClass('hidden');
      }, 500);
    }
  } else {
    setTimeout(function () {
      if (currentLevel) {
        if (attempts === attemptProgression[currentLevel - 1] &&
          !(cardMatches === totalMatches)) {
          alert('you lose match');
          currentLevel = 0;
          restart();
        }
      }
    }, 750);

    setTimeout(function () {
      $(cards[0]).removeClass('flip-card flipped');
      $(cards[1]).removeClass('flip-card flipped');

      cards = [];
    }, 1000);
  }
}
