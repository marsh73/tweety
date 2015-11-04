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
