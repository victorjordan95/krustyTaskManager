(function () {
	angular
		.module('ktm')
		.service('CrudService', ['RestService', function (rest) {

			const url = "https://krusty-api.herokuapp.com";
			
			return {
				users : {
					findAll : function(){
						return rest.get(`${url}/users/`)
					}
				},
				tasks : {
					findAll : function(parameters) {
						return rest.post('https://chatbotbycasseb.herokuapp.com/setTransaction', JSON.stringify(parameters));
					},
					findAllPretty : function(parameters){
						return rest.post('https://chatbotbycasseb.herokuapp.com/parseToEasyRecord', JSON.stringify(parameters));
					}
				},
				projects: {
					findAll: function(parameters) {
						return rest.post('https://chatbotbycasseb.herokuapp.com/setTransaction', JSON.stringify(parameters));
					},
					findAllPretty : function(parameters){
						return rest.post('https://chatbotbycasseb.herokuapp.com/parseToEasyRecord', JSON.stringify(parameters));
					},
					save : function(project) {
						return rest.post('https://chatbotbycasseb.herokuapp.com/setTransaction', JSON.stringify(project))
					},
					delete : function(project) {
						return rest.post('https://chatbotbycasseb.herokuapp.com/setTransaction', JSON.stringify(project))
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
						return rest.post(url + '/theCemDente/login', user);
					},
					forget: function (user) {
						return rest.post('/ktm/login/forgot-password', user);
					},
					change: function (user) {
						return rest.post('/ktm/login/change-password', user);
					},
					logout: function () {
						return rest.get('/ktm/login/logout');
					},
					userAuthenticated: function () {
						return rest.get('/ktm/login/userAuthenticated');
					}
				},
				paciente: {
					findAll : function(){
						return rest.get(url + '/theCemDente/paciente/getall')
					},
					save: function (paciente) {
						return rest.post(url + '/theCemDente/paciente/savePaciente/', paciente);
					},
					delete: function (id) {
						return rest.delete(url + '/theCemDente/paciente/deletePaciente/' + id);
					}
				},
			};
		}]);
})();
