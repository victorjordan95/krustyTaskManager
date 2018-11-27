(function () {
	angular
		.module('ktm')
		.controller('TypeTaskCtrl', TypeTaskCtrl);

	function TypeTaskCtrl($scope, CrudService, DTOptionsBuilder, DTColumnDefBuilder, $httpParamSerializer, $location, $uibModal, commonsService) {
		const parameter = {
			"interactors": [{
				"recordAction": "QUERY_ADD",
				"entityName": "Tipo Tarefa"
			}]
		};
		var self = this;

		$scope.isAdmin = () => sessionStorage.getItem('role') === 'Admin' ? true : false;

		var language = {
			"sEmptyTable": "Nenhum registro encontrado",
			"sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
			"sInfoEmpty": "Nenhum registro encontrado",
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

		//Immediately-invoked function expression (IIFE)
		(function () {
			CrudService.common.findAll(parameter)
				.then(function (response) {
					var typeTasks = response.data;
					_findPretty(typeTasks);
				})
				.catch(function (error) {
					commonsService.error('Erro ao obter os dados');
				});
		})();

		function _findPretty(typeTasks) {
			CrudService.common.findAllPretty(typeTasks)
				.then(function (response) {
					$scope.typeTasksPretty = response.data;
				})
				.catch(function (error) {
					commonsService.error('Erro ao obter os dados');
				});
		};


		//Modal
		self.openModal = function (typeTask) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/typeTasks/modal/typeTasks-modal.html',
				size: 'md',
				controller: 'typeTasksModalController',
				controllerAs: '$ctrl',
				resolve: {
					typeTask: function () {
						return typeTask;
					}
				}
			});
		};

		//Modal
		self.openModalConfirmation = function (typeTask) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/typeTasks/modal/confirmation-modal.html',
				size: 'md',
				controller: 'TypeTasksConfirmationController',
				controllerAs: 'typeTasksConfirmationController',
				resolve: {
					typeTask: function () {
						return typeTask;
					}
				}
			});
		};

	};

	TypeTaskCtrl.$inject = ['$scope', 'CrudService', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$httpParamSerializer', '$location', '$uibModal', 'commonsService'];
})();