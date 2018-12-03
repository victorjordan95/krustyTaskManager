(function () {
	angular
		.module('ktm')
		.controller('ChangeProfileCtrl', ChangeProfileCtrl);

	function ChangeProfileCtrl($scope, $rootScope, $translate, CrudService, $httpParamSerializer, $location, commonsService) {

		$scope.userInfo = {};
		function _findUser() {
			const parameter = {
				"interactors": [{
					"recordAction": "QUERY_ADD",
					"entityName": "BotUser",
					"recordLine": sessionStorage.getItem('key')
				}]
			};

			CrudService.common.findAll(parameter)
				.then(function (response) {
					_findPretty(response.data);
				})
				.catch(function (error) {
					commonsService.error('Erro ao obter os dados');
				});
		};

		function _findPretty(user) {
			CrudService.common.findAllPretty(user)
				.then(function (response) {
					$scope.user = response.data[0];
					$scope.userInfo = angular.copy(response.data[0]);
					$scope.fieldList = response.data[0].fieldList;
				})
				.catch(function (error) {
					commonsService.error('Erro ao obter os dados');
				});
		};

		$scope.save = function () {
			$scope.fieldList.forEach(element => {
				var user = {
					"interactors":[
						{
							"recordAction" : "EDIT",
							"entityName" : "BotUser",
							"recordLine": sessionStorage.getItem('key'),
							"fieldName" : element,
							"newValue" : $scope.userInfo.fields[element],
						}	
					]
				};
				CrudService.common.save(user)
					.then(function (response) {
						
					})
					.catch(function (error) {
						if (error.objeto.data.exception.includes('EmptyOrNullValueException')) {
							commonsService.error('Campo vazio!');
							return;
						} else {
							if (error.objeto.data.exception.includes('UniqueConstraintException')) {
								commonsService.error('Erro ao salvar perfil!');
								return;
							}
						}
					});
			});
			
			var cpf = {
				"interactors":[
					{
						"recordAction" : "EDIT",
						"entityName" : "BotUser",
						"recordLine": sessionStorage.getItem('key'),
						"fieldName" : "CPF Conta",
						"newValue" : $scope.userInfo.fields['CPF Conta'],
					}	
				]
			};
			CrudService.common.save(cpf)
				.then(function (response) {
					
				})
				.catch(function (error) {
					if (error.objeto.data.exception.includes('EmptyOrNullValueException')) {
						commonsService.error('Campo vazio!');
						return;
					} else {
						if (error.objeto.data.exception.includes('UniqueConstraintException')) {
							commonsService.error('Erro ao salvar perfil!');
							return;
						}
					}
				});
			commonsService.success('Perfil salvo com sucesso!');
		}

		var init = function () {
			var userParamether = {
				"interactors": [{
					"recordAction": "QUERY_ADD",
					"entityName": "BotUser",
					"fieldAndValue": {
						"Id": sessionStorage.getItem('id')
					}
				}]
			};

			CrudService.common.findAll(userParamether)
				.then(function (response) {
					if (response.data.recordsResult.length === 1) {
						_findUser();
					} else {
						sessionStorage.setItem("id", undefined);
						sessionStorage.setItem("username", undefined);
						sessionStorage.setItem("name", undefined);
						sessionStorage.setItem("role", undefined);
						$location.path("/");
					}
				}).catch(function (error) {
					commonsService.error('Erro ao realizar consulta de usuário.');
				});
		}

		init();

	};


	ChangeProfileCtrl.$inject = ['$scope', '$rootScope', '$translate', 'CrudService', '$httpParamSerializer', '$location', 'commonsService'];
})();