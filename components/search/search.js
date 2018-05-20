angular.module('MusicSearch.search', ['ngRoute', 'ngAnimate', 'ngTouch', 'spotify'])
.config(['$routeProvider', '$locationProvider', 'SpotifyProvider', function($routeProvider, $locationProvider, SpotifyProvider) {
    $routeProvider.when('/search', {
		 templateUrl: 'components/search/search.html',
		 controller: 'SearchCtrl'
	 }).when('/search/:searchquery', {
		 templateUrl: 'components/search/search.html',
		 controller: 'SearchCtrl'
	 });
  }])
.controller('ResultCtrl', ['$scope', 'CommonProp', '$routeParams', function($scope, CommonProp, $routeParams) {
	var prams = $routeParams.searchquery;

	var prams = prams.split('+');
	prams.join();
	prams.join(', ');
	prams.join(' + ');
	prams.join(' ');

	$scope.getResult = ''
	$scope.$watch(function () { return CommonProp.GetData(); }, function (newValue, oldValue) {		
        if (newValue !== oldValue){
			$scope.getResult = newValue;
		}
    });

}])
