
$(document).ready(function(){
  $('.card').on('click', function(){
    $(event.currentTarget).toggleClass('flip-card');
  });

  $('.circle').on('mouseover', function(){
    $(event.currentTarget).toggleClass('circle-fill');
    $(event.currentTarget).toggleClass('circle-enlarge');
  });

  $('.circle').on('mouseout', function () {
    $(event.currentTarget).toggleClass('circle-fill');
    $(event.currentTarget).toggleClass('circle-enlarge');
  });

});


// $('.circle').on('click', function () {
  //   var circle = $(event.currentTarget).toggleClass('circle-enlarge');
  //   setTimeout(function () {
  //     $(circle).toggleClass('circle-enlarge');
  //   }, 1000);
  // });
