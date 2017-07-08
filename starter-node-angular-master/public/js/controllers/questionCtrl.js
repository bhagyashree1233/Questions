angular.module('qstCtrl', []).controller('questionController', function($scope) {
    $scope.addOpp=false;
    console.log('Hi am in Question Controller')
$scope.addOptions=function(){
$scope.addOpp=true;
 console.log('add Opp');
 
}
$scope.addMoreOptions=function(){
console.log('add More Opp');

var myElements=angular.element(document.querySelector('.Opp')); 
 myElements.append(document.querySelector('.Opp'))
//myElements.append("<div class='form-group'><label for='text'>Options:</label><input type='text'class='form-control' id='email' placeholder='Enter Options'></div><button class='btn Success' ng-click='addMoreOptions()'>Add More +</button> </div>");
}
})