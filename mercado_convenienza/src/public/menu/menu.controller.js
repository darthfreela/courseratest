(function () {
"use strict";

var a = angular.module('public');
a.controller('MenuController', MenuController);

MenuController.$inject = ['menuCategories', '$rootScope'];
function MenuController(menuCategories, $rootScope) {
  var $ctrl = this;
  this.nome = '';
  this.root = $rootScope.CurrentCategory=250;
  this.quantidade = 0;
  this.total_carrinho = 0;
  $ctrl.menuCategories = menuCategories;

}



    alert('oiiii');
    $('#datetimepicker1').datetimepicker();


})();
