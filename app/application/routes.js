(function() {

    angular
        .module('ktm')
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
        
        var paciente = {
            name: 'paciente',
            url: '/paciente',
            controller: 'PacienteCtrl',
            controllerAs: 'pacienteCtrl',
            templateUrl: 'application/views/paciente/paciente.html'
        };
        states.push(paciente);
        
        var rank = {
            name: 'Rank',
            url: '/rank',
            controller: 'RankCtrl',
            controllerAs: 'rankCtrl',
            templateUrl: 'application/views/rank/rank.html'
        };
        states.push(rank); 

        var tasks = {
            name: 'Tarefas',
            url: '/tarefas',
            controller: 'TasksCtrl',
            controllerAs: 'tasksCtrl',
            templateUrl: 'application/views/tasks/tasks.html'
        };
        states.push(tasks); 

        //Exemplo nested route
        // var pendencyView = {
        //     name: 'pendencyView',
        //     url: '/pendencias/view/:id',
        //     controller: 'PendencyViewCtrl',
        //     controllerAs: 'pendencyViewCtrl',
        //     templateUrl: 'application/views/pendency/pendency-view.html'
        // };
        // states.push(pendencyView); 
        
        states.forEach(function(state) {
            $stateProvider.state(state);
        });
    };

})();