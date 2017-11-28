(function () {
	angular
		.module('sgp')
		.controller('OrganizationCtrl', OrganizationCtrl);
	
	function OrganizationCtrl($scope, CrudService, PaginationService, $httpParamSerializer, $location, $uibModal) {
		

		var self = this;
		self.listSortItens = {
			    "name": true,
			    "regional": true,
			    "address.street": true,
			    "address.number": true,
			    "address.district": true,
			    "address.city": true,
			    "address.state": true,
			    "address.zipCode": true,
			    "phone": true,
			    "initials": true,
			    "active": true,
			    "lastModifiedDate": true,
			    "lastModifiedBy.fullName": true
	        };
		
		self.filterData = {
				name: '',
				initials: '',
				regional: '',
				address: {
					street: '',
					number: '',
					district: '',
					city: '',
					state: '',
					zipCode: '',
				},
				phone: ''
		};
		self.filterSelectedItems = [{"name":"name","type":"text","show":"1"},
									{"name":"regional","type":"text","show":"1"},
									{"name":"address.street","type":"text","show":"1"},
									{"name":"address.number","type":"text","show":"1"},
									{"name":"address.district","type":"text","show":"1"},
									{"name":"address.city","type":"text","show":"1"},
									{"name":"address.state","type":"selectStates","show":"1"},
									{"name":"address.zipCode","type":"text","show":"1"},
									{"name":"initials","type":"text","show":"1"},
								    {"name":"active","type":"activeInactive","show":"1"},
									{"name":"lastModifiedDate","type":"dateWithMask","show":"1"},
									{"name":"lastModifiedBy.fullName","type":"text","show":"1"}];

		PaginationService.setLoadDataCallBack(CrudService.organization.search);
		
		self.pagination = PaginationService;
		self.pagination.config({
			sort: 'name,ASC'
		});
		
		//Row Expansion controller
		self.expandSelected = function(organization) {
			self.pagination.items().forEach(function(val) {
				if(val == organization){
					val.expanded = !val.expanded;
				} else {
					val.expanded = false;
				}	
			});
		}
		
        //Modal
		 self.openModal = function(organization) {
            var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/organization/modal/organization-modal.html',
				size: 'md',	
				controller: 'OrganizationModalController',
				controllerAs: '$ctrl',
				resolve: {
					organization: function () {
						return organization;
					}
				}
			});

            modalInstance.result.then(function() {
            	self.pagination.start();
            });
        };

		self.openModalConfirmation = function(organization) {
            var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/organization/modal/confirmation-modal.html',
				size: 'md',	
				controller: 'OrganizationConfirmationController',
				controllerAs: 'organizationConfirmationCtrl',
				resolve: {
					organization: function () {
						return organization;
					}
				}
			});

            modalInstance.result.then(function() {
            	self.pagination.start();
            });
        };
        
        self.pagination.start();
        self.pagination.setListSortItens(self.listSortItens);
        
	};
	
	OrganizationCtrl.$inject = ['$scope', 'CrudService', 'PaginationService','$httpParamSerializer', '$location', '$uibModal'];
})();