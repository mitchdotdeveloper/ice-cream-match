class Card {
  constructor () {
    this.domElement = jQuery;
    this.cardFaceSrc = '';
    this.cardBackSrc = 'assets/images/cardback.png';

  }

  setCardFace (cardFace) {
    this.cardFaceSrc = cardFace;
  }
  setCardBack (cardBack) {
    this.cardBackSrc = cardBack;
  }

  getCardFace() {
    return this.cardFaceSrc;
  }
  getCardBack() {
    return this.cardBackSrc;
  }
  getCard () {
    return this.domElement;
  }

  constructCard () {
    var card = $('<div>').addClass('card');
    var cardBack = $('<div>').addClass('card-back');
    var backImage = $('<img>').attr('src', this.cardBackSrc);
    var cardFace = $('<div>').addClass('card-face');
    var faceImage = $('<img>').attr('src', this.cardFaceSrc);

    cardBack.append(backImage);
    cardFace.append(faceImage);

    card.append(cardBack, cardFace);
    this.domElement = card;

    return this.domElement;
  }

  revealCard () {
    this.domElement.removeClass('card').addClass('card-flip flip-card');
  }
  hideCard () {
    this.domElement.removeClass('card-flip flip-card').addClass('card');
  }
  matchCard () {
    this.domElement.removeClass('card').addClass('card-match');
  }

}
