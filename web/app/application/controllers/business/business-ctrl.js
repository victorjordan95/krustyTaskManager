(function () {
	angular
		.module('sgp')
		.controller('BusinessCtrl', BusinessCtrl);
	
	function BusinessCtrl($scope, CrudService, PaginationService, $httpParamSerializer, $location, $uibModal) {
		
		var self = this;
		self.listSortItens = {
			    "name" 		: true,
			    "initials"	: true,
			    "active"	: true,
			    "lastModifiedDate" : true,
			    "lastModifiedBy.fullName"	: true
	        };

		PaginationService.setLoadDataCallBack(CrudService.business.search);
		
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
        self.openModal = function(business) {
        	var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/business/modal/business-modal.html',
				size: 'md',	
				controller: 'BusinessRegisterController',
				controllerAs: '$ctrl',
				resolve: {
					business: function () {
						return business;
					}
				}
			});

            modalInstance.result.then(function() {
            	self.pagination.start();
            });
        };
        
        self.openModalDelete = function(business) {
           var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/business/modal/confirmation-modal.html',
				size: 'md',	
				controller: 'BusinessDeleteController',
				controllerAs: 'businessDeleteCtrl',
				resolve: {
					business: function () {
						return business;
					}
				}
			});
           
           modalInstance.result.then(function() {
        	   self.pagination.start();
           });
       };
        
        self.pagination.start();
        self.pagination.setListSortItens(self.listSortItens);
        
	};
	
	BusinessCtrl.$inject = ['$scope', 'CrudService', 'PaginationService','$httpParamSerializer', '$location', '$uibModal'];
})();