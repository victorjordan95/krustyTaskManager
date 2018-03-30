(function () {
	angular
		.module('ktm')
		.controller('ProjectsModalController', ProjectsModalController);
	function ProjectsModalController($scope, projects, CrudService, $uibModalInstance, commonsService) {

		var self = this;
		$scope.projectModal = {};
		$scope.projectModal.active = '1';

		$scope.dtInstance = {};

		$scope.states = [
			{ value: '' , estado: 'Selecione um estado'},
			{ value: 'AC', estado: 'Acre' },
			{ value: 'AL', estado: 'Alagoas' },
			{ value: 'AP', estado: 'Amapá' },
			{ value: 'AM', estado: 'Amazonas' },
			{ value: 'BA', estado: 'Bahia' },
			{ value: 'CE', estado: 'Ceará' },
			{ value: 'DF', estado: 'Distrito Federal' },
			{ value: 'ES', estado: 'Espírito Santo' },
			{ value: 'GO', estado: 'Goiás' },
			{ value: 'MA', estado: 'Maranhão' },
			{ value: 'MT', estado: 'Mato Grosso' },
			{ value: 'MS', estado: 'Mato Grosso do Sul' },
			{ value: 'MG', estado: 'Minas Gerais' },
			{ value: 'PA', estado: 'Pará' },
			{ value: 'PB', estado: 'Paraíba' },
			{ value: 'PR', estado: 'Paraná' },
			{ value: 'PE', estado: 'Pernambuco' },
			{ value: 'PI', estado: 'Piauí' },
			{ value: 'RJ', estado: 'Rio de Janeiro' },
			{ value: 'RN', estado: 'Rio Grande do Norte' },
			{ value: 'RS', estado: 'Rio Grande do Sul' },
			{ value: 'RO', estado: 'Rondônia' },
			{ value: 'RR', estado: 'Roraima' },
			{ value: 'SC', estado: 'Santa Catarina' },
			{ value: 'SP', estado: 'São Paulo' },
			{ value: 'SE', estado: 'Sergipe' },
			{ value: 'TO', estado: 'Tocantins' }
		];

		$scope.clients = [
			{ cliente : "Cliente|Iniciativa|1" }
		];

		$scope.cancel = function () {
			$uibModalInstance.close();
		};

		$scope.reloadData = function () {
			$scope.dtInstance.rerender();
		}

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
			debugger;
			$scope.projectModal.cliente = $scope.selected_client.cliente;
			var project = {
				"interactors":[
					{
						"recordAction" : "ADD",
						"entityName" : "Projeto",
						"fieldAndValue" : {
							"Nome" : $scope.projectModal.nome,
							"Custo" : $scope.projectModal.custo,
							"Cliente" : $scope.projectModal.cliente,
							"Descricao" : $scope.projectModal.descricao,
							"Requisitos" : $scope.projectModal.requisitos
						}
					}	
				]
			};
			return CrudService.projects.save(project)
				.then(function (response) {
					commonsService.success('Users criado com sucesso!');
					$uibModalInstance.close(response.data);
					location.reload();
				})
				.catch(function (error) {
					if (error.objeto.data.exception.includes('EmptyOrNullValueException')) {
						commonsService.error('projects.alert.emptyOrNullValueException');
						return;
					} else {
						if (error.objeto.data.exception.includes('UniqueConstraintException')) {
							commonsService.error('projects.alert.uniqueConstraintException.' + error.objeto.data.message);
							return;
						}
					}
				});
		};

		var init = function() {
			//To preserve original organization.
			$scope.projectModal = angular.copy(projects);
			//new / edit
			if(_.isUndefined($scope.projectModal)){
				console.log('creating');
				console.log($scope.states[0]);
		        $scope.selected_state = $scope.states[0];
			}else{
				_.each($scope.states, function(state) {
					//$scope.projectsModal.estado = $scope.selected_state.estado;
					if($scope.projectModal.estado == state.estado){
						console.log('entrou no if ', $scope.projectModal.estado);
						console.log(state)
						$scope.selected_state = state;
					}
				});
			}
		}

		init();
	};

	ProjectsModalController.$inject = ['$scope', 'projects', 'CrudService', '$uibModalInstance', 'commonsService'];
})();