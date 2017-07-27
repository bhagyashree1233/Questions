angular.module('qstCtrl', []).controller('questionController', function($scope, $compile, serviceDB) {
    $scope.addOpp = true;
    $scope.questionToSend = {};
    $scope.questionToSend.questions = [];
     $scope.questionToSend.rightAnswers=[];
    $scope.quesType = [];
    $scope.questionTyp = {};
    $scope.listQuestionType = [];
    $scope.questions = [];
    $scope.viewQuestion = []
    $scope.ques = {};
    $scope.ques.ans = [];
    $scope.questType = '';
    var questionToSend = {};
    $scope.questionView = {};
    questionToSend.oldQuestion = {};
    questionToSend.newQuestions = {};
    questionToSend.rightanswers={};
    $scope.deleteQuestion = {};
    $scope.deleteQuestion.questions = [];
    $scope.editMode=false;
    $scope.toastMsg='';
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

    $scope.addMoreOptions = function(lastIndex) {
        if(lastIndex>Count){
        Count=lastIndex;  
         Count++;
        }else{
          Count++;  
        }
        console.log(Count);
       console.log('add More Opp');
        html = "<div class='form-inline Op'><input type='radio' ng-model='ques.rightAnswer' ng-value='ques.options["+Count+"].opt'><input type='text'class='form-control' ng-model='ques.options["+Count+"].opt' placeholder='Enter Options'></div></div>"
        myElements = angular.element(document.querySelector('.Opp'));
        myElements.append($compile(html)($scope))
        //myElements.append("<div class='form-group'><label for='text'>Options:</label><input type='text'class='form-control' id='email' placeholder='Enter Options'></div><button class='btn Success' ng-click='addMoreOptions()'>Add More +</button> </div>");
    }
    $scope.Back=function(){
        $scope.editMode=false;
        $scope.ques={};
    }
    $scope.removeOptions = function($index) {
        console.log($index)
        newElement = angular.element(document.querySelector('.Op'));
        newElement.remove();
    }
    $scope.submitQuestions = function() {
        console.log($scope.ques);
        if ($scope.questType == undefined || $scope.questType == "") {
            console.log('Select Question Type')
            return false;
        } else if ($scope.ques.length == 0) {
            console.log('Enter Question')
            return false;
        } else if ($scope.ques.questions == undefined || $scope.ques.questions == "") {
            console.log('Enter Question')
            return false;
        } else if ($scope.ques.options == undefined || $scope.ques.options == "") {
            console.log('Enter Answer')
            return false;
        } else if ($scope.ques.rightAnswer == undefined || $scope.ques.rightAnswer== "") {
            console.log('Select Right Answer')
            return false;
        }
        $scope.questionToSend['questionType'] = $scope.questType;
        $scope.questionToSend.questions.push(angular.copy({
            questions: $scope.ques.questions,
            options: $scope.ques.options,
            rightAnswer:$scope.ques.rightAnswer
            //rightAnswer: $scope.ques.rightAns
        }));
       /*  $scope.questionToSend.rightAnswers.push(angular.copy({
       rightAnswer:$scope.ques.rightAns
        }));*/
        console.log(questionId)
        if (questionId) {
            questionToSend.oldQuestion.questionType = $scope.questType;
            questionToSend.newQuestions.$each = $scope.questionToSend.questions;
            console.log(questionToSend)
            var promise = serviceDB.toServer(questionToSend, '/editQuestions')
            promise.then(function(res) {
                console.log(res.data);
                $scope.ques = {}
                 $scope.questionToSend.questions=[];
            }, function(err) {

            })

        } else {
            $scope.questionToSend['questionType'] = $scope.questType;
            console.log($scope.questionToSend);
            var promise = serviceDB.toServer($scope.questionToSend, '/addQuestions')
            promise.then(function(res) {
                console.log(res.data);
                if(res.data.done){
                $scope.toastMsg= res.data.message;
                questionId=true;
                }
                $scope.ques = {}
                $scope.questionToSend.questions=[];
            }, function(err) {

            })
        }
    }
    $scope.submitEditQuestions=function(){
        console.log($scope.ques);
         if ($scope.questType == undefined || $scope.questType == "") {
            console.log('Select Question Type')
            return false;
        } else if ($scope.ques.length == 0) {
            console.log('Enter Question')
            return false;
        } else if ($scope.ques.questions  == undefined || $scope.ques.questions  == "") {
            console.log('Enter Question')
            return false;
        } else if ($scope.ques.options == undefined || $scope.ques.options== "") {
            console.log('Enter Answer')
            return false;
        } else if ($scope.ques.rightAnswer == undefined || $scope.ques.rightAnswer == "") {
            console.log('Select Right Answer')
            return false;
        }
           $scope.ques.oldquestion=oldQuestion;
           $scope.ques.questionType=$scope.questType;
            console.log($scope.ques.options);
           $scope.ques.options=JSON.parse(angular.toJson($scope.ques.options))
           console.log($scope.ques);
            var promise = serviceDB.toServer($scope.ques, '/editQuestion')
            promise.then(function(res) {
                console.log(res.data);
                $scope.ques = {}
                 $scope.questionToSend.questions=[];
            }, function(err) {

            })

    }
    $scope.nextQuestion = function() {
        console.log($scope.ques);
        
        if ($scope.questType == undefined || $scope.questType == "") {
            console.log('Select Question Type')
            return false;
        } else if ($scope.ques.length == 0) {
            console.log('Enter Question')
            return false;
        } else if ($scope.ques.questions == undefined || $scope.ques.questions == "") {
            console.log('Enter Question')
            return false;
        } else if ($scope.ques.options == undefined || $scope.ques.options == "") {
            console.log('Enter Answer')
            return false;
        } else if ($scope.ques.rightAnswer == undefined || $scope.ques.rightAnswer == "") {
            console.log('Select Right Answer')
            return false;
        }
        $scope.questionToSend.questions.push(angular.copy({
            questions: $scope.ques.quest,
            options: $scope.ques.ans,
            rightAnswer: $scope.ques.rightAns
           // rightAnswer: $scope.ques.rightAns
        }));
       /* $scope.questionToSend.rightAnswers.push(angular.copy({
       rightAnswer: $scope.ques.rightAns
        }));*/

        $scope.ques = {}
        /* var promise = serviceDB.toServer($scope.ques, '/addQuestions')
         promise.then(function(res) {
             console.log(res.data);
             $scope.ques = {}
         }, function(err) {

         })*/
        /* $scope.addOpp = false;
         Count = 0;
         newElement = angular.element(document.querySelector('.Op'));
         newElement.remove();*/
    }
    $scope.findperquestAnswer = function() {
        $scope.questionTyp.questionType = $scope.questType;
        var promise = serviceDB.toServer( $scope.questionTyp, '/findQuestionAnswer')
        promise.then(function(res) {
            console.log(res.data);
            if(res.data.done && res.data.data!=undefined){
            $scope.questionView = res.data.data[0];
            console.log($scope.questionView);
            $scope.ques = {}
            questionId=true;
            }else{
              $scope.questionView ={} ; 
            }
        }, function(err) {

        })

    }
    
    $scope.questionType = function() {
        console.log($scope.questionTyp.type);
        $scope.quesType.push($scope.questionTyp.type);
        var promise = serviceDB.toServer($scope.questionTyp, '/addQuestionType')
        promise.then(function(res) {
            console.log(res.data);
            if(res.data.done){
            $scope.toastMsg = res.data.message;
            }
            
            $scope.ques = {}
        }, function(err) {

        })
        $scope.questionTyp.type = '';
        console.log($scope.questionTyp);
    }
    $scope.findAllQuestionType = function() {

        var promise = serviceDB.toServer({}, '/findQuestionType')
        promise.then(function(res) {
            console.log(res.data);
            if(res.data.done){
            $scope.listQuestionType = res.data.data;
            }
            $scope.ques = {}
        }, function(err) {

        })
    }

    $scope.findperticularquest = function() {
        console.log($scope.questType);
        $scope.questionTyp.questionType = $scope.questType;
        var promise = serviceDB.toServer($scope.questionTyp, '/findPerticularQuestion')
        promise.then(function(res) {
            console.log(res.data.data.length);
            if (res.data.data.length > 0) {
                questionId = true;
                console.log(questionId)
                $scope.questionView = res.data.data[0];
                console.log($scope.questionView);
                $scope.ques = {}
            }else{
                questionId=false;
                $scope.questionView = res.data[0];
            }
        }, function(err) {})
    }
    var oldQuestion='';
    $scope.editQues = function(ques) {
        console.log(ques);
        $scope.editMode=true;
     $scope.ques = ques;
     
    }
    $scope.deleteQues = function(ques) { 
        console.log(ques)
        $scope.deleteQuestion.questions=JSON.parse(angular.toJson(ques))
        $scope.deleteQuestion.questionType=$scope.questionView.questionType
        console.log($scope.deleteQuestion)
        var promise = serviceDB.toServer($scope.deleteQuestion, '/deleteQuestion')
        promise.then(function(res) {
            console.log(res.data);
            $scope.ques = {}
        }, function(err) {

        })
    }
    $scope.findAllQuestionType();
})