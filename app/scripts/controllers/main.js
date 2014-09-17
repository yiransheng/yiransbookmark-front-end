'use strict';

/**
 * @ngdoc function
 * @name fbookmarkApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fbookmarkApp
 */
angular.module('bookmarkApp')
  .controller('MainCtrl', ['$scope','$rootScope', '$http', '$routeParams', '$location', 'settings', 'Search', 'iconMapping', 
  function ($scope, $rootScope, $http, $routeParams, $location, settings, Search, iconMapping) {
    $scope.search_results = [];
    $scope.Search = Search;
    $scope.query = $routeParams.search || '';
    $scope.showAll = function() {
      return !$rootScope.error && Search.status === settings.SEARCH_STATUS.IDLE;
    }
    $scope.showSearch = function() {
      return !$rootScope.error && Search.status === settings.SEARCH_STATUS.DONE;
    }
    $scope.$watch('query', function(query) {
      if(!query || query.length===0) {
        $location.search('search', null);
      } else {
        $location.search('search', query.toLowerCase() );
      }
    });
    if($routeParams.next && !$scope.query) {
      $rootScope.next_page = $routeParams.next;
      $rootScope.load_next_page(true);
    } else if ($scope.query) {
      $rootScope.error = NaN;
      Search.search($scope.query)
      .then(function(data) {
        $scope.search_results = data;  
      }, function() {
        $rootScope.error = "Error Searching: \"" + query + '"';   
      });
    } else {
      Search.clearSearch();
    }
  }]);
