(function () {
	angular
		.module('sgp')
		.controller('ModalityCtrl', ModalityCtrl);
	
	function ModalityCtrl($scope, CrudService, PaginationService, $httpParamSerializer, $location, $uibModal) {
		
		var self = this;
		self.listSortItens = {
							    "name": true,
							    "initials": true,
							    "active": true,
							    "lastModifiedDate": true,
							    "lastModifiedBy.fullName": true
					        };
		
		PaginationService.setLoadDataCallBack(CrudService.modality.search);
		self.pagination = PaginationService;
		self.pagination.config({
			sort: 'name,ASC'
		});
		
		self.filterSelectedItems = [{"name":"name","type":"text","show":"1"},
								    {"name":"initials","type":"text","show":"1"},
								    {"name":"active","type":"activeInactive","show":"1"},
								    {"name":"lastModifiedDate","type":"dateWithMask","show":"1"},
        							{"name":"lastModifiedBy.fullName","type":"text","show":"1"}];
		
        //Modal
		self.openModal = function(modality) {
            var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/modality/modal/modality-modal.html',
				size: 'md',	
				controller: 'ModalityModalController',
				controllerAs: '$ctrl',
				resolve: {
					modality: function () {
						return modality;
					}
				}
			});

            modalInstance.result.then(function() {
            	self.pagination.start();
            });
        };
        
    	//Modal
		 self.openModalConfirmation = function(modality) {
            var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/modality/modal/confirmation-modal.html',
				size: 'md',	
				controller: 'ModalityConfirmationController',
				controllerAs: 'modalityConfirmationCtrl',
				resolve: {
					modality: function () {
						return modality;
					}
				}
			});

            modalInstance.result.then(function() {
            	self.pagination.start();
            });
        };
    	
    	//Remove
        self.remove = function (id) {
    		CrudService.modality.remove(id)
    		.then(function(response){
    			self.load();
    			commonsService.success('modality.alert.success');
    		});
    	}
        
        self.pagination.start();
        self.pagination.setListSortItens(self.listSortItens);
        
	};
	
	ModalityCtrl.$inject = ['$scope', 'CrudService', 'PaginationService','$httpParamSerializer', '$location', '$uibModal'];
})();