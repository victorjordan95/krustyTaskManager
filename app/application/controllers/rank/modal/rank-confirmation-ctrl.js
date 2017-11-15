(function () {
	angular
		.module('sgp')
		.controller('RankConfirmationController', RankConfirmationController);
	function RankConfirmationController($scope, rank, CrudService, $uibModalInstance, commonsService) {
		
		var self = this;
		
		self.rankElement = {};
		
		self.cancel = function() {
			$uibModalInstance.close();
		};

		self.delete = function() {
			return CrudService.rank.delete(self.rankElement.id)
	            .then(function(response){
	            	commonsService.success('rank.alert.removeSuccess');
	            	$uibModalInstance.close(response.data);
	            })
	            .catch(function(error){
	            	if (error.objeto.data.exception.includes('LinkedExpcetion')) {
	            		commonsService.error('rank.alert.linkedException');
	            	}else{
	            		commonsService.error('common.alert.genericError');
	            	}
	            });
		};
		
		var init = function() {
			//To preserve original rank.
			self.rankElement = angular.copy(rank);
		}

		init();
	};
	
	RankConfirmationController.$inject = ['$scope', 'rank', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
