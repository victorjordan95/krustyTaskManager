(function() {
	angular.module('ktm').factory('ktmInterceptor', KTMInterceptor);

	KTMInterceptor.$inject = [ '$window', '$q', '$location', '$injector',
			'$rootScope' ];

	var onGoingRequest = null;

	function KTMInterceptor($window, $q, $location, $injector, $rootScope) {
		var sessionInjector = {
			request : function(config) {
				$rootScope.loading = true;
				var data = config.data;
				return config || $q.when(config);
			},
			requestError : function(rejection) {
				$rootScope.http = $rootScope.http || $injector.get('$http');
				if ($rootScope.http.pendingRequests.length < 1) {
					$rootScope.loading = false;
				}
				return $q.reject(rejection);
			},
			response : function(response) {
				$rootScope.http = $rootScope.http || $injector.get('$http');
				if ($rootScope.http.pendingRequests.length < 1) {
					$rootScope.loading = false;
				}
				return response || $q.when(response);
			},
			responseError : function(rejection) {
				$rootScope.http = $rootScope.http || $injector.get('$http');
				if ($rootScope.http.pendingRequests.length < 1) {
					$rootScope.loading = false;
				}
				return $q.reject(rejection);
			}
		}

		return sessionInjector;
	}
	;
})();