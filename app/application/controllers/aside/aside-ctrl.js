(function () {
	angular
		.module('ktm')
		.controller('AsideCtrl', AsideCtrl);

	function AsideCtrl($scope, $rootScope, $translate, CrudService, $httpParamSerializer, $location, commonsService) {
		$scope.actualUser = sessionStorage.getItem('name');

		$scope.logout = function () {
			$location.path("#/login");
			sessionStorage.setItem("id", undefined);
			sessionStorage.setItem("username", undefined);
			sessionStorage.setItem("name", undefined);
			sessionStorage.setItem("role", undefined);
		};

		$scope.navbarFields = [
			{ "name":"Usuários", "route" : "usuarios",  "icon" : "fa-users"},
			{ "name":"Rank", "route" : "rank", "icon" : "fa-trophy"},
			{ "name":"Projetos", "route" : "projetos", "icon" : "fa-handshake-o"},
			{ "name":"Tipo tarefa", "route" : "tipo-tarefa", "icon" : "fa-clipboard"},
			{ "name":"Status tarefa", "route" : "status-tarefa", "icon" : "fa-clipboard"},
			{ "name":"Clientes", "route" : "clientes", "icon" : "fa-clipboard"},
		];

		$scope.selectedMenu = function(navbarFields){
			var menu = navbarFields.name.toLowerCase();
			if (window.location.hash.split("#/")[1] == menu || window.location.hash.split("#/")[1].split('-').join(' ') == menu ) {
				return 'sidebar-user sidebar-links active';
			}
			return 'sidebar-user sidebar-links';
		}

	};
	AsideCtrl.$inject = ['$scope', '$rootScope', '$translate', 'CrudService', '$httpParamSerializer', '$location', 'commonsService',];
})();