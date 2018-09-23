(function () {
	angular
		.module('ktm')
		.controller('TasksCtrl', TasksCtrl);

	function TasksCtrl($scope, CrudService, DTOptionsBuilder, DTColumnDefBuilder, $httpParamSerializer, $location, $uibModal, ConvertUrlService) {

		var id = ConvertUrlService.convertUrl(window.location.hash);

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
		}

		$scope.dtColumnDefs = [
			DTColumnDefBuilder.newColumnDef(0).notSortable().withOption('width', '100px'),
		];

		$scope.dtOptions = DTOptionsBuilder.newOptions().withLanguage(language);

		//Modal
		self.openModal = function (tasks) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/tasks/modal/task-modal.html',
				size: 'md',
				controller: 'TasksModalController',
				controllerAs: '$ctrl',
				resolve: {
					tasks: function () {
						return tasks;
					}
				}
			});
		};

		//Modal
		self.openModalConfirmation = function (tasks) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/tasks/modal/confirmation-modal.html',
				size: 'md',
				controller: 'TasksConfirmationController',
				controllerAs: 'tasksConfirmationCtrl',
				resolve: {
					tasks: function () {
						return tasks;
					}
				}
			});
		};

		const parameter = {
			"interactors": [
				{
					"recordAction": "QUERY_ADD",
					"entityName": "Tarefa",
					"fieldAndValue": {
						"Projeto": `Projeto|${id}`
					}
				}
			]
		};

		function _findTasks() {
			CrudService.common.findAll(parameter)
				.then(function (response) {
					var tasks = response.data;
					_findPretty(tasks);
				})
				.catch(function (error) {
					commonsService.error('Erro ao obter os dados');
				});
		};

		function _findPretty(tasks) {
			CrudService.common.findAllPretty(tasks)
				.then(function (response) {
					$scope.tasks = response.data;
				})
				.catch(function (error) {
					commonsService.error('Erro ao obter os dados');
				});
		};

		$scope.isAdmin = () => sessionStorage.getItem('role') === 'Admin' ? true : false;

		var init = function () {
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
						_findTasks();
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

	TasksCtrl.$inject = ['$scope', 'CrudService', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$httpParamSerializer', '$location', '$uibModal', 'ConvertUrlService'];
})();