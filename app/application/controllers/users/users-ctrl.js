(function () {
	angular
		.module('ktm')
		.controller('UsersCtrl', UsersCtrl);

	function UsersCtrl($scope, CrudService, DTOptionsBuilder, DTColumnDefBuilder, $httpParamSerializer, $location, $uibModal, commonsService, DataTableService) {

		var self = this;

		var language = DataTableService.language;

		$scope.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(0).notSortable().withOption('width', '100px')];

		$scope.dtOptions = DTOptionsBuilder.newOptions().withLanguage(language);

		const parameter = {
			"interactors": [{
				"recordAction": "QUERY_ADD",
				"entityName": "BotUser"
			}]
		};

		function _findPretty(users) {
			CrudService.users.findAllPretty(users)
				.then(function (response) {
					$scope.usersPretty = response.data;
				})
				.catch(function (error) {
					commonsService.error('Erro ao obter os dados');
				});
		};

		(function () {
			CrudService.users.findAll(parameter)
				.then(function (response) {
					var users = response.data;
					_findPretty(users);
				})
				.catch(function (error) {
					commonsService.error('Erro ao obter os dados');
				});
		})();

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

	};

	UsersCtrl.$inject = ['$scope', 'CrudService', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$httpParamSerializer', '$location', '$uibModal', 'commonsService', 'DataTableService'];
})();