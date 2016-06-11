'use strict';

console.log("loaded orders.js");

/**
 * @ngdoc function
 * @name picsApp.controller:OrdersCtrl
 * @description
 * # OrdersCtrl
 * Controller of the picsApp
 */

angular.module('picsApp')
  .controller('OrdersCtrl', ["Orders", function (Orders) {
      var vm = this;
      
      vm.orders = null;
      
      vm.global = {};
      
      Orders.list().then(function(data){
          console.log("data.ok", data.ok);
          console.log("data.status", data.status);
          console.log("data.data", data.data);
          vm.orders = data.data;
          
          var s, p;
          for(var i=0; i<vm.orders.length; ++i){
              s = (vm.orders[i]["content"] || "").split("\n");
              for(var j=0; j<s.length; ++j){
                  p = s[j].split(" = ");
                  if(p.length == 1) continue;
                  if(vm.global[p[0]]) {
                      vm.global[p[0]] += parseInt(p[1]);
                  } else {
                      vm.global[p[0]] = parseInt(p[1]);
                  }
              }
          }
          
      });
}]);
