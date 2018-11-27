(function () {
    angular
        .module('ktm')
        .service('commonsService', ['$translate', 'toastr',
            function ($translate, toastr) {
                return {
                    // Notifications
                    info: function (message) {
                        toastr.info($translate.instant(message), 'Informação!');
                    },
                    success: function (message) {
                        toastr.success($translate.instant(message), 'Sucesso!');
                    },
                    warning: function (message) {
                        toastr.warning($translate.instant(message), 'Atenção!');
                    },
                    error: function (message) {
                        toastr.error($translate.instant(message), 'Erro!');
                    }
                }
            }
        ]);
})();
