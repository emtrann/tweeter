$(document).ready(function() {

  $('.new-tweet').on('keyup', '#tweet-text', function() { 
    let typedCharacters = $(this).val().length;
    let charactersRemaining = 140 - typedCharacters;
    let counterUpdate = $(this).siblings('div').find('.counter').html(charactersRemaining);
    if (charactersRemaining < 0) {
      counterUpdate.css('color', 'red');
    } else {
      counterUpdate.css('color', '#545149');
    }
  })

});