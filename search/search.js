angular.module('MusicSearch.search', ['ngRoute', 'ngAnimate', 'ngTouch'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/search', {
		 templateUrl: 'search/search.html',
		 controller: 'SearchCtrl'
	 });
	 // use the HTML5 History API
	 $locationProvider.html5Mode(true).hashPrefix('');
  }])
 .controller('SearchCtrl', ['$scope', '$log', function($scope, $log) {
   $log.info($scope)
 }])
