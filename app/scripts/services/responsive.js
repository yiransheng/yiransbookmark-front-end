'use strict';

angular.module('bookmarkApp')
  .factory('responsiveUtils', function() {

    var em = 16,
        screenXs = 30 * em,
        screenSm = 48 * em,
        screenMd = 62 * em,
        screenLg = 75 * em;

    return {
      breakPoints : {
        xs : screenXs,
        sm : screenSm,
        md : screenMd,
        lg : screenLg,
      },
      getResponsiveClass : function() {
        var width = window.innerWidth;
        if(width < this.breakPoints.xs) {
          return 'xxs';
        }
        if(width < this.breakPoints.sm) {
          return 'xs';
        }
        if(width < this.breakPoints.md) {
          return 'sm';
        }
        if(width < this.breakPoints.lg) {
          return 'md';
        }
        return 'lg';
      }
    };
  
  });
