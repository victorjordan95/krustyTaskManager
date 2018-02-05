(function () {
    angular
        .module('ktm')
        .controller('UsersConfirmationController', UsersConfirmationController);
    function UsersConfirmationController($scope, users, CrudService, $uibModalInstance, commonsService) {

        var self = this;

        self.load = function(){
			CrudService.users.findAll()
			.then(function(response){
				$scope.patients = response.data;
			})
			.catch(function (error) {
				$scope.error(error.message);
			});
        };
        
        self.usersElement = {};

        self.cancel = function () {
            $uibModalInstance.close();
        };

        self.delete = function () {
            console.log(self.usersElement);
            return CrudService.users.delete(self.usersElement.id)
                .then(function (response) {
                    $uibModalInstance.close(response.data);
                    
                    commonsService.success('Users removido com sucesso!');
					location.reload();
                })
                .catch(function (error) {
                    if (error.objeto.data.exception.includes('LinkedExpcetion')) {
                        commonsService.error('users.alert.linkedException');
                    } else {
                        commonsService.error('common.alert.genericError');
                    }
                });
        };

        var init = function () {
            //To preserve original users.
            self.usersElement = angular.copy(users);
        }

        init();
    };

    UsersConfirmationController.$inject = ['$scope', 'users', 'CrudService', '$uibModalInstance', 'commonsService'];
})();
