angular.module('userCtrl', []).controller('userController', function($scope, serviceDB) {
  $scope.viewQuestion=[]  
$scope.viewQuestion.userAnswer='';
  $scope.user={};
  console.log('Hi am in userCtrl');
    $scope.findAllquest=function(){
     var promise=serviceDB.toServer({},'/findQuestions')  
promise.then(function(res){
console.log(res.data);
$scope.viewQuestion=res.data
$scope.ques={}
},function(err){

})

    }
    var ansCount=0
   $scope.findAllquest()
     $scope.submit=function(){
      console.log($scope.viewQuestion.length);
      $scope.user.totalQuestions=$scope.viewQuestion.length;
      for(var i=0;i<$scope.viewQuestion.length;i++){
          if( $scope.viewQuestion[i].userAnswer==$scope.viewQuestion[i].rightAns){
             ansCount++;
          console.log(ansCount)
          console.log($scope.viewQuestion[i].userAnswer)
      }
    }
    $scope.user.userCorrectAnser=ansCount;
    $scope.user.userId="";
 var promise=serviceDB.toServer($scope.user,'/addUserAnswers') 
promise.then(function(res){
console.log(res.data);
$scope.viewQuestion=res.data
$scope.ques={}
},function(err){

})
     }

})