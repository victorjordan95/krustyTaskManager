define(['sgp'], function (app) {
	app.controller('ForgotCtrl', ['$scope','$stateParams', '$translate', 'CrudService', '$location', 'commonsService',
	 function ($scope, $stateParams,  $translate, CrudService, $location, commonsService) {
			

			$scope.changePassword = function(){
				var user = {
					"id" : $stateParams.id,
					"token" : $stateParams.token,
					"password" : $scope.newPassword
				};
				CrudService.login.change(user).then(function(data){
					$location.path('/login');
					commonsService.success("changePassword.alert.success");
				}, function(data){
					$location.path('/login');
					commonsService.error("changePassword.alert.error");
				});
			 };

			$scope.language = 'en-us';
			$scope.changeLang = function (lang) {
				$scope.language = lang;
				$translate.use(lang);
			};
			
			$(function () {
				$('#psw1').keyup(function () {
				var psw1 = $('#psw1').val();			
					//at least 8 char
					if ( psw1.length < 8 ) {
    				$('#length').removeClass('valid').addClass('invalid');
						$('.fa-times.length').show();
						$('.fa-check.length').hide();
					}else{
						$('#length').removeClass('invalid').addClass('valid');
						$('.fa-times.length').hide();
						$('.fa-check.length').show();
					}
					//at least, one letter
					if ( psw1.match(/[A-z]/) ) {
						$('#letter').removeClass('invalid').addClass('valid');
						$('.fa-times.letter').hide();
						$('.fa-check.letter').show();
					}else {
						$('#letter').removeClass('valid').addClass('invalid');
						$('.fa-times.letter').show();
						$('.fa-check.letter').hide();
					}
					//At least, one lowercase letter
					if ( psw1.match(/[a-z]/) ) {
						$('#lowercase').removeClass('invalid').addClass('valid');
						$('.fa-times.lowercase').hide();
						$('.fa-check.lowercase').show();
					}else {
						$('#lowercase').removeClass('valid').addClass('invalid');
						$('.fa-times.lowercase').show();
						$('.fa-check.lowercase').hide();
					}
					//validate capital letter
					if ( psw1.match(/[A-Z]/) ) {
						$('#capital').removeClass('invalid').addClass('valid');
						$('.fa-times.capital').hide();
						$('.fa-check.capital').show();
					}else {
						$('#capital').removeClass('valid').addClass('invalid');
						$('.fa-times.capital').show();
						$('.fa-check.capital').hide();
					}
					//at least, one number
					if( psw1.match(/\d/) ) {
						$('#number').removeClass('invalid').addClass('valid');
						$('.fa-times.number').hide();
						$('.fa-check.number').show();
					}else {
						$('#number').removeClass('valid').addClass('invalid');
						$('.fa-times.number').show();
						$('.fa-check.number').hide();
					}
					if( $("#psw1").val() == $("#psw2").val() ) {
						$('#equal').removeClass('invalid').addClass('valid');
						$('.fa-times.equal').hide();
						$('.fa-check.equal').show();
					}else {
						$('#equal').removeClass('valid').addClass('invalid');
						$('.fa-times.equal').show();
						$('.fa-check.equal').hide();
					}
					//No space
					if(!(/\s/g.test(psw1))){
						$('#space').removeClass('invalid').addClass('valid');
						$('.fa-times.space').hide();
						$('.fa-check.space').show();
					}else{
						$('#space').removeClass('valid').addClass('invalid');
						$('.fa-times.space').show();
						$('.fa-check.space').hide();
					};
					if(psw1 == ""){
						$('.password-rules li .fa').hide();
						$('.password-rules li').removeClass('invalid');
						$('.password-rules li').removeClass('valid');
					}
					verifySubmit();

				});
				$('#psw2').keyup(function () {
					if( $("#psw1").val() == $("#psw2").val() ) {
						$('#equal').removeClass('invalid').addClass('valid');
						$('.fa-times.equal').hide();
						$('.fa-check.equal').show();
					}else {
						$('#equal').removeClass('valid').addClass('invalid');
						$('.fa-times.equal').show();
						$('.fa-check.equal').hide();
					}
					verifySubmit();
				});
				
				var verifySubmit = function(){
					var rules = $(".password-rules li");
						for(var x = 0; x < rules.length; x++){
							if($(rules[x]).hasClass("invalid")){
								$( ":button" ).attr("disabled", true);
								return false
							}		
						}
						$( ":button" ).attr("disabled", false);
						return true
					};
								
			});
			
		}]);
});