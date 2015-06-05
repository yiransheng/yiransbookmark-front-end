angular.module('bookmarkApp')
  .directive('ngModelClear', ['$rootScope', function($rootScope) {
    return {
      restrict: 'A',
      require: ['ngModel', 'ngModelOptions'],
      link : function(scope, element, attrs, Ctrls) {
        var ngModelCtrl = Ctrls[0];
        element.bind('keyup', function() {
          if(ngModelCtrl.$isEmpty(element.val())) {
            ngModelCtrl.$setViewValue('');
            ngModelCtrl.$commitViewValue();
            element[0].blur();
            $rootScope.$digest();
          }
        });        
      }
    }
  }])
  .directive('ngEnterBlur', function() {
    return {
      restrict: 'A',
      require: ['ngModel', 'ngModelOptions'],
      link : function(scope, element, attrs, Ctrls) {
        var ngModelCtrl = Ctrls[0];
        element.bind('keyup', function(e) {
          if(e.which === 13) {
            e.target.blur();
          }
        });        
      }
    }
  });
