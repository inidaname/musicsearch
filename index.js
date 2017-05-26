'use strict';
angular.module('MusicSearch', [
	'ngRoute',
	'ngAnimate',
	'ngTouch',
	'spotify',
	'MusicSearch.home',
	'MusicSearch.search'
])
.config(['$routeProvider', '$locationProvider', 'SpotifyProvider', function($routeProvider, $locationProvider, SpotifyProvider) {
	SpotifyProvider.setClientId('88b57db6bfe6437a97b58a6e5450ca05');
	SpotifyProvider.setRedirectUri('http://localhost:8888/#!/callback');
	SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
	// If you already have an auth token
	SpotifyProvider.setAuthToken('zoasliu1248sdfuiknuha7882iu4rnuwehifskmkiuwhjg23');
	$routeProvider.otherwise({'redirectTo': '/'});
 }]);
