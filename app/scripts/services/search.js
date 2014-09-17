angular.module('bookmarkApp')
  .factory('Search', ['$http', '$q', 'settings', 'iconMapping', 
  function($http, $q, settings, iconMapping) {
    return {
      status : settings.SEARCH_STATUS.IDLE,
      search : function(query) {
        var self = this;
        this.status = settings.SEARCH_STATUS.SEARCHING;
        var deferred = $q.defer();
        $http({
          method : 'GET',
          url : settings.api + 'search/link',
          params : {
            query : query
          }
        })
        .success(function(res) {
          self.status = settings.SEARCH_STATUS.DONE;
          res.data.forEach(function(item) {
            item.icon = iconMapping(item.domain);      
          });
          deferred.resolve(res.data);
        })
        .error(function(err) {
          self.status = settings.SEARCH_STATUS.ERROR;
          deferred.reject(err);
        });
        return deferred.promise;
      },
      clearSearch : function() {
        this.status = settings.SEARCH_STATUS.IDLE;
      },
      isLoading : function() {
        return this.status == settings.SEARCH_STATUS.SEARCHING;
      }
    }
  }]);
