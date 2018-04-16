
(function () {
	angular
		.module('ktm')
		.controller('LoginCtrl', LoginCtrl);

	function LoginCtrl($scope, $rootScope, $translate, CrudService, $httpParamSerializer, $location, commonsService) {
	
		$scope.user = {};

		$scope.logon = function () {
			CrudService.login.logon($scope.user).then(function (response) {
				sessionStorage.setItem('user', JSON.stringify(response.data));
				$location.path("home");
				commonsService.success('Bem-vindo, ' + $rootScope.user + '!');
			}).catch(function (error) {
				commonsService.error('Erro ao realizar login na aplicação.');
			});
		};

		

		$scope.changeLang = function (lang) {
			$scope.language = lang;
			$translate.use(lang);
		};
	};
	LoginCtrl.$inject = ['$scope', '$rootScope', '$translate', 'CrudService', '$httpParamSerializer', '$location', 'commonsService',];
})();