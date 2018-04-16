(function () {
	angular
		.module('ktm')
		.service('CrudService', ['RestService', function (rest) {

			const url = "https://chatbotbycasseb.herokuapp.com";
			
			return {
				users : {
					findAll : function(parameters){
						return rest.post(`${url}/setTransaction`, JSON.stringify(parameters));
					},
					findAllPretty : function(parameters){
						return rest.post(`${url}/parseToEasyRecord`, JSON.stringify(parameters));
					}
				},
				projects: {
					findAll: function(parameters) {
						return rest.post(`${url}/setTransaction`, JSON.stringify(parameters));
					},
					findAllPretty : function(parameters){
						return rest.post(`${url}/parseToEasyRecord`, JSON.stringify(parameters));
					},
					save : function(project) {
						return rest.post(`${url}/setTransaction`, JSON.stringify(project))
					},
					delete : function(project) {
						return rest.post(`${url}/setTransaction`, JSON.stringify(project))
					}
				},
				tasks : {
					findAll : function(parameters) {
						return rest.post(`${url}/setTransaction`, JSON.stringify(parameters));
					},
					findAllPretty : function(parameters){
						return rest.post(`${url}/parseToEasyRecord`, JSON.stringify(parameters));
					}
				},
				typeTasks : {
					findAll : function(parameters) {
						return rest.post(`${url}/setTransaction`, JSON.stringify(parameters));
					},
					findAllPretty : function(parameters){
						return rest.post(`${url}/parseToEasyRecord`, JSON.stringify(parameters));
					},
					save : function(typeTask) {
						return rest.post(`${url}/setTransaction`, JSON.stringify(typeTask));
					},
					delete : function(typeTask) {
						return rest.post(`${url}/setTransaction`, JSON.stringify(typeTask));
					}
				},
				user: {
					findAll: function (filterData) {
						return rest.get('/ktm/user/?' + filterData);
					},
					save: function (user) {
						return rest.post('/ktm/user', user);
					},
					findOne: function (id) {
						return rest.get('/ktm/user/' + id);
					},
					delete: function (id) {
						return rest.delete('/ktm/user/' + id);
					},
					change: function (user) {
						return rest.post('/ktm/user/change-password', user);
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
