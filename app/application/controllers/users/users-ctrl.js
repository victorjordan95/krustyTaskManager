(function () {
	angular
		.module('ktm')
		.controller('UsersCtrl', UsersCtrl);

	function UsersCtrl($scope, CrudService, DTOptionsBuilder, DTColumnDefBuilder, $httpParamSerializer, $location, $uibModal, commonsService) {

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

		const parameter = {
			"interactors": [{
				"recordAction": "QUERY_ADD",
				"entityName": "BotUser"
			}]
		};

		function _findPretty(users) {
			CrudService.common.findAllPretty(users)
				.then(function (response) {
					$scope.usersPretty = response.data;
				})
				.catch(function (error) {
					commonsService.error('Erro ao obter os dados');
				});
		};

		function _findUsers() {
			CrudService.common.findAll(parameter)
				.then(function (response) {
					var users = response.data;
					_findPretty(users);
				})
				.catch(function (error) {
					commonsService.error('Erro ao obter os dados');
				});
		};

		//Modal
		self.openModal = function (users) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/users/modal/users-modal.html',
				size: 'md',
				controller: 'UsersModalController',
				controllerAs: '$ctrl',
				resolve: {
					users: function () {
						return users;
					}
				}
			});
		};

		//Modal
		self.openModalConfirmation = function (users) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/users/modal/confirmation-modal.html',
				size: 'md',
				controller: 'UsersConfirmationController',
				controllerAs: 'usersConfirmationCtrl',
				resolve: {
					users: function () {
						return users;
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
						_findUsers();
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

	UsersCtrl.$inject = ['$scope', 'CrudService', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$httpParamSerializer', '$location', '$uibModal', 'commonsService'];
})();