angular.module('MusicSearch')
// This is the custom directive for the heading section
.directive('heading', function() {
  return {
    templateUrl: 'directives/heading.html',
    restrict: 'E'
  }
})
