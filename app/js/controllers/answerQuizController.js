/**
 * Created by Щукин on 5/14/2015.
 */
function AnswerQuizController($scope, entityKeeper, $http, $rootScope, helperMethods) {

    function onLeavePage() {
        alert('Cheater. Your quiz is finished.')

        delete $rootScope.removeQuiz($scope.currentQuiz);

        var notification = {
            title: 'Студент пытался сжульничать.',
            quiz: $scope.currentQuiz,
            message: $rootScope.currentUser.name + ' ' + $rootScope.currentUser.sirname + ' пытался сжульничать на тесте.. \n' + 'Правильных ответов ' + correctAnswers
        }

        $http.post("http://localhost:8080/sendnotificationquizfinished", notification).success(function () {

            }
        )


        window.location.href = 'http://localhost:8080/'
    };


    if (/*@cc_on!@*/false) { // check for Internet Explorer
        document.onfocusout = onLeavePage;
    } else {
        window.onblur = onLeavePage;
    }



    $scope.currentQuiz = $rootScope.quizToAnswer;
    for (var j, x, i = $scope.currentQuiz.questions.length; i; j = Math.floor(Math.random() * i), x = $scope.currentQuiz.questions[--i], $scope.currentQuiz.questions[i] = $scope.currentQuiz.questions[j], $scope.currentQuiz.questions[j] = x);

    $scope.currentQuiz.questions.splice($scope.currentQuiz.questionstodisplay);


    for (var question in $scope.currentQuiz.questions) {
        question.iscorrect = false;
    }

    $scope.finishQuizButtonClick = function () {
        delete $rootScope.removeQuiz($scope.currentQuiz);

        var correctAnswers = 0;

        var notification = {
            title: 'Студент закончил тест',
            quiz: $scope.currentQuiz,
            message: $rootScope.currentUser.name + ' ' + $rootScope.currentUser.sirname + ' закончил тест. \n' + 'Правильных ответов ' + correctAnswers + 'из ' + maxpossibleanswers
        }
        

        $http.post("http://localhost:8080/sendnotificationquizfinished", notification).success(function () {
            }
        )
    }


}



