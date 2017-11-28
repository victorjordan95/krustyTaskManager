(function () {
	angular
		.module('sgp')
		.controller('PendencyModalController', PendencyModalController);
	function PendencyModalController($scope, pendency, CrudService, $uibModalInstance, commonsService) {
		
		$scope.pendencyModal = {};
		$scope.businessList = [];
		$scope.contactList = [];
		$scope.modalityList = [];
		$scope.organizationList = [];
		$scope.clientList = [];
		$scope.contractList = [];
		$scope.responsibleList = [];
		$scope.pendencyModal.active = 1;
		
		
		$scope.cancel = function() {
			$uibModalInstance.close();
		};
		
		$scope.save = function() {
			return CrudService.pendency.save($scope.pendencyModal)
	            .then(function(response){
	            	commonsService.success('pendency.alertPopUp.success');
	            })
	            .catch(function(error){
	            	if (error.objeto.data.exception.includes('EmptyOrNullValueException')) {
	            		commonsService.error('pendency.alertPopUp.emptyOrNullValueException');
	            	}else{
	            		commonsService.error('common.alert.genericError');
	            	}
	            	return;
	            });
		};
		
		$scope.loadBusinessActive = function(){
			return CrudService.pendency.loadBusinessActive($scope.pendencyModal.active).then(function(response){
				$scope.businessList = response.data;
			});
		};
		
		var init = function() {
			$scope.pendencyModal = angular.copy(pendency);
		}
		
		init();
	};
	
	PendencyModalController.$inject = ['$scope', 'pendency', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
