'use strict';

/**
 * @ngdoc overview
 * @name demoApp
 * @description
 * # demoApp
 *
 * Main module of the application.
 */
angular
  .module('demoApp', [
        'ui.sortable',
        'LocalStorageModule'
])
.config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }])
;
