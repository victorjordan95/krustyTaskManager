(function () {
	angular
		.module('sgp')
		.controller('BusinessRegisterController', BusinessRegisterController);
	function BusinessRegisterController($scope, business, CrudService, $uibModalInstance, commonsService) {
		
		$scope.businessRegister = {};
		$scope.businessRegister.active = '1';
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
		
		$scope.save = function () {
			if ($scope.businessRegister.name == undefined || $scope.businessRegister.initials == undefined) {
				commonsService.error('business.alert.errorEmptyField');
				return;
			} else {
				CrudService.business.save($scope.businessRegister).then(function(response) {
					commonsService.success('business.alert.success');
					$uibModalInstance.close(response.data);
				}).catch(function(error) {
					var field = error.objeto.data.message;
					if (error.objeto.data.exception.includes('EmptyOrNullValueException')) {
						commonsService.error('business.alert.errorEmptyField');
						return;
					} else if (field == 'Name') {
						commonsService.error('business.alert.errorDuplicateFieldName');
						return;
					} else if (field == 'Initials') {
						commonsService.error('business.alert.errorDuplicateFieldInitials');
						return;
					} else {
						commonsService.error('business.alert.error');
					}
				});
			}
		};
		
		var init = function() {
			$scope.businessRegister = angular.copy(business);
		}

		init();
	};
	
	BusinessRegisterController.$inject = ['$scope', 'business', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
