(function () {
	angular
		.module('sgp')
		.controller('OrganizationConfirmationController', OrganizationConfirmationController);
	function OrganizationConfirmationController($scope, organization, CrudService, $uibModalInstance, commonsService) {
		
		var self = this;
		self.organizationElement = {};
		
		self.cancel = function() {
			$uibModalInstance.close();
		};

		self.delete = function() {
			return CrudService.organization.delete(self.organizationElement.id)
	            .then(function(response){
	            	commonsService.success('organization.alert.removeSuccess');
	            	$uibModalInstance.close(response.data);
	            })
	            .catch(function(error){
	            	if (error.objeto.data.exception.includes('LinkedExpcetion')) {
	            		commonsService.error('organization.alert.linkedException');
	            	}else{
	            		commonsService.error('common.alert.genericError');
	            	}
	            });
		};
		
		var init = function() {
			//To preserve original organization.
			self.organizationElement = angular.copy(organization);
		}

		init();
	};
	
	OrganizationConfirmationController.$inject = ['$scope', 'organization', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
