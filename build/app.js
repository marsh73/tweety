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

},{}],3:[function(require,module,exports){
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
        var deferred = $q.defer();
        $http.get('/tweets', {params: {screenName: handle}})
          .then(function (tweets) {
            deferred.resolve(tweets.data);
          })
          .catch(function (error) {
            deffered.reject(error);
          });
        return deferred.promise;
      },

      fetchMentions: function(mention) {
        $http.get('/tweets', {params: {mention: mention}})
          .then(function (one, two, three) {
            console.log('mentions', one, two, three);;
          })
          .catch(function (error) {
            console.log('error', error);
          });
      },

    };
  }
]);

},{}],5:[function(require,module,exports){
'use strict';

angular.module('tweeety', [
  'ui.router',
]);

require('./common/states.js');
require('./components/tweetList/tweetListDirective.js');
require('./components/tweetList/tweetListController.js');
require('./components/tweetList/tweetListService.js');


},{"./common/states.js":1,"./components/tweetList/tweetListController.js":2,"./components/tweetList/tweetListDirective.js":3,"./components/tweetList/tweetListService.js":4}]},{},[5]);
