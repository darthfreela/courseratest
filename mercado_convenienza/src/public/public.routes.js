(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      bindings: {
        total_carrinho: '>'
      },
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.info', {
      url: '/my-info',
      templateUrl: 'src/public/my-info/my-info.html',
      controller: 'InfoController',
      controllerAs: 'infoCtrl',
      resolve: {
        info: ['MenuService', function (MenuService) {
          return MenuService.getRegistration();
        }]
      }
    })
    .state('public.register', {
      url: '/sign-up',
      templateUrl: 'src/public/sign-up/sign-up.html',
      controller: 'RegisterController',
      controllerAs: 'regCtrl'
    });
}
})();
