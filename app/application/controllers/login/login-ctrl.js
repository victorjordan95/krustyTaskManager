
(function () {
	angular
		.module('ktm')
		.controller('LoginCtrl', LoginCtrl);

	function LoginCtrl($scope, $rootScope, $translate, CrudService, $httpParamSerializer, $location, commonsService) {

		$scope.user = {};

		function _findPretty(user) {
			CrudService.common.findAllPretty(user)
				.then(function (response) {
					$("#password-login").removeClass('hidden').focus();
					sessionStorage.setItem("key", response.data[0].key);
					sessionStorage.setItem("id", response.data[0].fields.Id);
					sessionStorage.setItem("username", response.data[0].fields["E-mail"]);
					sessionStorage.setItem("name", response.data[0].fields.Nome);
					sessionStorage.setItem("role", response.data[0].fields.Role);
				})
				.catch(function (error) {
					$scope.error(error.message);
				});
		};

		$scope.verifyEmail = function () {
			var paramether = {
				"interactors": [
					{
						"recordAction": "QUERY_ADD",
						"entityName": "BotUser",
						"fieldAndValue": {
							"E-mail": $scope.user.login
						}
					}
				]
			};
			CrudService.login.logon(paramether).then(function (response) {
				if (response.data.recordsResult.length === 1) {
					_findPretty(response.data);
				} else {
					commonsService.error('Usuário inexistente!');
					$("#password-input").val('');
				}
			}).catch(function (error) {
				commonsService.error('Erro ao realizar consulta de usuário.');
			});
		};

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

			CrudService.login.logon(paramether).then(function (response) {
				if (response.data.recordsResult.length === 0) {
					$location.path("home");
					commonsService.success(`Bem-vindo, ${sessionStorage.getItem('name')}!`);
				} else {
					commonsService.error('Login ou senha inválidos!');
				}
			}).catch(function (error) {
				commonsService.error('Erro ao realizar login na aplicação.');
			});
		};

		focusMethod = function getFocus(id) {
			document.getElementById(id).focus();
		}

	};
	LoginCtrl.$inject = ['$scope', '$rootScope', '$translate', 'CrudService', '$httpParamSerializer', '$location', 'commonsService',];
})();