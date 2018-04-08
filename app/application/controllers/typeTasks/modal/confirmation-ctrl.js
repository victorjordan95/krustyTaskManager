(function () {
    angular
        .module('ktm')
        .controller('TypeTasksConfirmationController', TypeTasksConfirmationController);
        
    function TypeTasksConfirmationController($scope, typeTask, CrudService, $uibModalInstance, commonsService) {

        var self = this;

        self.typeTasksElement = {};

        self.cancel = () => $uibModalInstance.close();

        self.delete = function () {
            var parameter = {
                "interactors": [
                    {
                        "recordAction": "DELETE",
                        "entityName": self.typeTasksElement.entityName,
                        "recordLine": self.typeTasksElement.key
                    }
                ]
            };
            return CrudService.projects.delete(parameter)
                .then(function (response) {
                    $uibModalInstance.close(response.data);
                    commonsService.success('Tipo de tarefa removido com sucesso!');
					location.reload();
                })
                .catch(function (error) {
                    if (error.objeto.data.exception.includes('LinkedExpcetion')) {
                        commonsService.error('Erro ao excluir Tipo de tarefa!');
                    } else {
                        commonsService.error('Erro ao excluir Tipo de tarefa!');
                    }
                });
        };

        var init = () => self.typeTasksElement = angular.copy(typeTask);
        init();
    };

    TypeTasksConfirmationController.$inject = ['$scope', 'typeTask', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
