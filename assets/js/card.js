class Card {
  constructor (clickHandler) {
    this.domElement = jQuery;
    this.cardFaceSrc = '';
    this.cardBackSrc = 'assets/images/cardback.png';
    this.callback = clickHandler;

    this.handleCardClick = this.handleCardClick.bind(this);
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

  handleCardClick () {
    this.callback(this);
  }

  revealCard () {
    this.domElement.addClass('card-flip flip');
  }
  hideCard () {
    this.domElement.removeClass('card-flip flip');
  }
  matchCard () {
    this.domElement.addClass('card-match');
  }

}
