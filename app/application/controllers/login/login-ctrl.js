
(function () {
	angular
		.module('sgp')
		.controller('LoginCtrl', LoginCtrl);

	function LoginCtrl($scope, $rootScope, $translate, CrudService, $httpParamSerializer, $location, commonsService) {

		$scope.user = {};

		$scope.logon = function () {
			$rootScope.user = $scope.user;
			$location.path("home");
			// CrudService.login.logon($scope.user).then(function (response) {
			// 	sessionStorage.setItem('user', JSON.stringify(response.data));
			// 
			// }).catch(function (error) {
			// 	commonsService.error('login.loginError');
			// });
		}

		$scope.forgetPassword = function () {
			CrudService.login.forget($scope.user).then(function (response) {
				sessionStorage.setItem('user', JSON.stringify(response.data));
				commonsService.success('Email enviado!');
			}).catch(function (error) {
				commonsService.error('Erro ao enviar o email!');
			});
		}

		$scope.language = 'en-us';

		$scope.changeLang = function (lang) {
			$scope.language = lang;
			$translate.use(lang);
		};
	};
	LoginCtrl.$inject = ['$scope', '$rootScope', '$translate', 'CrudService', '$httpParamSerializer', '$location', 'commonsService',];
})();