(function () {
	angular
		.module('sgp')
		.controller('DemandConfirmationCtrl', DemandConfirmationCtrl);
	function DemandConfirmationCtrl($scope, demand, CrudService, $uibModalInstance, commonsService) {
		
		var self = this;
		self.demandElement = {};
		
		self.cancel = function() {
			$uibModalInstance.close();
		};

		self.delete = function() {
			return CrudService.demand.delete(self.demandElement.id)
	            .then(function(response){
	            	commonsService.success('demand.alertPopUp.removeSuccess');
	            	$uibModalInstance.close();
	            })
	            .catch(function(error){
	            	if (error.objeto.data.exception.includes('LinkedExpcetion')) {
	            		commonsService.error('demand.alertPopUp.linkedException');
	            	}else{
	            		commonsService.error('common.alert.genericError');
	            	}
	            });
		};
		
		var init = function() {
			//To preserve original demand.
			self.demandElement = angular.copy(demand);
		}

		init();
	};
	
	DemandConfirmationCtrl.$inject = ['$scope', 'demand', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
