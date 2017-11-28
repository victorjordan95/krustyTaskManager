(function () {
	angular
		.module('sgp')
		.controller('DemandModalController', DemandModalController);
	function DemandModalController($scope, demand, CrudService, $uibModalInstance, commonsService) {
		
		$scope.demandModal = {};
		$scope.divisionList = [];
		$scope.demandModal.active = 1;
		
		$scope.cancel = function() {
			$uibModalInstance.close();
		};
		
		$scope.save = function() {
			// Json to object
			$scope.demandModal.division = angular.fromJson($scope.demandModal.division);
			return CrudService.demand.save($scope.demandModal)
	            .then(function(response){
	            	commonsService.success('demand.alertPopUp.success');
	            	$uibModalInstance.close(response.data);
	            })
	            .catch(function(error){
	            	if (error.objeto.data.exception.includes('EmptyOrNullValueException')) {
	            		commonsService.error('demand.alertPopUp.emptyOrNullValueException');
	            	}else if (error.objeto.data.exception.includes('UniqueConstraintException')) {
	            		commonsService.error('demand.alertPopUp.uniqueConstraintException.'+error.objeto.data.message);
	            		return;
	            	}else{
	            		commonsService.error('common.alert.genericError');
	            	}
	            	return;
	            });
		};
		
		$scope.loadBusinessActive = function(){
			return CrudService.demand.loadDivisionActive($scope.demandModal.active).then(function(response){
				$scope.divisionList = response.data;
			});
		};
		
		var init = function() {
			$scope.loadBusinessActive();
			$scope.demandModal = angular.copy(demand);
		}
		
		init();
	};
	
	DemandModalController.$inject = ['$scope', 'demand', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
