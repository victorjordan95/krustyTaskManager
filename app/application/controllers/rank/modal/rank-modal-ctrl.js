(function () {
	angular
		.module('sgp')
		.controller('RankModalController', RankModalController);
	function RankModalController($scope, rank, CrudService, $uibModalInstance, commonsService) {
		
		$scope.rankModal = {};
		$scope.rankModal.active = '1';
		
		$scope.cancel = function() {
			$uibModalInstance.close();
		};
		
		$scope.save = function() {
			return CrudService.rank.save($scope.rankModal)
	            .then(function(response){
	            	commonsService.success('rank.alert.success');
	            	$uibModalInstance.close(response.data);
	            })
	            .catch(function(error){
	            	if (error.objeto.data.exception.includes('EmptyOrNullValueException')) {
	            		commonsService.error('rank.alert.emptyOrNullValueException');
	            		return;
	            	}else{
	            		if (error.objeto.data.exception.includes('UniqueConstraintException')) {
		            		commonsService.error('rank.alert.uniqueConstraintException.'+error.objeto.data.message);
		            		return;
		            	}
	            	}
	            });
		};
		
		var init = function() {
			//To preserve original rank.
			$scope.rankModal = angular.copy(rank);
		}

		init();
	};
	
	RankModalController.$inject = ['$scope', 'rank', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
