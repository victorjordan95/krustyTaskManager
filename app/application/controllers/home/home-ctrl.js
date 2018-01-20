(function () {
	angular
		.module('ktm')
		.controller('HomeCtrl', HomeCtrl);

	function HomeCtrl($scope, $rootScope, $translate, CrudService, $httpParamSerializer, $location, commonsService) {
		$scope.actualUser = $rootScope.user;

	};
	HomeCtrl.$inject = ['$scope', '$rootScope', '$translate', 'CrudService', '$httpParamSerializer', '$location', 'commonsService',];
})();