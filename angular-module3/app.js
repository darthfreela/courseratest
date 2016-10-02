(function(){

    'use strict';

    angular.module('NarrowItDownApp', [])
           .controller('NarrowItDownController', NarrowItDownController)
           .service('MenuSearchService', MenuSearchService)
           .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')
           .directive('foundItems', FoundItemsDirective);

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {

        var narrow = this;

        narrow.empty = 'string';

        narrow.searchTerm = function(searchVal) {

            var promise = MenuSearchService.getMatchedMenuItems(searchVal);

            promise.then(function (response) {

                narrow.found = response;

            })
            .catch(function (error) {
                console.log("Something went terribly wrong.");
            });
        };

        narrow.hasItem = function () {

            if(narrow.found) {
                return narrow.found.length;
            }
        };

        narrow.removeItem = function (itemIndex) {

            narrow.found.splice(itemIndex, 1);

        };

    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {

        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {

            return $http({
                method: 'GET',
                url: (ApiBasePath + '/menu_items.json')
            }).then(function (result) {

                var foundItems = [];

                angular.forEach(result.data.menu_items, function(item) {
                    if(item.description.toLowerCase().indexOf(searchTerm) != -1){
                        this.push(item);
                    }
                }, foundItems);

                return foundItems;

            });
        };
    }

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundlist.html',
            scope: {
                empty: '<',
                found: '<',
                hasItem: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'narrow',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {

        var narrow = this;

        narrow.isEmpty = function () {

            if(narrow.found) {

                if(narrow.found.length === 0) {
                    return true;
                }
            }

            return false;
        };

    }

})();
