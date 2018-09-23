(function () {
	angular
		.module('ktm')
		.controller('ProjectsModalController', ProjectsModalController);
	function ProjectsModalController($scope, projects, CrudService, $uibModalInstance, commonsService) {

		var self = this;
		var projectKey;
		$scope.projectModal = {};
		$scope.projectModal.active = '1';

		$scope.dtInstance = {};

		$scope.cancel = () => $uibModalInstance.close();

		$scope.reloadData = () => $scope.dtInstance.rerender();

		// self.load = function(){
		// 	CrudService.common.findAll()
		// 	.then(function(response){
		// 		$scope.patients = response.data;
		// 	})
		// 	.catch(function (error) {
		// 		$scope.error(error.message);
		// 	});
		// };

		function _findPretty(clientes) {
			CrudService.common.findAllPretty(clientes)
				.then(function (response) {
					$scope.clientesPretty = response.data;
					
					if(projects === undefined){
						$scope.selected_client = $scope.clientesPretty[0];
						$scope.projectModal = angular.copy(projects);
					}else{
						$scope.projectModal = angular.copy(projects.fields);
						projectKey = projects.key;
						$scope.clientesPretty.forEach(element => {
							if($scope.projectModal.Cliente == `${element.entityName}|${element.key}`){
								$scope.selected_client = element;
							}
						});
					}
				})
				.catch(function (error) {
					$scope.error(error.message);
				});
		};

		function _findClients() {
			const parameter = {
				"interactors": [{
					"recordAction": "QUERY_ADD",
					"entityName": "Cliente"
				}]
			};
			CrudService.common.findAll(parameter)
				.then(function (response) {
					var clientes = response.data;
					_findPretty(clientes);
				})
				.catch(function (error) {
					$scope.error(error.message);
				});
		};


		$scope.save = function () {
			$scope.projectModal.Cliente = $scope.selected_client.Cliente;
			var project = {
				"interactors":[
					{
						"recordAction" : "ADD",
						"entityName" : "Projeto",
						"fieldAndValue" : $scope.projectModal
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
			_findClients();
		}

		init();
	};

	ProjectsModalController.$inject = ['$scope', 'projects', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
