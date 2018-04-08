(function () {
	angular
		.module('ktm')
		.controller('typeTasksModalController', typeTasksModalController);
	function typeTasksModalController($scope, typeTask, CrudService, $uibModalInstance, commonsService) {

		var self = this;
		var projectKey;
		$scope.projectModal = {};
		$scope.projectModal.active = '1';

		$scope.dtInstance = {};

		$scope.cancel = () => $uibModalInstance.close();

		$scope.reloadData = () => $scope.dtInstance.rerender();

		self.load = function () {
			CrudService.typeTasks.findAll()
				.then(function (response) {
					$scope.patients = response.data;
				})
				.catch(function (error) {
					$scope.error(error.message);
				});
		};

		$scope.save = function () {
			var typeTask = {
				"interactors": [
					{
						"recordAction": "ADD",
						"entityName": "Tipo Tarefa",
						"fieldAndValue": {
							"Nome": $scope.typeTask.Nome,
						}
					}
				]
			};
			return CrudService.typeTasks.save(typeTask)
				.then(function (response) {
					commonsService.success('Tipo de tarefa criado com sucesso!');
					$uibModalInstance.close(response.data);
					location.reload();
				})
				.catch(function (error) {
					if (error.objeto.data.exception.includes('EmptyOrNullValueException')) {
						commonsService.error('typeTasks.alert.emptyOrNullValueException');
						return;
					} else {
						if (error.objeto.data.exception.includes('UniqueConstraintException')) {
							commonsService.error('typeTasks.alert.uniqueConstraintException.' + error.objeto.data.message);
							return;
						}
					}
				});
		};

		var init = () => _.isUndefined(typeTask) ? $scope.typeTask = angular.copy(typeTask) : $scope.typeTask = angular.copy(typeTask.fields);
		init();
	};

	typeTasksModalController.$inject = ['$scope', 'typeTask', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
