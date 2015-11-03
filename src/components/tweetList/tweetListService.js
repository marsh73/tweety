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
        $http.get('http://localhost:3000/tweets', {params: {screenName: handle}})
          .then(function (tweets) {
            deferred.resolve(tweets.data);
          })
          .catch(function (error) {
            deffered.reject(error);
          });
        return deferred.promise;
      },

      fetchMentions: function(mention) {
        $http.get('http://localhost:3000/tweets', {params: {mention: mention}})
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
