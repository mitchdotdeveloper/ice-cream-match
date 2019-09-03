class Deck {
  constructor () {
    this.deck = [];
    this.images = [];
    this.cardsClicked = [];

    this.cardClickHandler = this.cardClickHandler.bind(this);
    this.checkMatch = this.checkMatch.bind(this);
  }

  constructDeck () {
    this.deck = [];
    this.selectImages();
    this.shuffleImages();

    for (var card = 0; card < this.images.length; ++card) {
      this.deck.push(new Card(this.cardClickHandler));
      this.deck[card].setCardFace(this.images[card]);
      this.deck[card].constructCard();
      this.deck[card].domElement.on('click', this.deck[card].handleCardClick);
    }

    this.appendDeck();
  }

  selectImages () {
    this.images = cardImages;
    this.shuffleImages();
    this.images = this.images.slice(0, 6);
    this.images = this.images.concat(this.images);
  }

  shuffleImages () {
    for (var index = this.images.length - 1; index > 0; index--) {
      var randomIndex = Math.floor(Math.random() * (index + 1));
      var temp = this.images[randomIndex];
      this.images[randomIndex] = this.images[index];
      this.images[index] = temp;
    }
  }

  appendDeck () {
    for (var card = 0; card < this.deck.length; ++card) {
      $('.card-container').append(this.deck[card].domElement);
    }
  }

  checkMatch () {
    if (this.cardsClicked[0].getCardFace() === this.cardsClicked[1].getCardFace()) {
      this.cardsClicked[0].matchCard();
      this.cardsClicked[1].matchCard();
    } else {
      this.cardsClicked[0].hideCard();
      this.cardsClicked[1].hideCard();
    }

    this.cardsClicked = [];
  }

  cardClickHandler ( card ) {
    if (card.domElement.hasClass('card-flip') ||
        card.domElement.hasClass('card-match') ||
        this.cardsClicked.length === 2) {
      return;
    }
    this.cardsClicked.push( card );
    card.revealCard();

    if (this.cardsClicked.length === 2) {
      setTimeout(this.checkMatch, 500);
    }
  }
}
