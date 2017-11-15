(function () {
	angular
		.module('sgp')
		.controller('ActivityCtrl', ActivityCtrl);
	
	function ActivityCtrl($scope, CrudService, PaginationService, $httpParamSerializer, $location, $uibModal) {
		
		var self = this;
		self.listSortItens = {
							    "name": true,
							    "initials": true,
							    "active": true,
							    "lastModifiedDate": true,
							    "lastModifiedBy.fullName": true
					        };
		
		PaginationService.setLoadDataCallBack(CrudService.activity.search);
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
		self.openModal = function(activity) {
            var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/activity/modal/activity-modal.html',
				size: 'md',	
				controller: 'ActivityModalController',
				controllerAs: '$ctrl',
				resolve: {
					activity: function () {
						return activity;
					}
				}
			});

            modalInstance.result.then(function() {
            	self.pagination.start();
            });
        };
        
    	//Modal
		 self.openModalConfirmation = function(activity) {
            var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/activity/modal/confirmation-modal.html',
				size: 'md',	
				controller: 'activityConfirmationController',
				controllerAs: 'activityConfirmationCtrl',
				resolve: {
					activity: function () {
						return activity;
					}
				}
			});

            modalInstance.result.then(function() {
            	self.pagination.start();
            });
        };
    	
    	//Remove
        self.remove = function (id) {
    		CrudService.activity.remove(id)
    		.then(function(response){
    			self.load();
    			commonsService.success('activity.alert.success');
    		});
    	}
        
        self.pagination.start();
        //self.pagination.setListSortItens(self.listSortItens);
        
	};
	
	ActivityCtrl.$inject = ['$scope', 'CrudService', 'PaginationService','$httpParamSerializer', '$location', '$uibModal'];
})();