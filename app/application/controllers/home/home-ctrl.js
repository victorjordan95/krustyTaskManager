(function () {
	angular
		.module('ktm')
		.controller('HomeCtrl', HomeCtrl);

	function HomeCtrl($scope, $rootScope, $translate, CrudService, $httpParamSerializer, $location, commonsService) {
		$scope.actualUser = sessionStorage.getItem('name');

		function _findPrettyProjects(projects) {
			CrudService.common.findAllPretty(projects)
				.then(function (response) {
					$scope.countProjects = response.data.length;
				})
				.catch(function (error) {
					$scope.error(error.message);
				});
		};

		function _findProjects() {
			const parameter = {
				"interactors": [{
					"recordAction": "QUERY_ADD",
					"entityName": "Projeto"
				}]
			};
			CrudService.common.findAll(parameter)
				.then(function (response) {
					var projects = response.data;
					_findPrettyProjects(projects);
				})
				.catch(function (error) {
					$scope.error(error.message);
				});
		};

		function _findPrettyTasks(tasks) {
			CrudService.common.findAllPretty(tasks)
				.then(function (response) {
					const userKey = sessionStorage.getItem('key');
					$scope.associatedTasks = 0;
					response.data.forEach(element => {
						if (element.fields.Responsavel === `BotUser|${userKey}`) {
							$scope.associatedTasks += 1;
						}
					});
					$scope.allTasks = response.data;
					console.log(response.data);
				})
				.catch(function (error) {
					commonsService.error('Erro ao obter os dados');
				});
		};

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
					$scope.userPoints = response.data[0].fields.Pontos;
				})
				.catch(function (error) {
					commonsService.error('Erro ao obter os dados');
				});
		};


		function _findTasks() {
			const parameter = {
				"interactors": [{
					"recordAction": "QUERY_ADD",
					"entityName": "Tarefa"
				}]
			};
			CrudService.common.findAll(parameter)
				.then(function (response) {
					var tasks = response.data;
					_findPrettyTasks(tasks);
				})
				.catch(function (error) {
					commonsService.error('Erro ao obter os dados');
				});
		};

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
						_findProjects();
						_findTasks();
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
	HomeCtrl.$inject = ['$scope', '$rootScope', '$translate', 'CrudService', '$httpParamSerializer', '$location', 'commonsService', ];
})();