// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// Goes through each tweet and renders them to tweet container
const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    $('.tweet-container').append(createTweetElement(tweet))
  }
};


// Takes info from tweet object and puts it into HTML
const createTweetElement = (tweet) => {
  let name = tweet.user.name;
  let icon = tweet.user.avatars;
  let username = tweet.user.handle;
  let tweetBody = tweet.content.text;
  let date = tweet.created_at;

  let $tweet = `        
  <header class="tweets">
    <img src="${icon}">
    <h3>${name}</h3>
    <h4>${username}</h4>
  </header>
  <article class="tweet-body">
    <h3>${tweetBody}</h3>
  </article>
  <footer>
    <p>${date}</p>
    <p class="symbols">&#9873 &#10227; &#10084;</p>
  </footer>
  `;

  return $tweet;
}


console.log(renderTweets(data));

// Submit form data w/ AJAX
$("#compose-tweet").submit(event => {
  event.preventDefault();
  const composeTweet = $("#compose-tweet").val();
  $.ajax({
    type: "POST",
    url: '/tweets/',
    data: $(this).serialize(),
  });
});
