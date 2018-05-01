(function () {
	angular
		.module('ktm')
		.controller('ChangePasswordCtrl', ChangePasswordCtrl);

	function ChangePasswordCtrl($scope, $rootScope, $translate, CrudService, $httpParamSerializer, $location, commonsService) {

		$scope.changePassword = function () {

			var newPassword = document.getElementById('psw2').value;
			var parameter = {
				"interactors": [
					{
						"recordAction": "EDIT",
						"entityName": "BotUser",
						"fieldName": "Senha",
						"recordLine": sessionStorage.getItem('key'),
						"newValue": newPassword
					}
					
				]
			};
			return CrudService.projects.save(parameter)
				.then(function (response) {
					commonsService.success('Senha alterada com sucesso!');
				})
				.catch(function (error) {
					if (error.objeto.data.exception.includes('EmptyOrNullValueException')) {
						commonsService.error('Campo vazio!');
						return;
					} else {
						if (error.objeto.data.exception.includes('UniqueConstraintException')) {
							commonsService.error('Erro ao alterar senha!');
							return;
						}
					}
				});
		};

		$(function () {
			$('#psw1').keyup(function () {
				var psw1 = $('#psw1').val();

				//at least 8 char
				if (psw1.length < 8) {
					$('#length').removeClass('valid').addClass('invalid');
					$('.fa-times.length').show();
					$('.fa-check.length').hide();
				} else {
					$('#length').removeClass('invalid').addClass('valid');
					$('.fa-times.length').hide();
					$('.fa-check.length').show();
				}
				//at least, one letter
				if (psw1.match(/[A-z]/)) {
					$('#letter').removeClass('invalid').addClass('valid');
					$('.fa-times.letter').hide();
					$('.fa-check.letter').show();
				} else {
					$('#letter').removeClass('valid').addClass('invalid');
					$('.fa-times.letter').show();
					$('.fa-check.letter').hide();
				}
				//At least, one lowercase letter
				if (psw1.match(/[a-z]/)) {
					$('#lowercase').removeClass('invalid').addClass('valid');
					$('.fa-times.lowercase').hide();
					$('.fa-check.lowercase').show();
				} else {
					$('#lowercase').removeClass('valid').addClass('invalid');
					$('.fa-times.lowercase').show();
					$('.fa-check.lowercase').hide();
				}

				//validate capital letter
				if (psw1.match(/[A-Z]/)) {
					$('#capital').removeClass('invalid').addClass('valid');
					$('.fa-times.capital').hide();
					$('.fa-check.capital').show();
				} else {
					$('#capital').removeClass('valid').addClass('invalid');
					$('.fa-times.capital').show();
					$('.fa-check.capital').hide();
				}
				//at least, one number
				if (psw1.match(/\d/)) {
					$('#number').removeClass('invalid').addClass('valid');
					$('.fa-times.number').hide();
					$('.fa-check.number').show();
				} else {
					$('#number').removeClass('valid').addClass('invalid');
					$('.fa-times.number').show();
					$('.fa-check.number').hide();
				}
				//Verify if password match
				if ($("#psw1").val() == $("#psw2").val()) {
					$('#equal').removeClass('invalid').addClass('valid');
					$('.fa-times.equal').hide();
					$('.fa-check.equal').show();
				} else {
					$('#equal').removeClass('valid').addClass('invalid');
					$('.fa-times.equal').show();
					$('.fa-check.equal').hide();
				}
				//No space
				if (!(/\s/g.test(psw1))) {
					$('#space').removeClass('invalid').addClass('valid');
					$('.fa-times.space').hide();
					$('.fa-check.space').show();
				} else {
					$('#space').removeClass('valid').addClass('invalid');
					$('.fa-times.space').show();
					$('.fa-check.space').hide();
				};


				//Remove validation if password are in blank
				if (psw1 == "") {
					$('.password-rules li .fa').hide();
					$('.password-rules li').removeClass('invalid');
					$('.password-rules li').removeClass('valid');
				}

				verifySubmit();


			});
			$('#psw2').keyup(function () {
				if ($("#psw1").val() == $("#psw2").val()) {
					$('#equal').removeClass('invalid').addClass('valid');
					$('.fa-times.equal').hide();
					$('.fa-check.equal').show();
				} else {
					$('#equal').removeClass('valid').addClass('invalid');
					$('.fa-times.equal').show();
					$('.fa-check.equal').hide();
				}
				verifySubmit();
			});


			var showConfirm = function () {
				var rules = $(".password-rules li");
				for (var x = 0; x < rules.length - 1; x++) {
					if ($(rules[x]).hasClass("invalid")) {
						return false
					}
				}
				$("#confirm-password").fadeIn(700);
				return true
			};

			var verifySubmit = function () {
				var rules = $(".password-rules li");
				for (var x = 0; x < rules.length; x++) {
					if ($(rules[x]).hasClass("invalid")) {
						$(":button").attr("disabled", true);
						showConfirm();
						return false
					}
				}
				$(":button").attr("disabled", false);
				return true
			};

		});

	};


	ChangePasswordCtrl.$inject = ['$scope', '$rootScope', '$translate', 'CrudService', '$httpParamSerializer', '$location', 'commonsService'];
})();