'use strict';

function TweetListController (
  tweetListService,
  tweetUtils,
  $rootScope
) {
  this._tweetListService = tweetListService;
  this._tweetUtils = tweetUtils;
  this.$rootScope = $rootScope;
  this.getTweets('LAKings');
}

TweetListController.prototype.getTweets = function (handle) {
  this.updateProfile(handle);
  this.updateBanner(handle);
  this._tweetListService.fetchTweets(handle)
    .then(function (tweets) {
      this.tweets = this._tweetUtils.transformTweets(tweets);
    }.bind(this));
};

TweetListController.prototype.updateProfile = function (handle) {
  this._tweetListService.fetchProfile(handle)
    .then(function (profile) {
      this.$rootScope.profile = profile;
    }.bind(this));
};

TweetListController.prototype.updateBanner = function (handle) {
  this._tweetListService.fetchBanner(handle)
    .then(function (banner) {
      var bannerL = banner ? banner.sizes['1500x500'].url : '';
      this.$rootScope.banner = bannerL;
    }.bind(this), function (error) {
      console.log(error);
    });

};

TweetListController.$inject = [
  'tweetListService',
  'tweetUtils',
  '$rootScope'
];

angular.module('tweeety').controller('tweetListController', TweetListController);
