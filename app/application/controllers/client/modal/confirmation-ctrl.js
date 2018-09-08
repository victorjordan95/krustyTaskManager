(function () {
    angular
        .module('ktm')
        .controller('ClientConfirmationController', ClientConfirmationController);
    function ClientConfirmationController($scope, client, CrudService, $uibModalInstance, commonsService) {

        var self = this;

        self.clientElement = {};

        self.cancel = function () {
            $uibModalInstance.close();
        };

        self.delete = function () {
            var parameter = {
                "interactors": [
                    {
                        "recordAction": "DELETE",
                        "entityName": self.clientElement.entityName,
                        "recordLine": self.clientElement.key
                    }
                ]
            };
            return CrudService.projects.delete(parameter)
                .then(function (response) {
                    $uibModalInstance.close(response.data);
                    commonsService.success('Projeto removido com sucesso!');
					location.reload();
                })
                .catch(function (error) {
                    if (error.objeto.data.exception.includes('LinkedExpcetion')) {
                        commonsService.error('Erro ao excluir o projeto!');
                    } else {
                        commonsService.error('Erro ao excluir o projeto!');
                    }
                });
        };

        var init = function () {
            //To preserve original projects.
            self.clientElement = angular.copy(client);
            console.log(self.clientElement);
        }

        init();
    };

    ClientConfirmationController.$inject = ['$scope', 'client', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
