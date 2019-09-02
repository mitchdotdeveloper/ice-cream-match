class Deck {
  constructor () {
    this.deck = [];
    this.images = [];
  }

  constructDeck () {
    this.deck = [];
    this.selectImages();
    this.shuffleImages();

    for (var card = 0; card < this.images.length; ++card) {
      this.deck.push(new Card());
      this.deck[card].setCardFace(this.images[card]);
      this.deck[card] = this.deck[card].constructCard();
    }

    this.appendDeck();
  }

  selectImages () {
    this.images = cardImages;
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
      $('card-container').append(this.deck[card]);
    }
  }

}
