function TweetListController (
  tweetListService
) {
  this.something = "something";
  this.tweetListService = tweetListService;
  this.tweetListService.fetchMentions();
}

TweetListController.prototype.getTweets = function (mention) {
  this.tweetListService.fetchMentions();
};

TweetListController.$inject = [
  'tweetListService'
];

angular.module('tweeety').controller('tweetListController', TweetListController);
