angular.module('MusicSearch.home', ['ngRoute', 'ngAnimate', 'ngTouch'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
		 templateUrl: 'components/home/home.html'
	 });
 }]);
