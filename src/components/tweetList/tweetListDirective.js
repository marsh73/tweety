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
