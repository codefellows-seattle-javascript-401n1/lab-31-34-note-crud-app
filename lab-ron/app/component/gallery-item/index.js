'use strict';

const angular = require('angular');
const demoApp = angular.module('demoApp');

demoApp.directive('AppGalleryItem', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./gallery-item.html'),
    link: function(scope, elem, attr){
      scope.title = 'happy wompus';
      scope.url = 'https://tse1.mm.bing.net/th?&id=OIP.M7368d3b7093f3c2cb95fd025fc4f19b5H0&w=300&h=266&c=0&pid=1.9&rs=0&p=0&r=0';

      elem.append.angular.element('<h1>!</h1>');
      elem.append.angular.element('<h1>!</h1>');
      elem.append.angular.element('<h1>!</h1>');

      elem.on('click', function(){
        scope.title = 'booya';
        console.log('booya');
        scope.$apply();
      });

      elem.on('mouseover', function(){
        elem.addClass('focus');
      });
      elem.on('mouseleave', function(){
        elem.removeClass('focus');
      });
    }
  };
});
