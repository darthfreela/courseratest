(function () {
"use strict";

angular.module('public')
.controller('RegisterController', RegisterController);

RegisterController.$inject = ['MenuService'];
function RegisterController(MenuService) {
  var $ctrl = this;
  $ctrl.info = {};
  $ctrl.getMenuItem = function() {
    if($ctrl.info.short_name) {
      MenuService.getMenuItem($ctrl.info.short_name.toUpperCase()).then(function(data) {
        $ctrl.info.menuItem = data;
        $ctrl.itemFound = true;
        $ctrl.noItemFound = false;
        $ctrl.gotMenuItem = true;
      },function(error) {
        $ctrl.info.menuItem = false;
        $ctrl.noItemFound = true;
        $ctrl.itemFound = false;
        $ctrl.gotMenuItem = true;
      });
    }
  }
  $ctrl.submit = function(){
    MenuService.register($ctrl.info);
    $ctrl.submitted = true;
  }
}

})();
