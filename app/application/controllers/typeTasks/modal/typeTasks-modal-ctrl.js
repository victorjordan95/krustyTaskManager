(function () {
	angular
		.module('ktm')
		.controller('typeTasksModalController', typeTasksModalController);

	function typeTasksModalController($scope, typeTask, CrudService, $uibModalInstance, commonsService) {

		var self = this;
		var projectKey, isEditing, oldValue;
		$scope.projectModal = {};
		$scope.projectModal.active = '1';

		$scope.dtInstance = {};

		$scope.cancel = () => $uibModalInstance.close();

		$scope.reloadData = () => $scope.dtInstance.rerender();

		$scope.save = function () {

			var typeTask = {
				"interactors": [{
					"recordAction": "ADD",
					"entityName": "Tipo Tarefa",
					"fieldAndValue": {
						"Nome": $scope.typeTask.Nome,
					}
				}]
			};
		
			if (isEditing) {
		
				var oldTypeTask = {
					"interactors": [{
						"recordAction": "DELETE",
						"entityName": "Tipo Tarefa",
						"recordLine": oldValue.key
					}]
				};
		
				return CrudService.common.delete(oldTypeTask)
		
					.then(function (response) {
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
		
			} else {
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
			}
		};


		var init = () => {
			if (typeTask === undefined){
				$scope.typeTask = angular.copy(typeTask)
				isEditing  = false;
			} else {
				$scope.typeTask = angular.copy(typeTask.fields);
				oldValue = angular.copy(typeTask)
				isEditing  = true;
			}
		}
		init();
	};

	typeTasksModalController.$inject = ['$scope', 'typeTask', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
