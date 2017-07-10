angular.module('qstCtrl', []).controller('questionController', function($scope, $compile,serviceDB) {
    $scope.addOpp = false;
    $scope.ques = {};
    $scope.viewQuestion=[]
    console.log('Hi am in Question Controller')
    $scope.addOptions = function() {
        $scope.addOpp = true;
        console.log('add Opp');
        Count = 0
    }
    var Count = 0;
    var html ;
    var newElement;
    $scope.addMoreOptions = function() {
        Count++;
        console.log('add More Opp');
         html = "<div class='form-inline Op'><input type='radio' value=''><input type='text'class='form-control' ng-model='ques.ans[$index+" + Count + "].opt' placeholder='Enter Options'></div> </div>"
      myElements  = angular.element(document.querySelector('.Opp'));
       myElements.append($compile(html)( $scope ) )
        //myElements.append("<div class='form-group'><label for='text'>Options:</label><input type='text'class='form-control' id='email' placeholder='Enter Options'></div><button class='btn Success' ng-click='addMoreOptions()'>Add More +</button> </div>");
    }
    $scope.next = function() {
        console.log($scope.ques);
        var promise=serviceDB.toServer($scope.ques,'/addQuestions')  
promise.then(function(res){
console.log(res.data);
$scope.ques={}
},function(err){

})
        $scope.addOpp=false;
        Count = 0;
       newElement =angular.element(document.querySelector('.Op'));
       newElement .remove();
    }
    $scope.findAllquest=function(){
     var promise=serviceDB.toServer({},'/findQuestions')  
promise.then(function(res){
console.log(res.data);
$scope.viewQuestion=res.data
$scope.ques={}
},function(err){

})

    }
    $scope.findAllquest();
   
})