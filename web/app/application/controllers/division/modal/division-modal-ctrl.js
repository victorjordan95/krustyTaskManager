(function () {
	angular
		.module('sgp')
		.controller('DivisionRegisterController', DivisionRegisterController);
	function DivisionRegisterController($scope, division, CrudService, $uibModalInstance, commonsService) {
		
		$scope.divisionRegister = {};
		$scope.divisionRegister.active = '1';
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
		
		$scope.save = function () {
			if ($scope.divisionRegister.name == undefined || $scope.divisionRegister.initials == undefined) {
				commonsService.error('division.alert.errorEmptyField');
				return;
			} else {
				CrudService.division.save($scope.divisionRegister).then(function(response) {
					commonsService.success('division.alert.success');
					$uibModalInstance.close(response.data);
				}).catch(function(error) {
					var field = error.objeto.data.message;
					if (error.objeto.data.exception.includes('EmptyOrNullValueException')) {
						commonsService.error('division.alert.errorEmptyField');
						return;
					} else if (field == 'Name') {
						commonsService.error('division.alert.errorDuplicateFieldName');
						return;
					} else if (field == 'Initials') {
						commonsService.error('division.alert.errorDuplicateFieldInitials');
						return;
					} else {
						commonsService.error('division.alert.error');
					}
				});
			}
		};
		
		var init = function() {
			$scope.divisionRegister = angular.copy(division);
		}

		init();
	};
	
	DivisionRegisterController.$inject = ['$scope', 'division', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
