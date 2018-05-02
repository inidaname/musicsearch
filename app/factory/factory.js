angular.module('MusicSearch')
.factory('dataFactory', ['$q', '$http', function($q, $http) {
	return {
		getResult: (data) => {
			let result = $q.defer()
			$http({
				method: 'POST',
				url: '/search',
				data: {data}
			}).then(function (resp) {
				return result.resolve(resp)
			}, function (err) {
				return result.reject(err)
			})
			return result.promise;
		}
	}

}])
