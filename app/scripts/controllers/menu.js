'use strict';

console.log("loaded menu.js");

/**
 * @ngdoc function
 * @name picsApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the picsApp
 */

angular.module('picsApp')
  .controller('MenuCtrl', ["$location", function ($location) {

    var vm = this;
      
    vm.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
  }]);