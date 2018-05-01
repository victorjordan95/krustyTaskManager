(function () {
	angular
		.module('ktm')
		.controller('HeaderCtrl', ['$scope', '$rootScope', '$translate', 'toastr', 'CrudService', 'Idle', '$location', '$uibModal', '$uibModalStack',
			function ($scope, $rootScope, $translate, toastr, CrudService, Idle, $location, $uibModal, $uibModalStack) {

				$scope.actualUser = sessionStorage.getItem('name');
				
				$scope.logout = function () {
					$location.path("#/login");
					sessionStorage.setItem("id", undefined);
					sessionStorage.setItem("username", undefined);
					sessionStorage.setItem("name", undefined);
					sessionStorage.setItem("role", undefined);
				};

				$scope.hasUser = function () {
					return sessionStorage.user !== "undefined";
				};

				$(function () {
					var url = window.location.href.split("/")[3];
					url = url.replace("#", ""), $("#sidebar li a").map(function () {
						$(this).attr("href") === url && ($(this).addClass("active").closest(".sidebar-submenu").collapse("show"), $(this).closest(".sidebar-dropdown").find(".sidebar-link").addClass("active"));
					});
					var sidebarLinks = $("#sidebar .sidebar-submenu-link, #sidebar .sidebar-submenu-link, .header-logo"), sidebarLinksClass = $("#sidebar .sidebar-link, #sidebar .sidebar-submenu-link");
					sidebarLinks.click(function () {
						sidebarLinksClass.removeClass("active"), $(this).addClass("active").closest(".sidebar-submenu").collapse("show"), $(this).closest(".sidebar-dropdown").find(".sidebar-link").addClass("active")
					}),
						$(document).ready(function () {
							$(".sidebar-overlay").click(function () {
								$(".sidebar-overlay").fadeOut(), $("#sidebar").removeClass("active"), $(".navbar-toggle").removeClass("active"), $("body").removeClass("sidebar-collapse-active")
							}),
								$(".btn-sidebar-collapse").click(function (s) {
									s.preventDefault(), $(this).toggleClass("active"), $("body").toggleClass("sidebar-collapse-active"), $("#sidebar").toggleClass("active"), $(".sidebar-overlay").fadeToggle()
								}),
								$("#sidebar").mouseover(function () {
									$(this).hasClass("active") ? $(this).addClass("sidebar-collapse-hover") : $(this).removeClass("sidebar-collapse-hover")
								}).mouseout(function () {
									$(this).removeClass("sidebar-collapse-hover")
								})
						});

					$('ul[id*="sidebar-"]').on('show.bs.collapse', function () {
						$('ul[id*="sidebar-"][id!="' + $(this).attr('id') + '"]').collapse('hide');
					});
					$('.header-logo').click(function () {
						$('ul[id*="sidebar-"][id!="' + $(this).attr('id') + '"]').collapse('hide');
					});
					$('.br-flag').click(function () {
						$('#actual-language').removeClass('eua-flag').addClass('pt-br-flag');
					});
					$('.en-flag').click(function () {
						$('#actual-language').removeClass('pt-br-flag').addClass('eua-flag');
					});

				});

			}]);
})();


