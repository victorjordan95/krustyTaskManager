(function () {
	angular
		.module('sgp')
		.service('CrudService', ['RestService', function (rest) {
			return {
				user: {
					findAll: function (filterData) {
						return rest.get('/sgp/user/?' + filterData);
					},
					save: function (user) {
						return rest.post('/sgp/user', user);
					},
					findOne: function (id) {
						return rest.get('/sgp/user/' + id);
					},
					delete: function (id) {
						return rest.delete('/sgp/user/' + id);
					},
					change: function (user) {
						return rest.post('/sgp/user/change-password', user);
					}
				},
				login: {
					logon: function (user) {
						return rest.post('/sgp/login', user);
					},
					forget: function (user) {
						return rest.post('/sgp/login/forgot-password', user);
					},
					change: function (user) {
						return rest.post('/sgp/login/change-password', user);
					},
					logout: function () {
						return rest.get('/sgp/login/logout');
					},
					userAuthenticated: function () {
						return rest.get('/sgp/login/userAuthenticated');
					}
				},
				modality: {
					search: function (filterData) {
						return rest.getWithParams('/sgp/modality/', filterData);
					},
					save: function (modality) {
						return rest.post('/sgp/modality', modality);
					},
					delete: function (id) {
						return rest.delete('/sgp/modality/' + id);
					}
				},
				activity: {
					search: function (filterData) {
						return rest.getWithParams('/sgp/activity/', filterData);
					},
					save: function (modality) {
						return rest.post('/sgp/activity', modality);
					},
					delete: function (id) {
						return rest.delete('/sgp/activity/' + id);
					}
				},
				rank: {
					search: function (filterData) {
						return rest.getWithParams('/sgp/rank/', filterData);
					},
					save: function (modality) {
						return rest.post('/sgp/rank', modality);
					},
					delete: function (id) {
						return rest.delete('/sgp/rank/' + id);
					}
				},
			};
		}]);
})();