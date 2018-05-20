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
	SpotifyProvider.setRedirectUri('http://localhost:3000/#!/callback');
	SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
	// If you already have an auth token
	SpotifyProvider.setAuthToken('BQBdUzLD1XaGZl4OPFnGaJt-oUi2a7gLiSm7HxTHXGZxWtMe-Zb-j9QlTnvQST5n-OGe9-YG1OqYG2wubrTZ3ot1yQViegpkolx_czuw9D60HByIRIv4Ogkz6qgOHoYSeQMqzuAZXB1qpHIh_1hij-_wV6DL');
	$routeProvider.otherwise({'redirectTo': '/'});
 }]);
