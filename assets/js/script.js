
$(document).ready(function () {
  $('.card').on('click', function () {
    console.log('clicked');
    var card = $(event.currentTarget);
    card.toggleClass('flip-card');
  })
});
