angular.module('bookmarkApp')
  .directive('ngModelClear', function() {
    return {
      restrict: 'A',
      require: ['ngModel', 'ngModelOptions'],
      link : function(scope, element, attrs, Ctrls) {
        var ngModelCtrl = Ctrls[0];
        element.bind('keyup', function() {
          if(ngModelCtrl.$isEmpty(element.val())) {
            ngModelCtrl.$setViewValue('');
            ngModelCtrl.$commitViewValue();
            scope.$digest();
          }
        });        
      }
    }
  })
