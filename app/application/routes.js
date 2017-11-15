(function () {

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

        var activity = {
            name: 'activity',
            url: '/atividades',
            controller: 'ActivityCtrl',
            controllerAs: 'activityCtrl',
            templateUrl: 'application/views/activity/activity.html'
        };
        states.push(activity);

        var rank = {
            name: 'rank',
            url: '/rank',
            controller: 'RankCtrl',
            controllerAs: 'rankCtrl',
            templateUrl: 'application/views/rank/rank.html'
        };
        states.push(rank);

        var modality = {
            name: 'modality',
            url: '/modalidades',
            controller: 'ModalityCtrl',
            controllerAs: 'modalityCtrl',
            templateUrl: 'application/views/modality/modalities.html'
        };
        states.push(modality);

        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    };

})();

