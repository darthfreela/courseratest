(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath', '$q'];
function MenuService($http, ApiPath, $q) {
  var service = this;
  service.registration = {};

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function (short_name) {

    return $http.get(ApiPath + '/menu_items/'+ short_name +'.json').then(function (response) {
      return response.data;
    });
  };

  service.register = function(info) {
    service.registration = info;
  };

  service.getRegistration = function() {
    var deferred = $q.defer();
    deferred.resolve(service.registration);
    return deferred.promise
  };

}



})();
