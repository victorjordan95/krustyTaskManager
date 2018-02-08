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
            url: '/users',
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