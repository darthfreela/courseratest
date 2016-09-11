(function () {
'use strict';

angular.module('MsgApp', [])
.controller('MsgController', MsgController);

MsgController.$inject = ['$scope', '$filter'];
function MsgController($scope, $filter) {
  $scope.list = "";
  $scope.message = "";


  $scope.sayMessage = function () {
    $scope.message = howManyItems($scope.list);
  };

  var howManyItems = function(items){
    var numberOf = 0;
    var itemsSplited = items.split(",");
    itemsSplited.forEach(function(i){
      numberOf +=1;
      if(i == ""){
        numberOf -= 1;
      }
      if(i == " "){
        numberOf -= 1;
      }
    });
    return witchMessage(numberOf);
  }

  var witchMessage = function(number){
    if(number == 0){
      $scope.style="color: red"
      return "Please enter data first";
    }else if(number <= 3 ){
      $scope.style="color: green"
      return "Enjoy!";
    }else if (number > 3) {
      $scope.style="color: green"
      return "Too much!";
    }
  }

}

})();
