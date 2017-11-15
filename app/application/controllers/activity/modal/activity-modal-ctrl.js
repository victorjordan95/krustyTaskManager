(function () {
	angular
		.module('sgp')
		.controller('ActivityModalController', ActivityModalController);
	function ActivityModalController($scope, activity, CrudService, $uibModalInstance, commonsService) {
		
		$scope.activityModal = {};
		$scope.activityModal.active = '1';
		
		$scope.cancel = function() {
			$uibModalInstance.close();
		};
		
		$scope.save = function() {
			return CrudService.activity.save($scope.activityModal)
	            .then(function(response){
	            	commonsService.success('activity.alert.success');
	            	$uibModalInstance.close(response.data);
	            })
	            .catch(function(error){
	            	if (error.objeto.data.exception.includes('EmptyOrNullValueException')) {
	            		commonsService.error('activity.alert.emptyOrNullValueException');
	            		return;
	            	}else{
	            		if (error.objeto.data.exception.includes('UniqueConstraintException')) {
		            		commonsService.error('activity.alert.uniqueConstraintException.'+error.objeto.data.message);
		            		return;
		            	}
	            	}
	            });
		};
		
		var init = function() {
			//To preserve original activity.
			$scope.activityModal = angular.copy(activity);
		}

		init();
	};
	
	ActivityModalController.$inject = ['$scope', 'activity', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
