(function () {
	angular
		.module('ktm')
		.controller('RankCtrl', RankCtrl);

	function RankCtrl($scope, CrudService, DTOptionsBuilder, DTColumnDefBuilder, $httpParamSerializer, $location, $uibModal) {

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
			DTColumnDefBuilder.newColumnDef(0).withOption('width', '100px'),
			DTOptionsBuilder.newOptions().withOption('order', [
				[2, 'asc']
			])
		];

		$scope.dtOptions = DTOptionsBuilder.newOptions().withLanguage(language).withOption('order', [
			[2, 'desc']
		]);

		//Modal
		self.openModal = function (rank) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/rank/modal/rank-modal.html',
				size: 'md',
				controller: 'RankModalController',
				controllerAs: '$ctrl',
				resolve: {
					rank: function () {
						return rank;
					}
				}
			});
		};

		//Modal
		self.openModalConfirmation = function (rank) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/rank/modal/confirmation-modal.html',
				size: 'md',
				controller: 'RankConfirmationController',
				controllerAs: 'rankConfirmationCtrl',
				resolve: {
					rank: function () {
						return rank;
					}
				}
			});
		};

		function _findUsers() {
			const parameter = {
				"interactors": [{
					"recordAction": "QUERY_ADD",
					"entityName": "BotUser"
				}]
			};

			CrudService.common.findAll(parameter)
				.then(function (response) {
					var users = response.data;
					_findPretty(users);
				})
				.catch(function (error) {
					commonsService.error('Erro ao obter os dados');
				});
		};

		function _findPretty(users) {
			CrudService.common.findAllPretty(users)
				.then(function (response) {
					$scope.users = response.data;
				})
				.catch(function (error) {
					commonsService.error('Erro ao obter os dados');
				});
		};

		//Remove
		self.remove = function (id) {
			CrudService.rank.remove(id)
				.then(function (response) {
					self.load();
					commonsService.success('rank.alert.success');
				});
		}

		// $scope.load();
		var init = function () {
			var userParamether = {
				"interactors": [{
					"recordAction": "QUERY_ADD",
					"entityName": "BotUser",
					"fieldAndValue": {
						"Id": sessionStorage.getItem('id')
					}
				}]
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
				});
		}

		init();


	};

	RankCtrl.$inject = ['$scope', 'CrudService', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$httpParamSerializer', '$location', '$uibModal'];
})();