(function () {
	angular
		.module('ktm')
		.controller('TasksModalController', TasksModalController);

	function TasksModalController($scope, tasks, CrudService, $uibModalInstance, commonsService) {

		var self = this;
		$scope.typeStatusModal = {};
		$scope.typeStatusModal.active = '1';

		$scope.dtInstance = {};

		$scope.cancel = () => $uibModalInstance.close();

		$scope.reloadData = () => $scope.dtInstance.rerender();

		$scope.save = function () {
			debugger;
			var status = {
				"interactors": [{
					"recordAction": "ADD",
					"entityName": "Status Tarefa",
					"fieldAndValue": {
						"Nome": $scope.typeStatusModal.Nome
					}
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

		var init = () => tasks === undefined ? $scope.tasks = angular.copy(tasks) : $scope.tasks = angular.copy(tasks.fields);
		init();
	};

	TasksModalController.$inject = ['$scope', 'tasks', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
