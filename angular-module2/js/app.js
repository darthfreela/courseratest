(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListController', ShoppingListController)
.provider('ShoppingList', ShoppingListProvider)
.config(Config);

Config.$inject = ['ShoppingListProvider'];
function Config(ShoppingListProvider) {
  ShoppingListProvider.defaults.maxItems = 5;
}

ShoppingListController.$inject = ['ShoppingList'];
function ShoppingListController(ShoppingList) {
  var list = this;

  list.allBought = false;
  list.alreadyBought = false;

  list.itemsToBuy =  [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "5"
    },
    {
      name: "Cachaça",
      quantity: "200"
    }
  ];

  list.items = ShoppingList.getItems();
  if(list.items >= 1){
    list.allBought = true;
  }

  list.buyItem = function (itemIndex) {
      if(list.items[0] !== 0){
        list.alreadyBought = true;
      }

      ShoppingList.buyItem(list.itemsToBuy[itemIndex].name, list.itemsToBuy[itemIndex].quantity);
      list.removeItem(itemIndex);
      //is list of items empty?
      if(list.itemsToBuy.length === 0){
        list.allBought = true;
      }
  }

  list.removeItem = function (itemIndex) {
    list.itemsToBuy.splice(itemIndex, 1);
  };
}


// If not specified, maxItems assumed unlimited
function ShoppingListService() {
  var service = this;

  // List of shopping items
  var items = [];

  service.buyItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


function ShoppingListProvider() {
  var provider = this;

  provider.defaults = {
    maxItems: 100
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListService(provider.defaults.maxItems);

    return shoppingList;
  };
}
})();
