(function () {
	angular
		.module('ktm')
		.controller('UsersCtrl', UsersCtrl);

	function UsersCtrl($scope, CrudService, DTOptionsBuilder, DTColumnDefBuilder, $httpParamSerializer, $location, $uibModal, commonsService, DataTableService) {
		// const url = 'https://chatbotbycasseb.herokuapp.com/setTransaction';
		const parameter = {
			"interactors": [{
				"recordAction": "QUERY_ADD",
				"entityName": "DJ"
			}]
		};
		var self = this;

		var language = DataTableService.language;

		$scope.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(0).notSortable().withOption('width', '100px')];

		$scope.dtOptions = DTOptionsBuilder.newOptions().withLanguage(language);



		function _findPretty(tasks) {
			CrudService.tasks.findAllPretty(tasks)
				.then(function (response) {
					$scope.tasksPretty = response.data;
					console.log($scope.tasksPretty);
				})
				.catch(function (error) {
					$scope.error(error.message);
				});
		};

		//Immediately-invoked function expression (IIFE)
		(function () {
			console.log('IIFE');
			CrudService.tasks.findAll(parameter)
				.then(function (response) {
					var tasks = response.data;
					_findPretty(tasks);
				})
				.catch(function (error) {
					$scope.error(error.message);
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

		//Remove
		self.remove = function (id) {
			CrudService.users.remove(id)
				.then(function (response) {
					self.load();
					commonsService.success('users.alert.success');
				});
		}



	};

	UsersCtrl.$inject = ['$scope', 'CrudService', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$httpParamSerializer', '$location', '$uibModal', 'commonsService', 'DataTableService'];
})();