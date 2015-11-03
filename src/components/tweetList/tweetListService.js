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
