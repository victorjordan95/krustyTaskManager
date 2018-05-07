(function () {
    angular
        .module('ktm')
        .controller('TypeStatusConfirmationController', TypeStatusConfirmationController);
    function TypeStatusConfirmationController($scope, typeStatus, CrudService, $uibModalInstance, commonsService) {

        var self = this;

        self.typeStatusElement = {};

        self.cancel = function () {
            $uibModalInstance.close();
        };

        self.delete = function () {
            var parameter = {
                "interactors": [
                    {
                        "recordAction": "DELETE",
                        "entityName": self.typeStatusElement.entityName,
                        "recordLine": self.typeStatusElement.key
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
            self.typeStatusElement = angular.copy(typeStatus);
            console.log(self.typeStatusElement);
        }

        init();
    };

    TypeStatusConfirmationController.$inject = ['$scope', 'typeStatus', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
