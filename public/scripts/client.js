/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $("#post-tweet").submit(function (event) {
    event.preventDefault();
    if (!$(this[0]).val()) {
      let message = "Empty! Please enter your tweet."
      $('#error-message').text(message)
      $("#error-message").show("slow");

    } else if ($(this[0]).val().length > 140) {
      let message = "Too Long! Maximum length is 140."
      $('#error-message').text(message)
      $("#error-message").show("slow");
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $(this).serialize(),
      }).then(() => {
        $(".tweet").remove();
        loadTweets();
      });
    }
  });

  const loadTweets = () => {
    $.ajax({
      type: "GET",
      url: "/tweets",
    }).then((results) => {
      renderTweets(results);
    });
  };

  const createTweetElement = (tweetData) => {
    const tweetElement = `
        <article class="tweet">
          <header>
            <div class="userData">
              <img src=${tweetData.user.avatars} >
              <div>${tweetData.user.name}</div>
            </div>
            <div>${tweetData.user.handle}</div>
          </header>
          <p>
          ${escape(tweetData.content.text)}
          </p>
          <footer>
            <div>${timeago.format(tweetData.created_at)}</div>
            <div class="icons">
              <i class="fa-regular fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
      `;
    return tweetElement;
  };

  const renderTweets = (tweetArray) => {
    for (let tweetData of tweetArray.reverse()) {
      let tweet = "";
      tweet += createTweetElement(tweetData);
      $("#all-tweets").append(tweet);
    }
  };
});

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
