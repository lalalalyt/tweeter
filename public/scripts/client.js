/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $("#post-tweet").submit(function (event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $(this).serialize(),
    });
  });

  const loadTweets = () => {
    $.ajax({
      type: "GET",
      url: "/tweets",
    }).then((results) => {
      renderTweets(results);
    });
  };
loadTweets()

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
          ${tweetData.content.text}
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
    for (let tweetData of tweetArray) {
      let tweet = "";
      tweet += createTweetElement(tweetData);
      $("#all-tweets").append(tweet);
    }
  };
});
