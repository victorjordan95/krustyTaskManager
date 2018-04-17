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

		$scope.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(0).notSortable().withOption('width', '100px')];

		$scope.dtOptions = DTOptionsBuilder.newOptions().withLanguage(language);

		function _findPretty(projects) {
			CrudService.projects.findAllPretty(projects)
				.then(function (response) {
					$scope.projectsPretty = response.data;
				})
				.catch(function (error) {
					$scope.error(error.message);
				});
		};

		(function () {
			CrudService.projects.findAll(parameter)
				.then(function (response) {
					var projects = response.data;
					_findPretty(projects);
				})
				.catch(function (error) {
					$scope.error(error.message);
				});
		})();

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

	};

	ProjectsCtrl.$inject = ['$scope', 'CrudService', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$httpParamSerializer', '$location', '$uibModal', 'commonsService'];
})();