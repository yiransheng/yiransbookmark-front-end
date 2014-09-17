'use strict';

/**
 * @ngdoc function
 * @name fbookmarkApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fbookmarkApp
 */
angular.module('bookmarkApp')
  .controller('MainCtrl', ['$scope','$http', '$routeParams', 'settings', 'Search', 'iconMapping', 
  function ($scope, $http, $routeParams, settings, Search, iconMapping) {
    $scope.links = [];
    $scope.search_results = [];
    $scope.error = NaN;
    $scope.Search = Search;
    $scope.query = $routeParams.search || '';
    $scope.has_more=true;
    $scope.next_page = $routeParams.page || null;
    $scope.showAll = function() {
      return !$scope.error && Search.status === settings.SEARCH_STATUS.IDLE;
    }
    $scope.showSearch = function() {
      return !$scope.error && Search.status === settings.SEARCH_STATUS.DONE;
    }
    $scope.$watch('query', function(query) {
      if(!query || query.length===0) {
        Search.clearSearch();
      } else {
        $scope.error = NaN;
        Search.search(query)
        .then(function(data) {
          $scope.search_results = data;  
        }, function() {
          $scope.error = "Error Searching: \"" + query + '"';   
        });
      }
    });
    $scope.load_next_page = function() {
      if(!$scope.has_more) return;
      $http({
        method : 'GET', 
        url : settings.api + 'link',
        params : { next: $scope.next_page }
      })
      .success(function(res) {
        res.data.forEach(function(item) {
          item.icon = iconMapping(item.domain);      
        });
        $scope.links = res.data;
        $scope.has_more = res.more;
        $scope.next_page = res.next;
        
      })
      .error(function(res, status) {
        $scope.error = "Oops, something went wrong. ";
      });
    }
    $scope.load_next_page();
  }]);
