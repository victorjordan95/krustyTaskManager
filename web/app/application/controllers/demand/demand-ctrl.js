(function () {
	angular
		.module('sgp')
		.controller('DemandCtrl', DemandCtrl);
	
	function DemandCtrl($scope, CrudService, PaginationService, $httpParamSerializer, $location, $uibModal) {
		
		var self = this;
		
		PaginationService.setLoadDataCallBack(CrudService.demand.search);
		self.pagination = PaginationService;
		self.pagination.config({
			sort: 'demandDesc,ASC'
		});
		
		self.listSortItens = {
							    "demandDesc": true,
							    "initials": true,
							    "active": true,
							    "division.name": true,
							    "division.initials": true,
							    "deadline": true,
							    "lastModifiedDate": true,
							    "lastModifiedBy.fullName": true
					        };
		
		self.filterSelectedItems = [{"name":"demandDesc","type":"text","show":"1"},
    								{"name":"initials","type":"text","show":"1"},
								    {"name":"active","type":"activeInactive","show":"1"},
    								{"name":"division.name","type":"text","show":"1"},
    								{"name":"division.initials","type":"text","show":"1"},
    								{"name":"deadline","type":"text","show":"1"},
    								{"name":"lastModifiedDate","type":"dateWithMask","show":"1"},
    								{"name":"lastModifiedBy.fullName","type":"text","show":"1"}];
		
        //Modal
		self.openModal = function(demand) {
            var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/demand/modal/demand-modal.html',
				size: 'md',	
				controller: 'DemandModalController',
				controllerAs: '$ctrl',
				resolve: {
					demand: function () {
						return demand;
					}
				}
			});

            modalInstance.result.then(function() {
            	self.pagination.start();
            });
        };

		self.openModalConfirmation = function(demand) {
            var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/demand/modal/confirmation-modal.html',
				size: 'md',	
				controller: 'DemandConfirmationCtrl',
				controllerAs: 'demandConfirmationCtrl',
				resolve: {
					demand: function () {
						return demand;
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
	
	DemandCtrl.$inject = ['$scope', 'CrudService', 'PaginationService', '$httpParamSerializer', '$location', '$uibModal'];
})();