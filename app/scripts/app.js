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
        reloadOnSearch : true
      })
      .otherwise({
        redirectTo: function(_, path, search) {
          return '/' + (search.search ? '?search=' + search.search : '');
        }
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
	})
  .run(['$rootScope', '$http', '$location', 'settings', 'iconMapping', 
  function ($rootScope, $http, $location, settings, iconMapping) {
    $rootScope.links = [];
    $rootScope.has_more= true;
    $rootScope.next_page = null;
    $rootScope.error = null;
    $rootScope.load_next_page = function(replace) {
      if(!$rootScope.has_more) return;
      $http({
        method : 'GET', 
        url : settings.api + 'link',
        params : { next: $rootScope.next_page }
      })
      .success(function(res) {
        res.data.forEach(function(item) {
          item.icon = iconMapping(item.domain);      
        });
        $location.search('search', null);
        $rootScope.links = replace ? (res.data || []) : $rootScope.links.concat(res.data);
        $rootScope.has_more = res.more;
        $rootScope.next_page = res.next;
      })
      .error(function(res, status) {
        $rootScope.error = "Oops, something went wrong. ";
      });
    }
  }]);

