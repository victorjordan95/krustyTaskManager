(function () {
	angular
		.module('sgp')
		.controller('AsideCtrl', AsideCtrl);

	function AsideCtrl($scope, $rootScope, $translate, CrudService, $httpParamSerializer, $location, commonsService) {
		$scope.actualUser = $rootScope.user;

		$scope.language = 'pt-br';
		$scope.changeLang = function (lang) {
			$scope.language = lang;
			$translate.use(lang);
		};

		$scope.logout = function () {
			CrudService.login.logout()
				.then(function (response) {
					$scope.currentUser = undefined;
					sessionStorage.setItem('user', undefined);
					$location.path("login");
				}).catch(function () {
					console.log('Logout error');
				}
				);
		};

		$scope.navbarFields = [
			{ "url" : "atividades", "name":"Atividades", "icon" : "fa-tasks"},
			{ "url" : "rank", "name":"Rank", "icon" : "fa-trophy"},
			{ "url" : "pendencias", "name":"Conquistas", "icon" : "fa-trophy"}
		];

		$scope.selectedMenu = function(navbarFields){
			var menu = navbarFields.name;
			if (window.location.hash.split("#/")[1] == menu) {
				return 'sidebar-user sidebar-links active';
			}
			return 'sidebar-user sidebar-links';
		}

	};
	AsideCtrl.$inject = ['$scope', '$rootScope', '$translate', 'CrudService', '$httpParamSerializer', '$location', 'commonsService',];
})();