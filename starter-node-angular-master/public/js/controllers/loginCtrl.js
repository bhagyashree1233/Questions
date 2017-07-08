angular.module('loginCtrl', []).controller('loginController', function($scope,serviceDB,$location) {
    $scope.lgn={};
$scope.login=function(){
console.log($scope.lgn); 
var promise=serviceDB.toServer($scope.lgn,'/login')  
promise.then(function(res){
console.log(res.data);
$location.path(res.data);
},function(err){

})
}


});