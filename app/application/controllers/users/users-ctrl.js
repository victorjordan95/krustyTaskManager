(function () {
	angular
		.module('ktm')
		.controller('UsersCtrl', UsersCtrl);
	
	function UsersCtrl($scope, CrudService,DTOptionsBuilder, DTColumnDefBuilder, $httpParamSerializer, $location, $uibModal, commonsService) {
		
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
		self.openModal = function(users) {
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
		 self.openModalConfirmation = function(users) {
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
		
		$scope.load = function(){
			CrudService.users.findAll()
			.then(function(response){
				$scope.users = response.data;
			})
			.catch(function (error) {
				commonsService.error('Erro ao obter os dados');
				// $scope.error(error.message);
			});
		};
    	
    	//Remove
        self.remove = function (id) {
    		CrudService.users.remove(id)
    		.then(function(response){
    			self.load();
    			commonsService.success('users.alert.success');
    		});
		}
		
		$scope.load();
        
        
	};
	
	UsersCtrl.$inject = ['$scope', 'CrudService','DTOptionsBuilder','DTColumnDefBuilder', '$httpParamSerializer', '$location', '$uibModal', 'commonsService'];
})();