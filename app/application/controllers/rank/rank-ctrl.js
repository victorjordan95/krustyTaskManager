(function () {
	angular
		.module('ktm')
		.controller('RankCtrl', RankCtrl);
	
	function RankCtrl($scope, CrudService,DTOptionsBuilder, DTColumnDefBuilder, $httpParamSerializer, $location, $uibModal) {
		
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
		self.openModal = function(rank) {
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
		 self.openModalConfirmation = function(rank) {
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
		
		// $scope.load = function(){
		// 	CrudService.common.findAll()
		// 	.then(function(response){
		// 		$scope.patients = response.data;
		// 	})
		// 	.catch(function (error) {
		// 		$scope.error(error.message);
		// 	});
		// };
    	
    	//Remove
        self.remove = function (id) {
    		CrudService.rank.remove(id)
    		.then(function(response){
    			self.load();
    			commonsService.success('rank.alert.success');
    		});
		}
		
		// $scope.load();
        
        
	};
	
	RankCtrl.$inject = ['$scope', 'CrudService','DTOptionsBuilder','DTColumnDefBuilder', '$httpParamSerializer', '$location', '$uibModal'];
})();