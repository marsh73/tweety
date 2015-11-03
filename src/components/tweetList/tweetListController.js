function TweetListController (
  tweetListService
) {
  this.something = "something";
  this.tweetListService = tweetListService;
  this.getTweets('the_real_marsh');
}

TweetListController.prototype.getTweets = function (handle) {
  this.tweetListService.fetchTweets(handle)
    .then(function (tweets) {
      this.tweets = tweets;
    }.bind(this));
};

TweetListController.prototype.getMentions = function (mention) {
  this.tweetListService.fetchMentions(mention);
};

TweetListController.$inject = [
  'tweetListService'
];

angular.module('tweeety').controller('tweetListController', TweetListController);
