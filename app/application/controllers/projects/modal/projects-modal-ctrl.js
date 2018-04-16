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

		$scope.clients = [
			{ Cliente : "Selecione uma opção" },
			{ Cliente : "Cliente|Iniciativa|1" },
		];

		$scope.cancel = () => $uibModalInstance.close();

		$scope.reloadData = () => $scope.dtInstance.rerender();

		self.load = function(){
			CrudService.projects.findAll()
			.then(function(response){
				$scope.patients = response.data;
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
						"fieldAndValue" : {
							"Nome" : $scope.projectModal.Nome,
							"Custo" : $scope.projectModal.Custo,
							"Cliente" : $scope.projectModal.Cliente,
							"Descricao" : $scope.projectModal.Descricao,
							"Requisitos" : $scope.projectModal.Requisitos
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
			//new / edit
			if(_.isUndefined(projects)){
				$scope.selected_client = $scope.clients[0];
				$scope.projectModal = angular.copy(projects);
			}else{
				$scope.projectModal = angular.copy(projects.fields);
				projectKey = projects.key;
				_.each($scope.clients, function(client) {
					if($scope.projectModal.Cliente == client.Cliente){
						$scope.selected_client = client;
					}
				});
			}
		}

		init();
	};

	ProjectsModalController.$inject = ['$scope', 'projects', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
