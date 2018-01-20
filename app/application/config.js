(function() {

    angular
        .module('ktm')
        .config(ConfigInterceptor);

    ConfigInterceptor.$inject = ['$httpProvider'];

    function ConfigInterceptor($httpProvider) {
        $httpProvider.interceptors.push('ktmInterceptor');
    }
})();
