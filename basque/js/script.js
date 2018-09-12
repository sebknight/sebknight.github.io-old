// Call this function when the document is ready
$(document).ready(function () {
  //Navigation item buttons
  // Toggle cart visibility
  $('.navigation__item--cart').click(function () {
      $('.dropdown__cart').toggle();
      $('.navigation__item--cart').toggleClass('is-active');
  });

  //Closes cart when menu item is added to order
  $('.button--confirm').click(function (){
    $('.dropdown__cart').toggle();
    $('.navigation__item--cart').removeClass('is-active');
    $('.dropdown__cart--confirm').toggle();
    $('.dropdown__timer').toggle();
  });

  //Hides timer and 'order confirmed' notification when cancel button clicked
  $('.button--cancel').click(function (){
    $('.dropdown__timer').toggle();
    $('.dropdown__cart--confirm').toggle();
  });

  // Toggle call staff button
  $('.navigation__item--bell').click(function () {
    $('.dropdown__help').toggle();
    $('.navigation__item--bell').toggleClass('is-active');
  });

  // Toggle language settings
  $('.navigation__item--language').click(function (){
    $(this).text($(this).text() == 'Te Reo Māori' ? 'English' : 'Te Reo Māori');
  }); 
  // Navigation buttons END

  //Menu functionality
  // Toggle menu item dropdown, hides all open items when order button clicked
  $('.button--order').click(function (event){
    event.stopPropagation();
    $('.dropdown__menu-item').hide();
  });

  //shows/hides only the relevant menu item when clicked
  $('.item-name').click(function () {
    $(this).next().toggle();
  });

  //Adjust number of items
  $('.button--plus').click(function(){
    var counter =
    parseInt($('.item-number__value').val());
    counter++;
    $('.item-number').text(counter);
    $('.item-number__value').val(counter);
  });

  $('.button--minus').click(function(){
      var counter = parseInt($('.item-number__value').val());
      if (counter > 0) {
      counter--;
      $('.item-number__value').text(counter);
        $('.item-number').text(counter);
        $('.item-number__value').val(counter);}
  }); //item number adjustment ENDS
//Menu functionality ENDS 
}); //doc.ready function ENDS
