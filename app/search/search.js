angular.module('MusicSearch.search', ['ngRoute', 'ngAnimate', 'ngTouch', 'spotify'])
.config(['$routeProvider', '$locationProvider', 'SpotifyProvider', function($routeProvider, $locationProvider, SpotifyProvider) {
	SpotifyProvider.setClientId('88b57db6bfe6437a97b58a6e5450ca05');
	SpotifyProvider.setRedirectUri('http://localhost:8888/#!/callback');
	SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
	// If you already have an auth token
	SpotifyProvider.setAuthToken('zoasliu1248sdfuiknuha7882iu4rnuwehifskmkiuwhjg23');
    $routeProvider.when('/search', {
		 templateUrl: 'search/search.html',
		 controller: 'SearchCtrl'
	 }).when('/search/:searchquery', {
		 templateUrl: 'search/search.html',
		 controller: 'SearchCtrl'
	 });
  }])
.controller('ResultCtrl', ['$scope', 'CommonProp', '$routeParams', function($scope, CommonProp, $routeParams) {
	var prams = $routeParams.searchquery;

	var prams = prams.split('+');
	prams.join();      // 'Wind,Rain,Fire'
	prams.join(', ');  // 'Wind, Rain, Fire'
	prams.join(' + '); // 'Wind + Rain + Fire'
	console.log(prams.join(' ')); // 'Wind + Rain + Fire'

	$scope.getResult = ''
	$scope.$watch(function () { return CommonProp.GetData(); }, function (newValue, oldValue) {
        if (newValue !== oldValue){
			   $scope.getResult = newValue;
				console.log($scope.getResult);
			}
    });

}])
