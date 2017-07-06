angular.module('NerdCtrl', []).controller('NerdController', function($scope,serviceDB) {

	$scope.tagline = 'Nothing beats a pocket protector!';
	var promise=serviceDB.toServer('', '/nerd') 
	promise.then(function(res){console.log(res)},function(err){})

});