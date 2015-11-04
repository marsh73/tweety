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

