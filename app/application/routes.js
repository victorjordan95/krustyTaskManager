(function () {

    angular
        .module('ktm')
        .config(Router);

    function Router($stateProvider, $urlRouterProvider, $location, commonService) {

        $urlRouterProvider.otherwise('/');

        var states = [];

        var login = {
            name: 'login',
            url: '/',
            controller: 'LoginCtrl',
            controllerAs: 'loginctrl',
            templateUrl: 'application/views/login/login.html',
        };
        states.push(login);

        var home = {
            name: 'home',
            url: '/home',
            controller: 'HomeCtrl',
            controllerAs: 'homectrl',
            templateUrl: 'application/views/home/home.html',
            resolve: {
                loggedIn: function () {
                    if (sessionStorage.getItem('id') === 'undefined' || sessionStorage.getItem('id') === null) {
                        $location.go('login');
                        commonsService.error('Faz login porra.');
                    }
                }
            }
        };
        states.push(home);

        var changePassword = {
            name: 'changePassword',
            url: '/alterar-senha',
            controller: 'ChangePasswordCtrl',
            controllerAs: 'changePasswordctrl',
            templateUrl: 'application/views/changePassword/changePassword.html',
            resolve: {
                loggedIn: function () {
                    if (sessionStorage.getItem('id') === 'undefined' || sessionStorage.getItem('id') === null) {
                        $stateProvider.go('login');
                    }
                }
            }
        };
        states.push(changePassword);

        var users = {
            name: 'users',
            url: '/usuarios',
            controller: 'UsersCtrl',
            controllerAs: 'usersCtrl',
            templateUrl: 'application/views/users/users.html',
            resolve: {
                loggedIn: function () {
                    if (sessionStorage.getItem('id') === 'undefined' || sessionStorage.getItem('id') === null) {
                        $stateProvider.go('login');
                    }
                }
            }
        };
        states.push(users);

        var rank = {
            name: 'Rank',
            url: '/rank',
            controller: 'RankCtrl',
            controllerAs: 'rankCtrl',
            templateUrl: 'application/views/rank/rank.html',
            resolve: {
                loggedIn: function () {
                    if (sessionStorage.getItem('id') === 'undefined' || sessionStorage.getItem('id') === null) {
                        $stateProvider.go('login');
                    }
                }
            }
        };
        states.push(rank);

        var projects = {
            name: 'Projetos',
            url: '/projetos',
            controller: 'ProjectsCtrl',
            controllerAs: 'projectsCtrl',
            templateUrl: 'application/views/projects/projects.html',
            resolve: {
                loggedIn: function () {
                    if (sessionStorage.getItem('id') === 'undefined' || sessionStorage.getItem('id') === null) {
                        $stateProvider.go('login');
                    }
                }
            }
        };
        states.push(projects);

        var taskType = {
            name: 'Tipo Tarefa',
            url: '/tipo-tarefa',
            controller: 'TypeTaskCtrl',
            controllerAs: 'typeTaskCtrl',
            templateUrl: 'application/views/typeTasks/typeTasks.html',
            resolve: {
                loggedIn: function () {
                    if (sessionStorage.getItem('id') === 'undefined' || sessionStorage.getItem('id') === null) {
                        $stateProvider.go('login');
                    }
                }
            }
        };
        states.push(taskType);

        // Exemplo nested route
        var tasks = {
            name: 'Tarefas',
            url: '/tarefas/:id/:nome',
            controller: 'TasksCtrl',
            controllerAs: 'tasksCtrl',
            templateUrl: 'application/views/tasks/tasks.html',
            resolve: {
                loggedIn: function () {
                    if (sessionStorage.getItem('id') === 'undefined' || sessionStorage.getItem('id') === null) {
                        $stateProvider.go('login');
                    }
                }
            }
        };
        states.push(tasks);

        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    };

    Router.$inject = ['$stateProvider', '$urlRouterProvider'];

})();