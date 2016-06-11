'use strict';

angular.module('picsApp')
  .service('Orders', ["$http", "orderUrl", function($http, orderUrl) {
    this.order = function(userName, userFirstName, userMail, content) {
        console.log("Service Orders.order, userName", userName);
        console.log("Service Orders.order, userFirstName", userFirstName);
        console.log("Service Orders.order, userMail", userMail);
        console.log("Service Orders.order, content", content);
        
        var contentStr = "";
        for(var i in content){
            contentStr += (i + " = " + content[i] + "\n");
        }
        
        var promise = $http.post(
            orderUrl, 
            $.param({userName: userName + " " + userFirstName, userMail: userMail, content: contentStr}), 
            {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
            .then(function(response) {
                return {
                    status: response.status,
                    data: response.data,
                    ok: true
                };
            }, 
             function(response) {
                return {
                    status: response.status,
                    data: response.data || "Request failed",
                    ok: false
                };
            });
        return promise;
    }
    
    this.list = function() {
        console.log("Service Orders.list");
        var promise = $http.get(orderUrl).then(function(response){
            return {
                status: response.status,
                data: response.data,
                ok: true
            };
        }, 
        function(response){
            return {
                status: response.status,
                data: response.data || "Request failed",
                ok: false
            }
        });
        return promise;
    }
}]);
