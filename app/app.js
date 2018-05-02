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
	SpotifyProvider.setAuthToken('BQB9WDG6bWa5FguhGjugbMftX-vQNCELBSVPgr8dfuQ_AqnCd0Agci7QTMxb59lfRB_HmJtDQcgo8vpKw-K1Xu-S_uj3--tmZNmFzRvq-QaTzefYa0ay8RA6ayTYS1QX8-n_qoHIzmt3qvqqCZLw0VyNqOMl');
	$routeProvider.otherwise({'redirectTo': '/'});
 }]).controller('MainCtrl', function (Spotify) {
	Spotify.login()
});;
