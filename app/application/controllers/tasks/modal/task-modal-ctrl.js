(function () {
	angular
		.module('ktm')
		.controller('TasksModalController', TasksModalController);

	function TasksModalController($scope, tasks, $q, CrudService, $uibModalInstance, commonsService) {

		var self = this;
		$scope.typeStatusModal = {};
		$scope.typeStatusModal.active = '1';


		function _getProjectId() {
			var projectId = location.hash.split('/');
			var url = '';
			for (let index = 3; index < projectId.length; index++) {
				url += projectId[index];
			}
			var id = decodeURI(`${projectId[2]}|${url}`);
			return id
		}

		console.log(_getProjectId());

		$scope.dtInstance = {};

		$scope.cancel = () => $uibModalInstance.close();

		$scope.reloadData = () => $scope.dtInstance.rerender();

		function _findTipoTarefa() {
			const parameter = {
				"interactors": [{
					"recordAction": "QUERY_ADD",
					"entityName": "Tipo Tarefa"
				}]
			};
			CrudService.common.findAll(parameter)
				.then(function (response) {
					CrudService.common.findAllPretty(response.data)
						.then(function (response) {
							$scope.tiposTarefa = response.data;
							_findStatus();
						})
						.catch(function (error) {
							$scope.error(error.message);
						});
				})
				.catch(function (error) {
					$scope.error(error.message);
				});
		};

		function _findStatus() {
			const parameter = {
				"interactors": [{
					"recordAction": "QUERY_ADD",
					"entityName": "Status Tarefa"
				}]
			};
			CrudService.common.findAll(parameter)
				.then(function (response) {
					CrudService.common.findAllPretty(response.data)
						.then(function (response) {
							$scope.statusTarefa = response.data;
							_findProjetos();
						})
						.catch(function (error) {
							$scope.error(error.message);
						});
				})
				.catch(function (error) {
					$scope.error(error.message);
				});
		};

		function _findProjetos() {
			const parameter = {
				"interactors": [{
					"recordAction": "QUERY_ADD",
					"entityName": "Projeto"
				}]
			};
			CrudService.common.findAll(parameter)
				.then(function (response) {
					CrudService.common.findAllPretty(response.data)
						.then(function (response) {
							$scope.projetos = response.data;
							_findResponsavel();
						})
						.catch(function (error) {
							$scope.error(error.message);
						});
				})
				.catch(function (error) {
					$scope.error(error.message);
				});
		};

		function _findResponsavel() {
			const parameter = {
				"interactors": [{
					"recordAction": "QUERY_ADD",
					"entityName": "BotUser"
				}]
			};
			CrudService.common.findAll(parameter)
				.then(function (response) {
					CrudService.common.findAllPretty(response.data)
						.then(function (response) {
							$scope.responsaveis = response.data;
							if (tasks === undefined) {
								$scope.selected_typeTask = $scope.tiposTarefa[0];
								$scope.selected_status = $scope.statusTarefa[0];
								$scope.selected_responsible = $scope.responsaveis[0];
								$scope.task = angular.copy(tasks);
							} else {
								$scope.task = angular.copy(tasks.fields);
								tasksKey = tasks.key;
								$scope.tiposTarefa.forEach(element => {
									if ($scope.task.Tipo == `${element.entityName}|${element.key}`) {
										$scope.selected_typeTask = element;
									}
								});
								$scope.statusTarefa.forEach(element => {
									if ($scope.task.Status == `${element.entityName}|${element.key}`) {
										$scope.selected_status = element;
									}
								});
								$scope.responsaveis.forEach(element => {
									if ($scope.task.Responsavel == `${element.entityName}|${element.key}`) {
										$scope.selected_responsible = element;
									}
								});
							}
						})
						.catch(function (error) {
							$scope.error(error.message);
						});
				})
				.catch(function (error) {
					$scope.error(error.message);
				});
		};

		function _findCombos() {
			_findTipoTarefa();

		}

		$scope.save = function () {
			$scope.task.Projeto = `Projeto|${_getProjectId()}`;
			$scope.task.Tipo = `Tipo Tarefa|${$scope.selected_typeTask.key}`;
			$scope.task.Responsavel = `BotUser|${$scope.selected_responsible.key}`;
			$scope.task.Status = `Status Tarefa|${$scope.selected_status.key}`;

			var status = {
				"interactors": [{
					"recordAction": "ADD",
					"entityName": "Tarefa",
					"fieldAndValue": $scope.task
				}]
			};

			return CrudService.common.save(status)
				.then(function (response) {
					commonsService.success('Projeto criado com sucesso!');
					$uibModalInstance.close(response.data);
					location.reload();
				})
				.catch(function (error) {
					if (error.objeto.data.exception.includes('EmptyOrNullValueException')) {
						commonsService.error('Campo vazio!');
						return;
					} else {
						if (error.objeto.data.exception.includes('UniqueConstraintException')) {
							commonsService.error('Erro ao salvar projeto!');
							return;
						}
					}
				});
		};

		var init = () => {

			// tasks === undefined ? $scope.task = angular.copy(tasks) : $scope.task = angular.copy(tasks.fields);
			_findCombos();
			
		}
		init();
	};

	TasksModalController.$inject = ['$scope', 'tasks', '$q', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
