(function () {
	angular
		.module('ktm')
		.controller('TypeStatusCtrl', TypeStatusCtrl);
	function TypeStatusCtrl($scope, CrudService, DTOptionsBuilder, DTColumnDefBuilder, $httpParamSerializer, $location, $uibModal, commonsService) {
		
		const parameter = {
			"interactors": [{
				"recordAction": "QUERY_ADD",
				"entityName": "Status Tarefa"
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

		function _findPretty(status) {
			CrudService.common.findAllPretty(status)
				.then(function (response) {
					$scope.statusPretty = response.data;
				})
				.catch(function (error) {
					$scope.error(error.message);
				});
		};

		function _findStatus() {
			CrudService.common.findAll(parameter)
				.then(function (response) {
					var status = response.data;
					_findPretty(status);
				})
				.catch(function (error) {
					$scope.error(error.message);
				});
		};

		//Modal
		self.openModal = function (typeStatus) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/typeStatus/modal/typeStatus-modal.html',
				size: 'md',
				controller: 'TypeStatusModalController',
				controllerAs: '$ctrl',
				resolve: {
					typeStatus: function () {
						return typeStatus;
					}
				}
			});
		};

		//Modal
		self.openModalConfirmation = function (typeStatus) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/typeStatus/modal/confirmation-modal.html',
				size: 'md',
				controller: 'TypeStatusConfirmationController',
				controllerAs: 'typeStatusConfirmationCtrl',
				resolve: {
					typeStatus: function () {
						return typeStatus;
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
						_findStatus();
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

	TypeStatusCtrl.$inject = ['$scope', 'CrudService', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$httpParamSerializer', '$location', '$uibModal', 'commonsService'];
})();