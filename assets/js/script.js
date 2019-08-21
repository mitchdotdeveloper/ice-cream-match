// var cards = ['assets/images/chocolate-scoop.png', 'assets/images/mint-scoop.png', 'assets/images/.png', 'assets/images/.png', 'assets/images/.png', 'assets/images/.png']

$(document).ready(function(){
  $('.card').on('click', function(){
    $(event.currentTarget).addClass('flip-card flipped');
  });

});
