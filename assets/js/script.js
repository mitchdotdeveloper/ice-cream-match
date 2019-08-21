var cards = ['assets/images/chocolate-scoop.png', 'assets/images/mint-scoop.png',
             'assets/images/pistachio-coil.png', 'assets/images/pistachio-scoop.png',
             'assets/images/strawberry-coil.png', 'assets/images/vanilla-coil-caramel.png'];

$(document).ready(initializeApp);

function initializeApp () {
  var deck = cards.concat(cards);
  shuffle(deck);
  deck.forEach(constructCards);


  // Event handlers
  $('.card').on('click', function () {
    $(event.currentTarget).addClass('flip-card flipped');
  });
}

function shuffle(array) {
  for (var index = array.length - 1; index > 0; index--) {
    var randomIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  }
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
