(function () {
	angular
		.module('ktm')
		.controller('TypeStatusModalController', TypeStatusModalController);
	function TypeStatusModalController($scope, typeStatus, CrudService, $uibModalInstance, commonsService) {

		var self = this;
		var projectKey;
		$scope.typeStatusModal = {};
		$scope.typeStatusModal.active = '1';

		$scope.dtInstance = {};

		$scope.clients = [
			{ Cliente : "Selecione uma opção" },
			{ Cliente : "Cliente|Iniciativa|1" },
		];

		$scope.cancel = () => $uibModalInstance.close();

		$scope.reloadData = () => $scope.dtInstance.rerender();

		self.load = function(){
			CrudService.common.findAll()
			.then(function(response){
				$scope.patients = response.data;
			})
			.catch(function (error) {
				$scope.error(error.message);
			});
		};

		$scope.save = function () {
			var project = {
				"interactors":[
					{
						"recordAction" : "ADD",
						"entityName" : "Projeto",
						"fieldAndValue" : {
							"Nome" : $scope.typeStatusModal.Nome,
							"Custo" : $scope.typeStatusModal.Custo,
							"Cliente" : $scope.typeStatusModal.Cliente,
							"Descricao" : $scope.typeStatusModal.Descricao,
							"Requisitos" : $scope.typeStatusModal.Requisitos
						}
					}	
				]
			};
			return CrudService.projects.save(project)
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

		var init = function() {
		}

		init();
	};

	TypeStatusModalController.$inject = ['$scope', 'typeStatus', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
