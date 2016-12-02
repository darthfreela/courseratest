(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'http://localhost:3000/src/json')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
