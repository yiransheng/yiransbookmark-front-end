'use strict';

// templates-main is only present for build
try {
  angular.module('templates-main');
} catch(err) {
  angular.module('templates-main', []);
}

/**
 * @ngdoc overview
 * @name fbookmarkApp
 * @description
 * # bookmarkApp
 *
 * Main module of the application.
 */

angular
  .module('bookmarkApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
		'btford.markdown',
    'templates-main'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        reloadOnSearch : false,
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('settings', {
    api : '/api/v1/',	
		SEARCH_STATUS : {
			IDLE : 0,
	    SEARCHING : 1,
	    DONE : 2,
	    ERROR : 3
		}
	});

