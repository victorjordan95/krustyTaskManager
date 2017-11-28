(function () {
	angular
		.module('sgp')
		.controller('BusinessDeleteController', BusinessDeleteController);
	function BusinessDeleteController($scope, business, CrudService, $uibModalInstance, commonsService) {
		
		var self = this;
		
		self.businessElement = {};
		
		self.cancel = function() {
			$uibModalInstance.close();
		};

		self.delete = function() {
			return CrudService.business.delete(self.businessElement.id).then(function(response) {
				commonsService.success('business.alert.removeSuccess');
				$uibModalInstance.close(response.data);
				})
	            .catch(function(error) {
	            	if (error.objeto.data.exception.includes('LinkedExpcetion')) {
	            		commonsService.error('business.alert.linkedException');
	            	}else{
	            		commonsService.error('common.alert.genericError');
	            	}
	            });
		};
		
		var init = function() {
			self.businessElement = angular.copy(business);
		}

		init();
	};
	
	BusinessDeleteController.$inject = ['$scope', 'business', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
