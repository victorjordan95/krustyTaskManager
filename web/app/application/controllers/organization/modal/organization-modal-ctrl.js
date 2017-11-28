(function () {
	angular
		.module('sgp')
		.controller('OrganizationModalController', OrganizationModalController);
	function OrganizationModalController($scope, organization, CrudService, $uibModalInstance, commonsService) {
		
		$scope.organizationModal = {};
		$scope.organizationModal.active = '1';
		
		$scope.cancel = function() {
			$uibModalInstance.close();
		};
        
        $scope.states = [{value  : 'AC', estado : 'Acre'},
        				 {value  : 'AL', estado : 'Alagoas'},
        				 {value  : 'AP', estado : 'Amapá'},
        				 {value  : 'AM', estado : 'Amazonas'},
        				 {value  : 'BA', estado : 'Bahia'},
        				 {value  : 'CE', estado : 'Ceará'},
        				 {value  : 'DF', estado : 'Distrito Federal'},
        				 {value  : 'ES', estado : 'Espírito Santo'},
        				 {value  : 'GO', estado : 'Goiás'},
        				 {value  : 'MA', estado : 'Maranhão'},
        				 {value  : 'MT', estado : 'Mato Grosso'},
        				 {value  : 'MS', estado : 'Mato Grosso do Sul'},
        				 {value  : 'MG', estado : 'Minas Gerais'},
        				 {value  : 'PA', estado : 'Pará'},
        				 {value  : 'PB', estado : 'Paraíba'},
        				 {value  : 'PR', estado : 'Paraná'},
        				 {value  : 'PE', estado : 'Pernambuco'},
        				 {value  : 'PI', estado : 'Piauí'},
        				 {value  : 'RJ', estado : 'Rio de Janeiro'},
        				 {value  : 'RN', estado : 'Rio Grande do Norte'},
        				 {value  : 'RS', estado : 'Rio Grande do Sul'},
        				 {value  : 'RO', estado : 'Rondônia'},
        				 {value  : 'RR', estado : 'Roraima'},
        				 {value  : 'SC', estado : 'Santa Catarina'},
        				 {value  : 'SP', estado : 'São Paulo'},
        				 {value  : 'SE', estado : 'Sergipe'},
        				 {value  : 'TO', estado : 'Tocantins'}];
        
        $scope.phoneType = 
		 	[
				{value: 'COM', description: 'common.phoneType.commercial'},
				{value: 'RES', description: 'common.phoneType.residential'},
				{value: 'CEL', description: 'common.phoneType.cellPhone'}
			];

        $scope.inputs = [];
        $scope.addPhoneField = function() {
            if ($scope.organizationModal.id == null) {
            	$scope.inputs.push({});
            } else {
            	$scope.organizationModal.phones.push({});
            }
        };

        $scope.removePhone = function(index) {
            if ($scope.organizationModal.id == null) {
            	$scope.inputs.splice(index,1);
            } else {
            	$scope.organizationModal.phones.splice(index,1);
            }
        };

        // show remove button
        $scope.canRemovePhone = function(index) {
        	return !($scope.organizationModal.id != null && index == 0);
        };

		$scope.save = function() {
			var phonesList = [];
			_.each($scope.organizationModal.phones, function(phone) {
				phonesList.push(phone);
			});
			$scope.organizationModal.address.state = $scope.selected.value.value;
			$scope.organizationModal.phones = phonesList;
			return CrudService.organization.save($scope.organizationModal)
	            .then(function(response){
	            	commonsService.success('organization.alert.success');
	            	$uibModalInstance.close(response.data);
	            })
	            .catch(function(error){
	            	if (error.objeto.data.exception.includes('EmptyOrNullValueException')) {
	            		commonsService.error('organization.alert.emptyOrNullValueException');
	            		return;
	            	} else if (error.objeto.data.exception.includes('UniqueConstraintException')) {
		            	commonsService.error('organization.alert.uniqueConstraintException.'+error.objeto.data.message);
		            	return;
	            	} else {
						commonsService.error('organization.alert.error');
					}
	            });
		};
		
		var init = function() {
			//To preserve original organization.
			$scope.organizationModal = angular.copy(organization);
			//new / edit
			if(_.isUndefined($scope.organizationModal)){
		        $scope.selected = { value: $scope.states[0] };
			}else{
				_.each($scope.states, function(state) {
					if($scope.organizationModal.address.state == state.value){
						$scope.selected = { value: state };
					}
				});
			}
		}

		init();
	};
	
	OrganizationModalController.$inject = ['$scope', 'organization', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
