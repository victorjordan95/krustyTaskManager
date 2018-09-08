(function () {
	angular
		.module('ktm')
		.controller('ClientModalController', ClientModalController);
	function ClientModalController($scope, client, CrudService, $uibModalInstance, commonsService) {

		$scope.clientModal = {};
		$scope.clientModal.active = '1';

		$scope.dtInstance = {};

		$scope.cancel = () => $uibModalInstance.close();

		$scope.reloadData = () => $scope.dtInstance.rerender();

		$scope.save = function () {
			var status = {
				"interactors":[
					{
						"recordAction" : "ADD",
						"entityName" : "Cliente",
						"fieldAndValue" : {
							"Nome" : $scope.client.Nome,
							"Telefone" : $scope.client.Telefone,
							"E-mail" : $scope.client['E-mail']
						}
					}	
				]
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

		var init = () => client  === undefined ? $scope.client = angular.copy(client) : $scope.client = angular.copy(client.fields);
		init();
	};

	ClientModalController.$inject = ['$scope', 'client', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
