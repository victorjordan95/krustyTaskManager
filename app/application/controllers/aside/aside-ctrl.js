(function () {
	angular
		.module('ktm')
		.controller('AsideCtrl', AsideCtrl);

	function AsideCtrl($scope, $rootScope, $location, commonsService) {
		$scope.actualUser = sessionStorage.getItem('name');
		$scope.isAdmin = () => sessionStorage.getItem('role') === 'Admin' ? true : false;

		const userRole = $scope.isAdmin();

		$scope.logout = function () {
			$location.path("#/login");
			sessionStorage.setItem("id", undefined);
			sessionStorage.setItem("username", undefined);
			sessionStorage.setItem("name", undefined);
			sessionStorage.setItem("role", undefined);
		};

		$scope.isAdmin = () => sessionStorage.getItem('role') === 'Admin' ? true : false;

		$scope.navbarFields = [
			{ "admin": userRole, "name":"Usuários", "route" : "usuarios",  "icon" : "fa-users"},
			{ "admin": true, "name":"Rank", "route" : "rank", "icon" : "fa-trophy"},
			{ "admin": true, "name":"Projetos", "route" : "projetos", "icon" : "fa-handshake-o"},
			{ "admin": userRole, "name":"Tipo tarefa", "route" : "tipo-tarefa", "icon" : "fa-clipboard"},
			{ "admin": userRole, "name":"Status tarefa", "route" : "status-tarefa", "icon" : "fa-clipboard"},
			{ "admin": userRole, "name":"Clientes", "route" : "clientes", "icon" : "fa-clipboard"},
		];

		$scope.selectedMenu = function(navbarFields){
			var menu = navbarFields.name.toLowerCase();
			if (window.location.hash.split("#/")[1] == menu || window.location.hash.split("#/")[1].split('-').join(' ') == menu ) {
				return 'sidebar-user sidebar-links active';
			}
			return 'sidebar-user sidebar-links';
		}

	};
	AsideCtrl.$inject = ['$scope', '$location', 'commonsService',];
})();