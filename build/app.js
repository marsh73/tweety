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
  this.tweetListService.fetchMentions();
}

TweetListController.prototype.getTweets = function (mention) {
  this.tweetListService.fetchMentions();
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
  function(
    $window,
    $http
  ) {
    var _req = {
     method: 'jsonp',
     url: 'https://api.twitter.com/oauth2/token',
     headers: {
       Authorization: "Basic " + $window.btoa('jwdHdze6LOkuKDEC9agbD5z4L') + ':' + $window.btoa('jFMCK4UnkL4S25ldvu116f7bxfHztTQVjdVugcQmkcradQqbN3'),
       'Content-Type': 'application/json'
     }
    };
    console.log($window.btoa('jwdHdze6LOkuKDEC9agbD5z4L' + ':' + 'jFMCK4UnkL4S25ldvu116f7bxfHztTQVjdVugcQmkcradQqbN3'));
    return {

      authenticate: function() {
        $http(_req)
          .then(function (data) {
            console.log('success authenticate', data);
          })
          .catch(function (error) {
            console.log('error', error);
          });
      },

      fetchMentions: function() {
        $http
          .jsonp(
            'https://api.twitter.com/1.1/statuses/mentions_timeline.json?screen_name=kevinchristy&count=2',
            {
              withCredentials: true,
              headers: {
                Authorization: "Basic " + $window.btoa('jwdHdze6LOkuKDEC9agbD5z4L') + ':' + $window.btoa('jFMCK4UnkL4S25ldvu116f7bxfHztTQVjdVugcQmkcradQqbN3'),
                'Content-Type': 'application/json'
              }
            }
          )
          .then(function (mentions) {
            console.log('mentions', mentions);;
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
