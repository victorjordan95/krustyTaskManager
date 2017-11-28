(function () {
	angular
		.module('sgp')
		.controller('DivisionDeleteController', DivisionDeleteController);
	function DivisionDeleteController($scope, division, CrudService, $uibModalInstance, commonsService) {
		
		var self = this;
		
		self.divisionElement = {};
		
		self.cancel = function() {
			$uibModalInstance.close();
		};

		self.delete = function() {
			return CrudService.division.delete(self.divisionElement.id).then(function(response) {
				commonsService.success('division.alert.removeSuccess');
				$uibModalInstance.close(response.data);
				})
	            .catch(function(error) {
	            	if (error.objeto.data.exception.includes('LinkedExpcetion')) {
	            		commonsService.error('division.alert.linkedException');
	            	}else{
	            		commonsService.error('common.alert.genericError');
	            	}
	            });
		};
		
		var init = function() {
			self.divisionElement = angular.copy(division);
		}

		init();
	};
	
	DivisionDeleteController.$inject = ['$scope', 'division', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
