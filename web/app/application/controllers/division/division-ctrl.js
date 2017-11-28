(function () {
	angular
		.module('sgp')
		.controller('DivisionCtrl', DivisionCtrl);
	
	function DivisionCtrl($scope, CrudService, PaginationService, $httpParamSerializer, $location, $uibModal) {
		
		var self = this;
		self.listSortItens = {
			    "name" 		: true,
			    "initials"	: true,
			    "active"	: true,
			    "lastModifiedDate" : true,
			    "lastModifiedBy.fullName"	: true
	        };

		PaginationService.setLoadDataCallBack(CrudService.division.search);
		
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
        self.openModal = function(division) {
        	var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/division/modal/division-modal.html',
				size: 'md',	
				controller: 'DivisionRegisterController',
				controllerAs: '$ctrl',
				resolve: {
					division: function () {
						return division;
					}
				}
			});

            modalInstance.result.then(function() {
            	self.pagination.start();
            });
        };
        
        self.openModalDelete = function(division) {
           var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/division/modal/confirmation-modal.html',
				size: 'md',	
				controller: 'DivisionDeleteController',
				controllerAs: 'divisionDeleteCtrl',
				resolve: {
					division: function () {
						return division;
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
	
	DivisionCtrl.$inject = ['$scope', 'CrudService', 'PaginationService','$httpParamSerializer', '$location', '$uibModal'];
})();