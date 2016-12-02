(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'http://darthfreela.github.io/courseratest/mercado_convenienza')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
