// To avoid XSS
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Takes info from tweet object and puts it into HTML
const createTweetElement = (tweet) => {
  let name = tweet.user.name;
  let icon = tweet.user.avatars;
  let username = tweet.user.handle;
  let tweetBody = tweet.content.text;
  let date = tweet.created_at;

  let $tweet = `
  <div class="individual-tweets">
    <header class="tweets">
      <section class="icon-name">
        <img src="${icon}">
        <h3>${name}</h3>
      </section>
      <h4>${username}</h4>
    </header>
    <article class="tweet-body">
      <h3>${escape(tweetBody)}</h3>
    </article>
    <footer>
      <p>${date}</p>
      <p class="symbols">&#9873 &#10227; &#10084;</p>
    </footer>
  </div>
  `;

  return $tweet;
}


// Submit form data w/ AJAX

$(document).ready(function () {
  $('#compose-tweet').submit(function (event) {
    event.preventDefault();
    let tweetBody = $('#tweet-text').val();

    if (tweetBody === '') {
      $("#no-text").slideDown("fast");
      $("#over-text").slideUp("fast");
    } else if (tweetBody.length > 140) {
      $("#no-text").slideUp("fast");
      $("#over-text").slideDown("fast");
    } else {
      $("#no-text").slideUp("fast");
      $("#over-text").slideUp("fast");
      $.post('/tweets', $(this).serialize()).then(
        function() {
          $.ajax('/tweets', { method: 'GET' })
            .then(function(data) {
              $('#tweet-text').val('');
              $('.counter').html(140);
              $('.tweet-container').empty();
              loadTweets();
            })
        });
    }
  })
});

// Goes through each tweet and renders them to tweet container
const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    $('.tweet-container').append(createTweetElement(tweet))
  }
};

// Load tweets after submission
const loadTweets = () => {
  $.ajax('/tweets/', { method: 'GET' })
    .then(function (loadedTweets) {
      renderTweets(loadedTweets.reverse());
    })
}

loadTweets();