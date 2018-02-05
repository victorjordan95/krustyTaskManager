(function () {
	angular
		.module('ktm')
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
			{ "name":"Usuários", "route" : "users",  "icon" : "fa-users"},
			{ "name":"Perfil", "route" : "perfil",  "icon" : "fa-user"},
			{ "name":"Rank", "route" : "rank", "icon" : "fa-trophy"},
			{ "name":"Tarefas", "route" : "tarefas", "icon" : "fa-clipboard"},
		];

		$scope.selectedMenu = function(navbarFields){
			var menu = navbarFields.name.toLowerCase();
			if (window.location.hash.split("#/")[1] == menu) {
				return 'sidebar-user sidebar-links active';
			}
			return 'sidebar-user sidebar-links';
		}

	};
	AsideCtrl.$inject = ['$scope', '$rootScope', '$translate', 'CrudService', '$httpParamSerializer', '$location', 'commonsService',];
})();