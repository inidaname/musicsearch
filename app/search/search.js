angular.module('MusicSearch.search', ['ngRoute', 'ngAnimate', 'ngTouch'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/search', {
		 templateUrl: 'search/search.html',
		 controller: 'SearchCtrl'
	 });
  }])
 .controller('SearchCtrl', ['$scope', '$log', function($scope, $log) {
 }])
