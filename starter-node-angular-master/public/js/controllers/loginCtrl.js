angular.module('loginCtrl', []).controller('loginController', function($scope, serviceDB, $location) {
    $scope.lgn = {};
    $scope.user={};
    $scope.login = function() {
        console.log($scope.lgn);
        var promise = serviceDB.toServer($scope.lgn, '/login')
        promise.then(function(res) {
            console.log(res.data);
            $location.path(res.data);
        }, function(err) {

        })
    }
$scope.addUser=function(){
console.log($scope.user);
if($scope.user.name==undefined){
 return false;
}else if($scope.user.phNumber==undefined){
 return false;
}else if($scope.user.email==undefined){
 return false;
}else if($scope.user.password==undefined){
 return false;
}else if($scope.user.confirmPassword==undefined){
 return false;
}else{

}
var promise = serviceDB.toServer($scope.user, '/addUser')
        promise.then(function(res) {
            console.log(res.data);
           if(res.data.done){
              $scope.user={};
              toastr.info(res.data.message); 
           }
        }, function(err) {

        })
}

});