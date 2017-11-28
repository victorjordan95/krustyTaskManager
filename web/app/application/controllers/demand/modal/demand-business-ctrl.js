(function () {
	angular
		.module('app')
		.controller('DemandBusinessModalCtrl', DemandBusinessModalCtrl);
	function DemandBusinessModalCtrl($scope, $uibModalInstance, demand, CrudService) {
	
		var self = this;
		$scope.demandBusiness = demand;
		
		self.cancel = function() {
			$uibModalInstance.close();
		};
		
	};
	DemandBusinessModalCtrl.$inject = ['$scope', '$uibModalInstance', 'demand', 'CrudService'];
		
})();