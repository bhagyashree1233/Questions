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

    $scope.addMoreOptions = function() {
        Count++;
        console.log('add More Opp');
        html = "<div class='form-inline Op'><input type='radio' ng-model='ques.rightAns' value={{ques.ans[$index+" + Count + "].opt}}><input type='text'class='form-control' ng-model='ques.ans[$index+" + Count + "].opt' placeholder='Enter Options'></div> </div>"
        myElements = angular.element(document.querySelector('.Opp'));
        myElements.append($compile(html)($scope))
        //myElements.append("<div class='form-group'><label for='text'>Options:</label><input type='text'class='form-control' id='email' placeholder='Enter Options'></div><button class='btn Success' ng-click='addMoreOptions()'>Add More +</button> </div>");
    }
    $scope.removeOptions = function() {
        newElement = angular.element(document.querySelector('.Op'));
        newElement.remove();
    }
    $scope.submitQuestions = function() {
        if ($scope.questType == undefined || $scope.questType == "") {
            console.log('Select Question Type')
            return false;
        } else if ($scope.ques.length == 0) {
            console.log('Enter Question')
            return false;
        } else if ($scope.ques.quest == undefined || $scope.ques.quest == "") {
            console.log('Enter Question')
            return false;
        } else if ($scope.ques.ans == undefined || $scope.ques.ans == "") {
            console.log('Enter Answer')
            return false;
        } else if ($scope.ques.rightAns == undefined || $scope.ques.rightAns == "") {
            console.log('Select Right Answer')
            return false;
        }
        $scope.questionToSend['questionType'] = $scope.questType;
        $scope.questionToSend.questions.push(angular.copy({
            questions: $scope.ques.quest,
            options: $scope.ques.ans,
            //rightAnswer: $scope.ques.rightAns
        }));
         $scope.questionToSend.rightAnswers.push(angular.copy({
       rightAnswer: $scope.ques.rightAns
        }));
        if (questionId != undefined) {
            questionToSend.oldQuestion.questionType = $scope.questType;
            questionToSend.newQuestions.$each = $scope.questionToSend.questions;
            questionToSend.rightanswers.$each =$scope.questionToSend.rightAnswers;
            console.log(questionToSend)
            var promise = serviceDB.toServer(questionToSend, '/editQuestions')
            promise.then(function(res) {
                console.log(res.data);
                $scope.ques = {}
            }, function(err) {

            })

        } else {
            $scope.questionToSend['questionType'] = $scope.questType;
            var promise = serviceDB.toServer($scope.questionToSend, '/addQuestions')
            promise.then(function(res) {
                console.log(res.data);
                if(res.data.data){
                $scope.toastMsg= res.data.message;
                }
                $scope.ques = {}
            }, function(err) {

            })
        }


    }
    $scope.nextQuestion = function() {
        console.log($scope.ques);
        
        if ($scope.questType == undefined || $scope.questType == "") {
            console.log('Select Question Type')
            return false;
        } else if ($scope.ques.length == 0) {
            console.log('Enter Question')
            return false;
        } else if ($scope.ques.quest == undefined || $scope.ques.quest == "") {
            console.log('Enter Question')
            return false;
        } else if ($scope.ques.ans == undefined || $scope.ques.ans == "") {
            console.log('Enter Answer')
            return false;
        } else if ($scope.ques.rightAns == undefined || $scope.ques.rightAns == "") {
            console.log('Select Right Answer')
            return false;
        }
        $scope.questionToSend.questions.push(angular.copy({
            questions: $scope.ques.quest,
            options: $scope.ques.ans,
           // rightAnswer: $scope.ques.rightAns
        }));
        $scope.questionToSend.rightAnswers.push(angular.copy({
       rightAnswer: $scope.ques.rightAns
        }));
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
                questionId = res.data.data[0]._id;
                $scope.questionView = res.data.data[0];
                $scope.ques = {}
            }else{
                questionId=undefined;
                $scope.questionView = res.data[0];
            }
        }, function(err) {})
    }
    $scope.editQues = function(ques) {
        console.log(ques);
        $scope.ques.quest = ques.questions;

        $scope.ques.ans = ques.options;

    }
    $scope.deleteQues = function(ques) {
        console.log(ques)
        $scope.deleteQuestion.questions = ques
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