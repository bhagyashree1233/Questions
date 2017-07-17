angular.module('qstCtrl', []).controller('questionController', function($scope, $compile, serviceDB) {
    $scope.addOpp = true;
    $scope.questionToSend = {};
    $scope.questionToSend.questions=[];
    $scope.quesType = [];
    $scope.questionTyp={};
    $scope.listQuestionType=[];
    $scope.questions = [];
    $scope.viewQuestion =[]
    $scope.ques={};
    $scope.ques.ans=[];
    $scope.questType='';
     var questionToSend={};
     $scope.questionView={};
    questionToSend.oldQuestion={};
    questionToSend.newQuestions={};
    $scope.deleteQuestion={};
    $scope.deleteQuestion.questions=[];
    var questionId;
    var Count = 0;
    var html;
    var newElement; 
    console.log('Hi am in Question Controller')
    $scope.addOptions = function() {
        $scope.addOpp = true;
        console.log('add Opp');
        Count = 0
    }
    
    $scope.addMoreOptions = function() {
        Count++;
        console.log('add More Opp');
        html = "<div class='form-inline Op'><input type='radio' ng-model='ques.rightAns' value={{ques.ans[$index+" + Count + "].opt}}><input type='text'class='form-control' ng-model='ques.ans[$index+" + Count + "].opt' placeholder='Enter Options'></div> </div>"
        myElements = angular.element(document.querySelector('.Opp'));
        myElements.append($compile(html)($scope))
        //myElements.append("<div class='form-group'><label for='text'>Options:</label><input type='text'class='form-control' id='email' placeholder='Enter Options'></div><button class='btn Success' ng-click='addMoreOptions()'>Add More +</button> </div>");
    }
   $scope.removeOptions=function(){
       newElement = angular.element(document.querySelector('.Op'));
        newElement.remove();
   }
    $scope.submitQuestions = function() {
       
        if($scope.questionToSend==undefined||$scope.questionToSend==""){
          return false;
        }else if($scope.questionToSend.questions==undefined||$scope.questionToSend.questions==""){
            return false;
        }
         $scope.questionToSend['questionType']=$scope.questType;
        $scope.questionToSend.questions.push(angular.copy({
            questions: $scope.ques.quest,
            options: $scope.ques.ans,
            rightAnswer:$scope.ques.rightAns
        }));
        if(questionId!=undefined){
              questionToSend.oldQuestion.questionType  = $scope.questType;
            questionToSend.newQuestions.$each=$scope.questionToSend.questions;
            console.log(questionToSend)
           var promise = serviceDB.toServer(questionToSend, '/editQuestions')
         promise.then(function(res) {
             console.log(res.data);
             $scope.ques = {}
         }, function(err) {

         })
           
        }else{
       $scope.questionToSend['questionType']=$scope.questType;
       var promise = serviceDB.toServer($scope.questionToSend, '/addQuestions')
         promise.then(function(res) {
             console.log(res.data);
             $scope.ques = {}
         }, function(err) {

         })
        }
       
        
    }
    $scope.next = function() {
        console.log($scope.ques);
        $scope.questionToSend.questions.push(angular.copy({
            questions: $scope.ques.quest,
            options: $scope.ques.ans,
            rightAnswer:$scope.ques.rightAns
        }));
        $scope.ques = {}
        /* var promise = serviceDB.toServer($scope.ques, '/addQuestions')
         promise.then(function(res) {
             console.log(res.data);
             $scope.ques = {}
         }, function(err) {

         })*/
        $scope.addOpp = false;
        Count = 0;
        newElement = angular.element(document.querySelector('.Op'));
        newElement.remove();
    }
    $scope.findAllquest = function() {
        var promise = serviceDB.toServer({}, '/findQuestions')
        promise.then(function(res) {
            console.log(res.data);
            $scope.viewQuestion = res.data
            $scope.ques = {}
        }, function(err) {

        })

    }
    $scope.findAllquest();
    $scope.questionType = function() {
        console.log($scope.questionTyp.type);
        $scope.quesType.push($scope.questionTyp.type);
        var promise = serviceDB.toServer($scope.questionTyp, '/addQuestionType')
        promise.then(function(res) {
            console.log(res.data);
            $scope.viewQuestion = res.data
            $scope.ques = {}
        }, function(err) {

        })
        $scope.questionTyp.type='';
        console.log($scope.questionTyp);
    }
    $scope.findAllQuestionType=function(){

      var promise = serviceDB.toServer({}, '/findQuestionType')
        promise.then(function(res) {
            console.log(res.data);
            $scope.listQuestionType = res.data
            $scope.ques = {}
        }, function(err) {

        })  
    }
    
     $scope.findperticularquest = function() {
         console.log($scope.questType);
         $scope.questionTyp.questionType=$scope.questType;
        var promise = serviceDB.toServer($scope.questionTyp, '/findPerticularQuestion')
        promise.then(function(res) {
            if(res.data.length>0){
           questionId= res.data[0]._id;
          $scope.questionView=res.data[0];
            $scope.ques = {}
            }
        }, function(err) {
        })
    }
    $scope.editQues=function(ques){
        console.log(ques);
     $scope.ques.quest=ques.questions;
     
    $scope.ques.ans=ques.options;
     
}
$scope.deleteQues=function(ques){
console.log(ques)
$scope.deleteQuestion.questions=ques
console.log($scope.deleteQuestion)
 var promise = serviceDB.toServer($scope.deleteQues, '/deleteQuestion')
         promise.then(function(res) {
             console.log(res.data);
             $scope.ques = {}
         }, function(err) {

         })
}
    $scope.findAllQuestionType();
})