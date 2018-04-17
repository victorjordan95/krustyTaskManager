
(function () {
	angular
		.module('ktm')
		.controller('LoginCtrl', LoginCtrl);

	function LoginCtrl($scope, $rootScope, $translate, CrudService, $httpParamSerializer, $location, commonsService) {
	
		$scope.user = {};

		$scope.logon = function () {

			var paramether = {
				"interactors": [
					{
						"recordAction": "QUERY_ADD",
						"entityName": "BotUser",
						"fieldAndValue": {
							"E-mail": $scope.user.login
						}
					},
					{
						"recordAction": "QUERY_REMOVE",
						"entityName": "BotUser",
						"fieldAndValue": {
							"Senha": $scope.user.password
						}
					}
				]
			};

			console.log($scope.user);
			CrudService.login.logon(paramether).then(function (response) {
				console.log(response);
				debugger;
				if (response.data.recordsResult.length === 0) {
					$location.path("home");
					commonsService.success('Bem-vindo, ' + $rootScope.user + '!');
				} else {
					commonsService.error('Login ou senha inválidos!');
				}
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