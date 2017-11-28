(function () {
	angular
		.module('sgp')
		.controller('ModalityConfirmationController', ModalityConfirmationController);
	function ModalityConfirmationController($scope, modality, CrudService, $uibModalInstance, commonsService) {
		
		var self = this;
		
		self.modalityElement = {};
		
		self.cancel = function() {
			$uibModalInstance.close();
		};

		self.delete = function() {
			return CrudService.modality.delete(self.modalityElement.id)
	            .then(function(response){
	            	commonsService.success('modality.alert.removeSuccess');
	            	$uibModalInstance.close(response.data);
	            })
	            .catch(function(error){
	            	if (error.objeto.data.exception.includes('LinkedExpcetion')) {
	            		commonsService.error('modality.alert.linkedException');
	            	}else{
	            		commonsService.error('common.alert.genericError');
	            	}
	            });
		};
		
		var init = function() {
			//To preserve original modality.
			self.modalityElement = angular.copy(modality);
		}

		init();
	};
	
	ModalityConfirmationController.$inject = ['$scope', 'modality', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
