'use strict';
angular.module('MusicSearch', [
	'ngRoute',
	'ngAnimate',
	'ngTouch',
	'MusicSearch.home',
	'MusicSearch.search'
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.otherwise({'redirectTo': '/'});
 }]);
