(function () {
	angular
		.module('sgp')
		.controller('ModalityModalController', ModalityModalController);
	function ModalityModalController($scope, modality, CrudService, $uibModalInstance, commonsService) {
		
		$scope.modalityModal = {};
		$scope.modalityModal.active = '1';
		
		$scope.cancel = function() {
			$uibModalInstance.close();
		};
		
		$scope.save = function() {
			return CrudService.modality.save($scope.modalityModal)
	            .then(function(response){
	            	commonsService.success('modality.alert.success');
	            	$uibModalInstance.close(response.data);
	            })
	            .catch(function(error){
	            	if (error.objeto.data.exception.includes('EmptyOrNullValueException')) {
	            		commonsService.error('modality.alert.emptyOrNullValueException');
	            		return;
	            	}else{
	            		if (error.objeto.data.exception.includes('UniqueConstraintException')) {
		            		commonsService.error('modality.alert.uniqueConstraintException.'+error.objeto.data.message);
		            		return;
		            	}
	            	}
	            });
		};
		
		var init = function() {
			//To preserve original modality.
			$scope.modalityModal = angular.copy(modality);
		}

		init();
	};
	
	ModalityModalController.$inject = ['$scope', 'modality', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
