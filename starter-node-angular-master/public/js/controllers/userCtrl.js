angular.module('userCtrl', []).controller('userController', function($scope, serviceDB,$location) {
    $scope.viewQuestion = []
    $scope.viewQuestion.userAnswer = '';
    $scope.listQuestionType=[];
    $scope.user = {};
    $scope.questionType='';
    $scope.user.questions={};
    $scope.currentPage=0;
    $scope.questions=[];
    $scope.currentQuestion={};
    $scope.questionTyp={};
    $scope.user.userAnswer="";
    $scope.quest={};
    $scope.quest.userAnswer=""
    var ansCount = 0;
    $scope.simpleSelect="";
    $scope.toastMsg='';
$scope.numberOfPages=0;
    console.log('Hi am in userCtrl');
    if((sessionStorage.getItem("questionObj"))!=undefined){
        console.log('Hai')
    var questionObj= JSON.parse(sessionStorage.getItem("questionObj"));
   console.log(questionObj);
 $scope.numberOfPages=questionObj.questions.length;
 console.log($scope.numberOfPages);
   $scope.questions=questionObj.questions;
   $scope.currentQuestion=$scope.questions[0];
   console.log($scope.currentQuestion)
    }

$scope.next=function(current){
    console.log($scope.currentQuestion)
var i = $scope.getIndex(current, 1);
$scope.currentQuestion=$scope.questions[i];
console.log($scope.currentQuestion);
}
$scope.previous=function(currentPage){
 var i = $scope.getIndex(currentPage, -1);
 $scope.currentQuestion=$scope.questions[i];
console.log($scope.currentQuestion);
} 
$scope.getIndex = function(currentIndex, shift){
        var len = $scope.questions.length;
        return (((currentIndex + shift) + len) % len)
    }
    $scope.submit = function() {
        console.log($scope.questions)
        console.log($scope.currentQuestion)
   if(sessionStorage.getItem("questionObj")!=undefined){
   var questionObj=JSON.parse(sessionStorage.getItem("questionObj"));
   $scope.type=questionObj.type
    }
        $scope.user.userId='1001';
        $scope.user.questions=(angular.copy($scope.questions));
        $scope.user.type=$scope.type;
        console.log($scope.user);
        var promise = serviceDB.toServer($scope.user, '/addUserAnswers')
        promise.then(function(res) {
            $scope.user={};
            console.log(res.data);
            if(res.data.done){
                toastr.info(res.data.message)
            }
            $location.path('/');
            $scope.ques = {}
        }, function(err) {

        })
    }
    
    $scope.findperticularquest = function(type) {
         $scope.questionTyp.questionType=type;
         console.log($scope.questionTyp)
         
        var promise = serviceDB.toServer($scope.questionTyp, '/findPerticularQuestion')
        promise.then(function(res) {
            console.log(res);
            if(res.data.done){
                if(res.data.data.length>0){
          $scope.viewQuestion=res.data.data[0];
          $scope.viewQuestion.type=type;
          console.log($scope.viewQuestion)
          sessionStorage.setItem("questionObj",JSON.stringify($scope.viewQuestion));
          var questionObj= JSON.parse(sessionStorage.getItem("questionObj"));
          $location.path('/instructions');
            $scope.ques = {}
            }
            }else{
         $scope.toastMsg=res.data.message;
            }
        }, function(err) {
        })
    }

$scope.findAllQuestionType=function(){
      var promise = serviceDB.toServer({}, '/findQuestionType')
        promise.then(function(res) {
            if(res.data.done){
            $scope.listQuestionType = res.data.data
            $scope.ques = {}
            }
        }, function(err) {

        })  
    }
    $scope.findAllQuestionType();
$scope.instructions=function(type){
     $scope.findperticularquest(type)
    
}
$scope.startTest=function(){
    
     $location.path('/question'); 
}
})