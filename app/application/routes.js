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
                        $location.path('/');
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
                        $location.path('/');
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
                        $location.path('/');
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
                        $location.path('/');
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
                        $location.path('/');
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
                        $location.path('/');
                    }
                }
            }
        };
        states.push(taskType);

        var tasks = {
            name: 'Tarefas',
            url: '/tarefas/:id/:nome',
            controller: 'TasksCtrl',
            controllerAs: 'tasksCtrl',
            templateUrl: 'application/views/tasks/tasks.html',
            resolve: {
                loggedIn: function () {
                    if (sessionStorage.getItem('id') === 'undefined' || sessionStorage.getItem('id') === null) {
                        $location.path('/');
                    }
                }
            }
        };
        states.push(tasks);

        var taskStatus = {
            name: 'Status Tarefa',
            url: '/status-tarefa',
            controller: 'TypeStatusCtrl',
            controllerAs: 'typeStatusCtrl',
            templateUrl: 'application/views/typeStatus/typeStatus.html',
            resolve: {
                loggedIn: function () {
                    if (sessionStorage.getItem('id') === 'undefined' || sessionStorage.getItem('id') === null) {
                        $location.path('/');
                    }
                }
            }
        };
        states.push(taskStatus);

        var client = {
            name: 'Clientes',
            url: '/clientes',
            controller: 'ClientCtrl',
            controllerAs: 'clientCtrl',
            templateUrl: 'application/views/client/client.html',
            resolve: {
                loggedIn: function () {
                    if (sessionStorage.getItem('id') === 'undefined' || sessionStorage.getItem('id') === null) {
                        $location.path('/');
                    }
                }
            }
        };
        states.push(client);

        var changeProfile = {
            name: 'changeProfile',
            url: '/alterar-perfil',
            controller: 'ChangeProfileCtrl',
            controllerAs: 'changeProfilectrl',
            templateUrl: 'application/views/changeProfile/changeProfile.html',
            resolve: {
                loggedIn: function () {
                    if (sessionStorage.getItem('id') === 'undefined' || sessionStorage.getItem('id') === null) {
                        $location.path('/');
                    }
                }
            }
        };
        states.push(changeProfile);


        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    };

    Router.$inject = ['$stateProvider', '$urlRouterProvider'];

})();