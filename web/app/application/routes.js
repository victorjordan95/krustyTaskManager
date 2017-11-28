(function() {

    angular
        .module('sgp')
        .config(Router);

    Router.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Router($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        var states = [];

		var home = {
			name: 'home',
            url: '/home',
            controller: 'HomeCtrl',
            controllerAs: 'homectrl',
            templateUrl: 'application/views/home/home.html',
		};
		states.push(home);

        var login = {
            name: 'login',
            url: '/',
            controller: 'LoginCtrl',
            controllerAs: 'loginctrl',
            templateUrl: 'application/views/login/login.html'
        };
        states.push(login);
        
        var business = {
            name: 'business',
            url: '/negocios',
            controller: 'BusinessCtrl',
            controllerAs: 'businessCtrl',
            templateUrl: 'application/views/business/business.html'
        };
        states.push(business);
        
        var division = {
            name: 'division',
            url: '/divisoes',
            controller: 'DivisionCtrl',
            controllerAs: 'divisionCtrl',
            templateUrl: 'application/views/division/division.html'
        };
        states.push(division);
        
        var modality = {
            name: 'modality',
            url: '/modalidades',
            controller: 'ModalityCtrl',
            controllerAs: 'modalityCtrl',
            templateUrl: 'application/views/modality/modalities.html'
        };
        states.push(modality);
        
        var organization = {
            name: 'organization',
            url: '/orgaos',
            controller: 'OrganizationCtrl',
            controllerAs: 'organizationCtrl',
            templateUrl: 'application/views/organization/organization.html'
        };
        states.push(organization);
        
        var demand = {
            name: 'demand',
            url: '/demanda',
            controller: 'DemandCtrl',
            controllerAs: 'demandCtrl',
            templateUrl: 'application/views/demand/demand.html'
        };
        states.push(demand); 
        
        var pendency = {
            name: 'pendency',
            url: '/pendencias',
            controller: 'PendencyCtrl',
            controllerAs: 'pendencyCtrl',
            templateUrl: 'application/views/pendency/pendency.html'
        };
        states.push(pendency); 

        var paciente = {
            name: 'paciente',
            url: '/paciente',
            controller: 'PacienteCtrl',
            controllerAs: 'pacienteCtrl',
            templateUrl: 'application/views/paciente/paciente.html'
        };
        states.push(paciente); 
        
        states.forEach(function(state) {
            $stateProvider.state(state);
        });
    };

})();

// 			.state('forgotPassword', {
// 				url: '/forgot-password/:id/:token',
// 				templateUrl: 'application/views/forgotPassword/forgotPassword.html',
// 				controller: 'ForgotCtrl',
// 				//access: ['contractManager','exportControl','administrator'],
// 				data: {
// 					requireLogin: false
// 				},
// 				resolve: {
// 					loadCtrl: ["$q", function ($q) {
// 						var deferred = $q.defer();
// 						require(['controllers/forgotPassword/forgotPassword.ctrl'], function () { deferred.resolve(); });
// 						return deferred.promise;
// 					}],
// 				},
// 			})
// 			.state('forgotPassword', {
// 			// 					url: "/forgot-password",
// 			// 					templateUrl: "application/views/forgotPassword/forgotPassword.html",
// 			// 					controller: "ForgotCtrl",
// 			// //					parent: "master",
// 			// 					data: {
// 			// 		            	requireLogin: false
// 			// 		            },
// 			// 					resolve: {
// 			// 						loadHomeCtrl: ["$q", function ($q) {
// 			// 								var deferred = $q.defer();
// 			// 								require(['controllers/forgotPassword.ctrl'], function () {
// 			// 									deferred.resolve();
// 			// 								});
// 			// 								return deferred.promise;
// 			// 							}],
// 			// 					},
// 			// 				})
// 			.state('user', {
// 				url: "/register",
// 				templateUrl: "application/views/user/user.html",
// 				controller: "UserCtrl",
// 				parent: "master",
// 				data: {
// 					requireLogin: true
// 				},
// 				resolve: {
// 					loadHomeCtrl: ["$q", function ($q) {
// 						var deferred = $q.defer();
// 						require(['controllers/user/user.ctrl'], function () {
// 							deferred.resolve();
// 						});
// 						return deferred.promise;
// 					}],
// 				},
// 			})
// 			.state('changePassword', {
// 				url: "/change-password",
// 				templateUrl: "application/views/changePassword/changePassword.html",
// 				controller: "ChangePasswordCtrl",
// 				parent: "master",
// 				data: {
// 					requireLogin: false
// 				},
// 				resolve: {
// 					loadHomeCtrl: ["$q", function ($q) {
// 						var deferred = $q.defer();
// 						require(['controllers/changePassword/changePassword.ctrl'], function () {
// 							deferred.resolve();
// 						});
// 						return deferred.promise;
// 					}],
// 				},
// 			})
// 			.state('users', {
// 				url: "/users",
// 				templateUrl: "application/views/user/users.html",
// 				controller: "UsersCtrl",
// 				parent: "master",
// 				data: {
// 					requireLogin: true
// 				},
// 				resolve: {
// 					loadHomeCtrl: ["$q", function ($q) {
// 						var deferred = $q.defer();
// 						require(['controllers/users/users.ctrl'], function () {
// 							deferred.resolve();
// 						});
// 						return deferred.promise;
// 					}],
// 				},
// 			});
// 	});
