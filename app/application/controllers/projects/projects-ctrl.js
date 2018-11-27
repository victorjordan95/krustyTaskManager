(function () {
	angular
		.module('ktm')
		.controller('ProjectsCtrl', ProjectsCtrl);
	function ProjectsCtrl($scope, CrudService, DTOptionsBuilder, DTColumnDefBuilder, $httpParamSerializer, $location, $uibModal, commonsService) {
		
		const parameter = {
			"interactors": [{
				"recordAction": "QUERY_ADD",
				"entityName": "Projeto"
			}]
		};

		var self = this;

		var language = {
			"sEmptyTable": "Nenhum registro encontrado",
			"sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
			"sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
			"sInfoFiltered": "(Filtrados de _MAX_ registros)",
			"sInfoPostFix": "",
			"sInfoThousands": ".",
			"sLengthMenu": "_MENU_ resultados por página",
			"sLoadingRecords": "Carregando...",
			"sProcessing": "Processando...",
			"sZeroRecords": "Nenhum registro encontrado",
			"sSearch": "Pesquisar",
			"oPaginate": {
				"sNext": "Próximo",
				"sPrevious": "Anterior",
				"sFirst": "Primeiro",
				"sLast": "Último"
			},
			"oAria": {
				"sSortAscending": ": Ordenar colunas de forma ascendente",
				"sSortDescending": ": Ordenar colunas de forma descendente"
			}
		};

		$scope.isAdmin = () => sessionStorage.getItem('role') === 'Admin' ? true : false;

		$scope.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(0).notSortable().withOption('width', '100px')];

		$scope.dtOptions = DTOptionsBuilder.newOptions().withLanguage(language);

		function _findPretty(projects) {
			CrudService.common.findAllPretty(projects)
				.then(function (response) {
					$scope.projectsPretty = response.data;
				})
				.catch(function (error) {
					$scope.error(error.message);
				});
		};

		function _findProjects() {
			CrudService.common.findAll(parameter)
				.then(function (response) {
					var projects = response.data;
					_findPretty(projects);
				})
				.catch(function (error) {
					$scope.error(error.message);
				});
		};

		//Modal
		self.openModal = function (projects) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/projects/modal/projects-modal.html',
				size: 'md',
				controller: 'ProjectsModalController',
				controllerAs: '$ctrl',
				resolve: {
					projects: function () {
						return projects;
					}
				}
			});
		};

		//Modal
		self.openModalConfirmation = function (projects) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/projects/modal/confirmation-modal.html',
				size: 'md',
				controller: 'ProjectsConfirmationController',
				controllerAs: 'projectsConfirmationCtrl',
				resolve: {
					projects: function () {
						return projects;
					}
				}
			});
		};

		var init = function() {
			var userParamether = {
				"interactors": [
					{
						"recordAction": "QUERY_ADD",
						"entityName": "BotUser",
						"fieldAndValue": {
							"Id": sessionStorage.getItem('id')
						}
					}
				]
			};

			CrudService.common.findAll(userParamether)
				.then(function (response) {
					if (response.data.recordsResult.length === 1) {
						_findProjects();
					} else {
						sessionStorage.setItem("id", undefined);
						sessionStorage.setItem("username", undefined);
						sessionStorage.setItem("name", undefined);
						sessionStorage.setItem("role", undefined);
						$location.path("/");
					}
				}).catch(function (error) {
					commonsService.error('Erro ao realizar consulta de usuário.');
				})
			;
		}

		init();

	};

	ProjectsCtrl.$inject = ['$scope', 'CrudService', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$httpParamSerializer', '$location', '$uibModal', 'commonsService'];
})();