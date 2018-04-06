(function () {
	angular
		.module('ktm')
		.controller('TasksCtrl', TasksCtrl);
	
	function TasksCtrl($scope, CrudService,DTOptionsBuilder, DTColumnDefBuilder, $httpParamSerializer, $location, $uibModal) {
		
		var pathArray = window.location.hash.split( '/' );
		var withoutSpace = pathArray[pathArray.length - 1].split("%20");
		var nameProject = "";
		
		withoutSpace.forEach(function(element) {
			element === withoutSpace[withoutSpace.length - 1] ? nameProject += `${element}` : nameProject += `${element} `;
		});
		
		var id = `${pathArray[2]}|${nameProject}`;

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

		const parameter = {
			"interactors": [
				{
					"recordAction": "QUERY_ADD",
					"entityName": "DJ"
				}
			]
		};
	
		$scope.load = function(){
			console.log('entrei no projeto: ' + id)
			CrudService.tasks.findAll(parameter)
			.then(function(response){
				$scope.tasks = response.data;
				console.log($scope.tasks);
			})
			.catch(function (error) {
				$scope.error(error.message);
			});
		}();

		$scope.pretty = function(){
			$scope.load();
			console.log($scope.tasks);
			CrudService.tasks.findAllPretty($scope.tasks)
			.then(function(response){
				$scope.tasksPretty = response.data;
				console.log($scope.tasksPretty);
			})
			.catch(function (error) {
				$scope.error(error.message);
			});
		};
    	
    	//Remove
        self.remove = function (id) {
    		CrudService.tasks.remove(id)
    		.then(function(response){
    			self.load();
    			commonsService.success('tasks.alert.success');
    		});
		}
		
		
        
        
	};
	
	TasksCtrl.$inject = ['$scope', 'CrudService','DTOptionsBuilder','DTColumnDefBuilder', '$httpParamSerializer', '$location', '$uibModal'];
})();