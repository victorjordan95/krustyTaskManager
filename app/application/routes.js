(function() {

    angular
        .module('ktm')
        .config(Router);

    Router.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Router($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        var states = [];

        var login = {
            name: 'login',
            url: '/',
            controller: 'LoginCtrl',
            controllerAs: 'loginctrl',
            templateUrl: 'application/views/login/login.html'
        };
        states.push(login);

		var home = {
			name: 'home',
            url: '/home',
            controller: 'HomeCtrl',
            controllerAs: 'homectrl',
            templateUrl: 'application/views/home/home.html',
		};
        states.push(home);
        
        var changePassword = {
            name: 'changePassword',
            url: '/alterar-senha',
            controller: 'ChangePasswordCtrl',
            controllerAs: 'changePasswordctrl',
            templateUrl: 'application/views/changePassword/changePassword.html'
        };
        states.push(changePassword);
        
        var users = {
            name: 'users',
            url: '/usuarios',
            controller: 'UsersCtrl',
            controllerAs: 'usersCtrl',
            templateUrl: 'application/views/users/users.html'
        };
        states.push(users);
        
        var rank = {
            name: 'Rank',
            url: '/rank',
            controller: 'RankCtrl',
            controllerAs: 'rankCtrl',
            templateUrl: 'application/views/rank/rank.html'
        };
        states.push(rank);
        
        var projects = {
            name: 'Projetos',
            url: '/projetos',
            controller: 'ProjectsCtrl',
            controllerAs: 'projectsCtrl',
            templateUrl: 'application/views/projects/projects.html'
        };
        states.push(projects); 

        var taskType = {
            name: 'Tipo Tarefa',
            url: '/tipo-tarefa',
            controller: 'TypeTaskCtrl',
            controllerAs: 'typeTaskCtrl',
            templateUrl: 'application/views/typeTasks/typeTasks.html'
        };
        states.push(taskType); 

        // Exemplo nested route
        var tasks = {
            name: 'Tarefas',
            url: '/tarefas/:id/:nome',
            controller: 'TasksCtrl',
            controllerAs: 'tasksCtrl',
            templateUrl: 'application/views/tasks/tasks.html'
        };
        states.push(tasks); 
        
        states.forEach(function(state) {
            $stateProvider.state(state);
        });
    };

})();