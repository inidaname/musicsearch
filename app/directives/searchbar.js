angular.module('MusicSearch')
.directive('searchbar', function() {
  return {
    templateUrl: 'directives/searchbar.html',
    controller: 'SearchCtrl',
    restrict: 'E'
  }
})
.controller('SearchCtrl', ['$scope', '$log', '$http', '$location', 'dataFactory', 'Spotify', 'CommonProp', function($scope, $log, $http, $location, dataFactory, Spotify, CommonProp) {


	$scope.checkKey = function () {
		var searchData = $scope.searchAble;
		var NowArr = searchData.split(' ')
		NowArr.join();      // 'Wind,Rain,Fire'
		NowArr.join(', ');  // 'Wind, Rain, Fire'
		NowArr.join(' + '); // 'Wind + Rain + Fire'
		if ($location.path() !== '/search') {
			  $location.path('/search/'+NowArr.join('+'));
		} else {
			$location.path('/search/'+NowArr.join('+'));
		}

		Spotify.search($scope.searchAble, 'artist').then(function (data) {
			$scope.TheSearch = data.data.artists;
			CommonProp.SetData($scope.TheSearch)
		});
	}
}]);
