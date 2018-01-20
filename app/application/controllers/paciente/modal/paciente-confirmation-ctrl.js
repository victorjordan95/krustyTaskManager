(function () {
    angular
        .module('ktm')
        .controller('PacienteConfirmationController', PacienteConfirmationController);
    function PacienteConfirmationController($scope, paciente, CrudService, $uibModalInstance, commonsService) {

        var self = this;

        self.load = function(){
			CrudService.paciente.findAll()
			.then(function(response){
				$scope.patients = response.data;
			})
			.catch(function (error) {
				$scope.error(error.message);
			});
        };
        
        self.pacienteElement = {};

        self.cancel = function () {
            $uibModalInstance.close();
        };

        self.delete = function () {
            console.log(self.pacienteElement);
            return CrudService.paciente.delete(self.pacienteElement.id)
                .then(function (response) {
                    $uibModalInstance.close(response.data);
                    
                    commonsService.success('Paciente removido com sucesso!');
					location.reload();
                    // Order = $resource("http://localhost:8080/theCemDente/paciente/getall");
                    // console.log(Order);
					// $timeout( function(){
					// }, 500 );
                })
                .catch(function (error) {
                    if (error.objeto.data.exception.includes('LinkedExpcetion')) {
                        commonsService.error('paciente.alert.linkedException');
                    } else {
                        commonsService.error('common.alert.genericError');
                    }
                });
        };

        var init = function () {
            //To preserve original paciente.
            self.pacienteElement = angular.copy(paciente);
        }

        init();
    };

    PacienteConfirmationController.$inject = ['$scope', 'paciente', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
