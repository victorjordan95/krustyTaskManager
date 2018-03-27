(function () {
    angular
        .module('ktm')
        .controller('ProjectsConfirmationController', ProjectsConfirmationController);
    function ProjectsConfirmationController($scope, projects, CrudService, $uibModalInstance, commonsService) {

        var self = this;

        self.load = function(){
			CrudService.projects.findAll()
			.then(function(response){
				$scope.patients = response.data;
			})
			.catch(function (error) {
				$scope.error(error.message);
			});
        };
        
        self.projectsElement = {};

        self.cancel = function () {
            $uibModalInstance.close();
        };

        self.delete = function () {
            console.log(self.projectsElement);
            return CrudService.projects.delete(self.projectsElement.id)
                .then(function (response) {
                    $uibModalInstance.close(response.data);
                    
                    commonsService.success('Users removido com sucesso!');
					location.reload();
                })
                .catch(function (error) {
                    if (error.objeto.data.exception.includes('LinkedExpcetion')) {
                        commonsService.error('projects.alert.linkedException');
                    } else {
                        commonsService.error('common.alert.genericError');
                    }
                });
        };

        var init = function () {
            //To preserve original projects.
            self.projectsElement = angular.copy(projects);
        }

        init();
    };

    ProjectsConfirmationController.$inject = ['$scope', 'projects', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
