'use strict';

// # panel array web utils
angular.module('tweeety').factory('tweetUtils', [
  function(
  ) {

    function linkMentions (tweet) {
      var tweetText = tweet.text;
      var mentions = tweetText.match(/@\w+/g);
      if(mentions){
        mentions.forEach(function (mention){
          var linked = '<a href="https://twitter.com/' + mention.substr(1) + '" target="_blank">' + mention + '</a>';
          tweetText = tweetText.replace(mention, linked);
        });
      }
      return tweetText;
    }

    function transformTweet(tweet) {
      return {
        text: linkMentions(tweet)
      };
    }

    return {

      transformTweets: function (tweets) {
        return tweets.map(function(tweet){
          return transformTweet(tweet);
        }.bind(this));
      }

    };

  }
]);
