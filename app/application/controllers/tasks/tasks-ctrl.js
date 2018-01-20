(function () {
	angular
		.module('ktm')
		.controller('TasksCtrl', TasksCtrl);
	
	function TasksCtrl($scope, CrudService,DTOptionsBuilder, DTColumnDefBuilder, $httpParamSerializer, $location, $uibModal) {
		
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

		$scope.dtOptions = DTOptionsBuilder.newOptions()
		.withLanguage(language);

        //Modal
		self.openModal = function(tasks) {
            var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/tasks/modal/tasks-modal.html',
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
		 self.openModalConfirmation = function(tasks) {
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
		
		// $scope.load = function(){
		// 	CrudService.tasks.findAll()
		// 	.then(function(response){
		// 		$scope.patients = response.data;
		// 	})
		// 	.catch(function (error) {
		// 		$scope.error(error.message);
		// 	});
		// };
    	
    	//Remove
        self.remove = function (id) {
    		CrudService.tasks.remove(id)
    		.then(function(response){
    			self.load();
    			commonsService.success('tasks.alert.success');
    		});
		}
		
		// $scope.load();
        
        
	};
	
	TasksCtrl.$inject = ['$scope', 'CrudService','DTOptionsBuilder','DTColumnDefBuilder', '$httpParamSerializer', '$location', '$uibModal'];
})();