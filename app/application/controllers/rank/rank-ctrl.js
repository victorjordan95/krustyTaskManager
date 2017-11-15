(function () {
	angular
		.module('sgp')
		.controller('RankCtrl', RankCtrl);
	
	function RankCtrl($scope, CrudService, PaginationService, $httpParamSerializer, $location, $uibModal) {
		
		var self = this;
		self.listSortItens = {
							    "name": true,
							    "initials": true,
							    "active": true,
							    "lastModifiedDate": true,
							    "lastModifiedBy.fullName": true
					        };
		
		PaginationService.setLoadDataCallBack(CrudService.rank.search);
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

            modalInstance.result.then(function() {
            	self.pagination.start();
            });
        };
        
    	//Modal
		 self.openModalConfirmation = function(rank) {
            var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/rank/modal/confirmation-modal.html',
				size: 'md',	
				controller: 'rankConfirmationController',
				controllerAs: 'rankConfirmationCtrl',
				resolve: {
					rank: function () {
						return rank;
					}
				}
			});

            modalInstance.result.then(function() {
            	self.pagination.start();
            });
        };
    	
    	//Remove
        self.remove = function (id) {
    		CrudService.rank.remove(id)
    		.then(function(response){
    			self.load();
    			commonsService.success('rank.alert.success');
    		});
    	}
        
        self.pagination.start();
        //self.pagination.setListSortItens(self.listSortItens);
        
	};
	
	RankCtrl.$inject = ['$scope', 'CrudService', 'PaginationService','$httpParamSerializer', '$location', '$uibModal'];
})();