(function () {
	angular
		.module('ktm')
		.controller('ProjectsCtrl', ProjectsCtrl);

	function ProjectsCtrl($scope, CrudService, DTOptionsBuilder, DTColumnDefBuilder, $httpParamSerializer, $location, $uibModal, commonsService, DataTableService) {
		// const url = 'https://chatbotbycasseb.herokuapp.com/setTransaction';
		const parameter = {
			"interactors": [{
				"recordAction": "QUERY_ADD",
				"entityName": "Projeto"
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
		self.openModal = function (projects) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/projects/modal/projects-modal.html',
				size: 'md',
				controller: 'UsersModalController',
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
				controller: 'UsersConfirmationController',
				controllerAs: 'projectsConfirmationCtrl',
				resolve: {
					projects: function () {
						return projects;
					}
				}
			});
		};

		//Remove
		self.remove = function (id) {
			CrudService.projects.remove(id)
				.then(function (response) {
					self.load();
					commonsService.success('projects.alert.success');
				});
		}



	};

	ProjectsCtrl.$inject = ['$scope', 'CrudService', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$httpParamSerializer', '$location', '$uibModal', 'commonsService', 'DataTableService'];
})();