'use strict';

/**
 * @ngdoc function
 * @name fbookmarkApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fbookmarkApp
 */
angular.module('bookmarkApp')
  .controller('MainCtrl', ['$scope','$rootScope', '$http', '$routeParams', '$location', '$window', 'settings', 'Search', 'iconMapping', 'responsiveUtils', 
  function ($scope, $rootScope, $http, $routeParams, $location, $window, settings, Search, iconMapping, responsiveUtils) {
    $scope.search_results = [];
    $scope.Search = Search;
    $scope.query = $routeParams.search || '';
    $scope.showAll = function() {
      return !$rootScope.error && Search.status === settings.SEARCH_STATUS.IDLE;
    }
    $scope.showSearch = function() {
      return !$rootScope.error && Search.status === settings.SEARCH_STATUS.DONE;
    }
    $scope.toggleSearchBar = function() {
      var r = responsiveUtils.getResponsiveClass();
      if(r === 'lg' || r === 'md') {
        return true;
      }
      $scope.searchBarVisible = !$scope.searchBarVisible;
    };
    $scope.commitSearch = function(query) {
      if(!query || query.length===0) {
        $location.search('search', null);
      } else {
        $location.search('search', query.toLowerCase() );
      }
    };
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
      $rootScope.load_next_page();
    }

    $scope.clickLink = function(evt, link) {
      var r = responsiveUtils.getResponsiveClass();
      if(r === 'lg' || r === 'md') {
        return;
      }
      evt.preventDefault();
      evt.stopPropagation();
      link.collapsed = !link.collapsed;
    };

    $scope.isPhone = function() {
      var r = responsiveUtils.getResponsiveClass();
      if(r === 'lg' || r === 'md') {
        return false;
      }
      return true;
    };

    window.onresize = function() {
      $rootScope.$digest();
    };

  }]);
