(function () {
	angular
		.module('ktm')
		.service('CrudService', ['RestService', function (rest) {
			'use strict';

			const url = "https://chatbotbycasseb.herokuapp.com";
			
			return {
				common : {
					findAll : function(parameters){
						return rest.post(`${url}/setTransaction`, JSON.stringify(parameters));
					},
					findAllPretty : function(parameters){
						return rest.post(`${url}/parseToEasyRecord`, JSON.stringify(parameters));
					}
				},
				projects: {
					save : function(project) {
						return rest.post(`${url}/setTransaction`, JSON.stringify(project));
					},
					delete : function(project) {
						return rest.post(`${url}/setTransaction`, JSON.stringify(project));
					}
				},
				typeTasks : {
					findAll : function(parameters) {
						return rest.post(`${url}/setTransaction`, JSON.stringify(parameters));
					},
					save : function(typeTask) {
						return rest.post(`${url}/setTransaction`, JSON.stringify(typeTask));
					},
					delete : function(typeTask) {
						return rest.post(`${url}/setTransaction`, JSON.stringify(typeTask));
					}
				},
				login: {
					logon: function (user) {
						return rest.post(`${url}/setTransaction`, JSON.stringify(user));
					}
				},
			};
		}]);
})();
