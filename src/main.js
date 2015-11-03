'use strict';

angular.module('tweeety', [
  'ui.router',
]);

require('./common/states.js');
require('./components/tweetList/tweetListDirective.js');
require('./components/tweetList/tweetListController.js');
require('./components/tweetList/tweetListService.js');

