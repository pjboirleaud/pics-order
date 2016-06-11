'use strict';

console.log("loaded main.js");

/**
 * @ngdoc function
 * @name picsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the picsApp
 */

angular.module('picsApp')
  .controller('MainCtrl', ["pics", "$uibModal", function (pics, $uibModal) {
    var vm = this;
    
    console.log();
      
    vm.pics = [];
    var line=-1, N=(parseInt((window.innerWidth-50)/410));
    for(var i in pics){
        if(i%N == 0) {
            vm.pics.push([]);
            ++line;
        }
        vm.pics[line].push(pics[i]);
    }
      
    console.log("pics", vm.pics);
    
    vm.cmd = {};
      
    vm.npics = function() {
        var n=0;
        for(var i in vm.cmd){
            n += vm.cmd[i];
        }
        return n;
    }
    
    vm.add = function(pic) {
        console.log("add " + pic);
        if(vm.cmd[pic] != undefined) ++vm.cmd[pic];
        else vm.cmd[pic] = 1;
    }
    
    vm.remove = function(pic) {
        console.log("remove " + pic);
        if(vm.cmd[pic] != undefined && vm.cmd[pic] > 1) --vm.cmd[pic];
        else delete vm.cmd[pic];
    }
    
    vm.n = function(pic) {
        return vm.cmd[pic] || 0;
    }
    
    // popup
    
    vm.animationsEnabled = true;

    vm.orderModalOpen = function (size) {
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            templateUrl: 'orderModal.html',
            controller: 'OrderModalInstanceCtrl',
            controllerAs: 'orderModal',
            size: size,
            resolve: {
                content: function () {
                    return vm.cmd;
                }
            }
        });

        modalInstance.result.then(function (userName) {
            console.log("ORDER DONE FOR ", userName);
        }, function () {
            console.log('Modal dismissed');
        });
    };
    
  }])
  .controller('OrderModalInstanceCtrl', ["Orders", "pics", "$uibModalInstance", "content", function (Orders, pics, $uibModalInstance, content) {
    var vm = this;
      
    vm.data = "";
    vm.cmd = content; // ??? pourquoi ???
    vm.closeDisabled = false;
      
    vm.orderModalOk = function() {
        console.log("orderModalOk");
        vm.closeDisabled = true;
        vm.data = "Envoi de la demande en cours...";
        Orders.order(vm.userName, vm.userFirstName, vm.userMail, vm.cmd).then(function(data){
            console.log("data.ok", data.ok);
            console.log("data.status", data.status);
            console.log("data.data", data.data);
            vm.data = data.data;
            vm.closeDisabled = false;
            if(data.data.indexOf('Erreur')==0) {
                
            } else {
                window.setTimeout(function() {
                    $uibModalInstance.close(vm.userName + " " + vm.userFirstName);
                }, 2000);
            }
        });
    }
    
    vm.orderModalCancel = function() {
        console.log("orderModalCancel");
        vm.closeDisabled = false;
        $uibModalInstance.dismiss('cancel');
    }
  }]);
