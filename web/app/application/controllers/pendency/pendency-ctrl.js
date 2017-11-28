(function () {
	angular
		.module('sgp')
		.controller('PendencyCtrl', PendencyCtrl);
	
	function PendencyCtrl($scope, CrudService, PaginationService, $httpParamSerializer, $location, $uibModal) {
		
		var self = this;
		var CLASS_RED = "bg-red";
		var CLASS_PINK = "bg-pink";
		//Dia corrente para ser comparado
		var currentDate = new Date();
		currentDate.setHours(0);
		currentDate.setMinutes(0);
		currentDate.setSeconds(0);
		currentDate.setMilliseconds(0);
		
		PaginationService.setLoadDataCallBack(CrudService.pendency.search);
		self.pagination = PaginationService;
		self.pagination.config({
			sort: 'status,ASC'
		});
		
		self.listSortItens = {
							    "id": true,
							    "demand.deadline": true,
							    "contact.fullName": true,
							    "business.name": true,
							    "division.name": true,
							    "modality.name": true,
							    "demand.demandDesc": true,
							    "summary": true,
							    "organization.name": true,
							    "process": true,
							    "prevision":true,
								"status": true,
							    "deadline": true,
							    "responsible.fullName": true
					        };
		
		self.statusPendencyValue = [{"value":0, "name":"pendency.status.pending"},
									{"value":1, "name":"pendency.status.completeTechnicalProduction"},
									{"value":2, "name":"pendency.status.technicalValidationCompleted"},
									{"value":3, "name":"pendency.status.completedValidation"},
									{"value":4, "name":"pendency.status.completed"},
									{"value":5, "name":"pendency.status.canceled"}];
		
		self.filterSelectedItems = [{"name":"id","type":"text","show":"1"},
		    						{"name":"pendencyAlert.alert","type":"alertPendency","show":"1"},
								    {"name":"contact.fullName","type":"text","show":"1"},
									{"name":"business.name","type":"text","show":"1"},
									{"name":"division.name","type":"text","show":"1"},
									{"name":"modality.name","type":"text","show":"1"},
									{"name":"demand.demandDesc","type":"text","show":"1"},
									{"name":"summary","type":"text","show":"1"},
									{"name":"organization.name","type":"text","show":"1"},
									{"name":"process","type":"text","show":"1"},
									{"name":"prevision","type":"dateWithMask","show":"1"},
									{"name":"status","type":"statusPendency","show":"1"},
									{"name":"deadline","type":"dateWithMask","show":"1"}];
		
		//Conversor de date para comparaçao.
		function convertDate(date){
			var dateSplited = date.split(" ")[0].split("/");
			var regularDateFormat = dateSplited[1] +'/'+ dateSplited[0] +'/'+ dateSplited[2];
			var validDate = new Date(regularDateFormat);
			return validDate;
		}
		
		// Função validadora da regra de negócio de data de Previsão
		function checkPrevisionDate(pendency){
			var previsionDate = convertDate(pendency.prevision);
			return (previsionDate.getTime() >= currentDate.getTime());
		}

		//Regra de negócio para cores da coluna previsão.
		$scope.columnColorPrevision = function(pendency){
			var classColor = '';
			if(checkPrevisionDate(pendency)){
				classColor = CLASS_PINK;
			}
			return classColor;
		}
		
		// Função validadora da regra de negócio de data do Prazo Final
		function checkDeadlineDate(pendency){
			var dateInitial = convertDate(pendency.createdDate);
			var finalDate = convertDate(pendency.deadline);
			return (currentDate.getTime() >= dateInitial.getTime()) && (currentDate.getTime() <= finalDate.getTime());
		}

		//Regra de negócio para cores da coluna prazo final.
		$scope.columnColorDeadline = function(pendency){
			var classColor = '';
			if(checkDeadlineDate(pendency)){
				classColor = CLASS_RED;
			}
			return classColor;
		}

        //Modal
		self.openModal = function(pendency) {
            var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/pendency/modal/pendency-modal.html',
				size: 'md',	
				controller: 'PendencyModalController',
				controllerAs: '$ctrl',
				resolve: {
					pendency: function () {
						return pendency;
					}
				}
			});

            modalInstance.result.then(function() {
            	self.pagination.start();
            });
        };

		self.openModalConfirmation = function(pendency) {
            var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'application/views/pendency/modal/confirmation-modal.html',
				size: 'md',	
				controller: 'PendencyConfirmationCtrl',
				controllerAs: 'pendencyConfirmationCtrl',
				resolve: {
					demand: function () {
						return demand;
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
	
	PendencyCtrl.$inject = ['$scope', 'CrudService', 'PaginationService', '$httpParamSerializer', '$location', '$uibModal'];
})();