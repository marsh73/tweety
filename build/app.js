(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

angular.module('tweeety')
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './common/partials/home.html'
      });

    }
  ])
  .config(['$urlRouterProvider', function ($urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
    }
  ]);

},{}],2:[function(require,module,exports){
'use strict';

function TweetListController (
  tweetListService,
  tweetUtils,
  $rootScope
) {
  this._tweetListService = tweetListService;
  this._tweetUtils = tweetUtils;
  this.$rootScope = $rootScope;
  this.getTweets('StackSocial');
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
    }.bind(this));
};

TweetListController.$inject = [
  'tweetListService',
  'tweetUtils',
  '$rootScope'
];

angular.module('tweeety').controller('tweetListController', TweetListController);

},{}],3:[function(require,module,exports){
'use strict';

angular.module('tweeety').directive('tweetList', [function () {
  return {
    restrict: 'A',
    controller: 'tweetListController',
    controllerAs: 'tweetListCtrl',
    bindToController: true,
    replace: true,
    templateUrl: './components/tweetList/tweetList.html',
    link: function (scope, iElement, iAttrs) {

    }
  };
}]);

},{}],4:[function(require,module,exports){
'use strict';

// # panel array web utils
angular.module('tweeety').factory('tweetListService', [
  '$window',
  '$http',
  '$q',
  function(
    $window,
    $http,
    $q
  ) {
    return {

      fetchTweets: function(handle) {
        this.fetchProfile(handle);
        var deferred = $q.defer();
        $http.get('/tweets', {params: {screenName: handle}})
          .then(function (tweets) {
            deferred.resolve(tweets.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });
        return deferred.promise;
      },

      fetchProfile: function (handle) {
        var deferred = $q.defer();
        $http.get('/profile', {params: {screenName: handle}})
          .then(function (profile) {
            deferred.resolve(profile.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });
        return deferred.promise;
      },

      fetchBanner: function (handle) {
        var deferred = $q.defer();
        $http.get('/banner', {params: {screenName: handle}})
          .then(function (banner) {
            deferred.resolve(banner.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });
        return deferred.promise;
      }

    };
  }
]);

},{}],5:[function(require,module,exports){
'use strict';

// # panel array web utils
angular.module('tweeety').factory('tweetUtils', [
  function(
  ) {
    function transformTweet(tweet) {
      return {
        text: linkMentions(tweet)
      };
    }

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

    return {

      transformTweets: function (tweets) {
        return tweets.map(function(tweet){
          return transformTweet(tweet);
        }.bind(this));
      }

    };

  }
]);

},{}],6:[function(require,module,exports){
'use strict';

angular.module('tweeety', [
  'ui.router',
  'ngSanitize'
]);

require('./common/states.js');
require('./components/tweetList/tweetListDirective.js');
require('./components/tweetList/tweetListController.js');
require('./components/tweetList/tweetListService.js');
require('./components/tweetList/tweetUtils.js');


},{"./common/states.js":1,"./components/tweetList/tweetListController.js":2,"./components/tweetList/tweetListDirective.js":3,"./components/tweetList/tweetListService.js":4,"./components/tweetList/tweetUtils.js":5}]},{},[6]);
