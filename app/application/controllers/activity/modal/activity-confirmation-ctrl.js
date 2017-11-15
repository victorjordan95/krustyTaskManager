(function () {
	angular
		.module('sgp')
		.controller('ActivityConfirmationController', ActivityConfirmationController);
	function ActivityConfirmationController($scope, activity, CrudService, $uibModalInstance, commonsService) {
		
		var self = this;
		
		self.activityElement = {};
		
		self.cancel = function() {
			$uibModalInstance.close();
		};

		self.delete = function() {
			return CrudService.activity.delete(self.activityElement.id)
	            .then(function(response){
	            	commonsService.success('activity.alert.removeSuccess');
	            	$uibModalInstance.close(response.data);
	            })
	            .catch(function(error){
	            	if (error.objeto.data.exception.includes('LinkedExpcetion')) {
	            		commonsService.error('activity.alert.linkedException');
	            	}else{
	            		commonsService.error('common.alert.genericError');
	            	}
	            });
		};
		
		var init = function() {
			//To preserve original activity.
			self.activityElement = angular.copy(activity);
		}

		init();
	};
	
	ActivityConfirmationController.$inject = ['$scope', 'activity', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
