'use strict';

describe('Controller: tweetListController ', function () {
  var controller;
  var tweetListService;
  var $q;

  beforeEach(angular.mock.module('tweeety'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $injector) {
    controller = $controller('tweetListController');
    tweetListService = $injector.get('tweetListService');
    $q = $injector.get('$q');
  }));

  describe('getTweets', function() {

    it('should fetch call tweetListService', function() {
      spyOn(tweetListService, 'fetchTweets').and.returnValue($q.when({}));
      controller.getTweets('nodejs');
      expect(tweetListService.fetchTweets).toHaveBeenCalledWith('nodejs');
    });

  });

});
