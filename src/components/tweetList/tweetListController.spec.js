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
    spyOn(tweetListService, 'fetchTweets').and.returnValue($q.when({}));
    spyOn(tweetListService, 'fetchProfile').and.returnValue($q.when({}));
    spyOn(tweetListService, 'fetchBanner').and.returnValue($q.when({}));

  }));

  describe('getTweets', function() {

    it('should fetch call tweetListService', function() {
      controller.getTweets('nodejs');
      expect(tweetListService.fetchTweets).toHaveBeenCalledWith('nodejs');
    });

    it('should call update profile methods', function() {
      spyOn(controller, 'updateProfile');
      spyOn(controller, 'updateBanner');
      controller.getTweets('nodejs');
      expect(controller.updateProfile).toHaveBeenCalledWith('nodejs');
      expect(controller.updateBanner).toHaveBeenCalledWith('nodejs');
    });

  });

  describe('updateProfile', function() {

    it('should call fetchProfile', function() {
      controller.updateProfile('nodejs');
      expect(tweetListService.fetchProfile).toHaveBeenCalledWith('nodejs');
    });

  });

  describe('updateBanner', function() {

    it('should call fetchBanner', function() {
      controller.updateBanner('nodejs');
      expect(tweetListService.fetchBanner).toHaveBeenCalledWith('nodejs');
    });

  });

});
