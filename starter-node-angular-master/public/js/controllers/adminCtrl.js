angular.module('adminCtrl', []).controller('adminController', function($scope, serviceDB) {
$scope.viewQuestion = []
    $scope.viewQuestion.userAnswer = '';
    $scope.user = {};
    console.log('Hi am in adminCtrl');
    $scope.findAllquest = function() {
        var promise = serviceDB.toServer({}, '/findAllUserAnswers')
        promise.then(function(res) {
            console.log(res.data);
            $scope.viewQuestion = res.data
            $scope.ques = {}
        }, function(err) {

        })

    }
    $scope.findAllquest()
    
})