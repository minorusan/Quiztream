/**
 * Created by Щукин on 5/14/2015.
 */
function AnswerQuizController($scope, entityKeeper, $http, $rootScope, helperMethods) {

    $(window).blur(function () {
        var correctAnswers = 0;
        for (var question in $scope.currentQuiz.questions) {
            for (var question1 in $rootScope.quizToAnswer.questions) {
                if ($scope.currentQuiz.questions[question].text === $rootScope.quizToAnswer.questions[question1].text) {
                    for (var answer in $scope.currentQuiz.questions[question].answers) {
                        if ($scope.currentQuiz.questions[question].answers[answer].iscorrect === $rootScope.quizToAnswer.questions[question1].answers[answer].iscorrect) {
                            correctAnswers++;
                        }
                    }
                }
            }
        }


        var notification = {
            title: 'Студент пытался сжульничать.',
            quiz: $scope.currentQuiz,
            message: $rootScope.currentUser.name + ' ' + $rootScope.currentUser.sirname + ' пытался сжульничать на тесте.. \n' + 'Правильных ответов ' + correctAnswers + 'из ' + maxpossibleanswers
        }

        $http.post("http://localhost:3000/sendnotificationquizfinished", notification).success(function () {

            }
        )
        alert('Cheater. Your quiz is finished.')
        window.location.href = 'http://localhost:3000'
    });

    $scope.currentQuiz = $rootScope.quizToAnswer;
    for (var j, x, i = $scope.currentQuiz.questions.length; i; j = Math.floor(Math.random() * i), x = $scope.currentQuiz.questions[--i], $scope.currentQuiz.questions[i] = $scope.currentQuiz.questions[j], $scope.currentQuiz.questions[j] = x);

    $scope.currentQuiz.questions.splice($scope.currentQuiz.questionstodisplay);


    for (var question in $scope.currentQuiz.questions) {
        question.iscorrect = false;
    }

    //CUNT!11
    $scope.finishQuizButtonClick = function () {
        var correctAnswers = 0;
        for (var question in $scope.currentQuiz.questions) {
            for (var question1 in $rootScope.quizToAnswer.questions) {
                if ($scope.currentQuiz.questions[question].text === $rootScope.quizToAnswer.questions[question1].text) {
                    for (var answer in $scope.currentQuiz.questions[question].answers) {
                        if ($scope.currentQuiz.questions[question].answers[answer].iscorrect === $rootScope.quizToAnswer.questions[question1].answers[answer].iscorrect) {
                            correctAnswers++;
                        }
                    }
                }
            }
        }
        var maxpossibleanswers = 0;
        for (var question in $scope.currentQuiz.questions) {
            for (var answer in $scope.currentQuiz.questions[question].answers) {
                if ($scope.currentQuiz.questions[question].answers[answer].iscorrect) {
                    maxpossibleanswers++;
                }
            }
        }


        var notification = {
            title: 'Студент закончил тест',
            quiz: $scope.currentQuiz,
            message: $rootScope.currentUser.name + ' ' + $rootScope.currentUser.sirname + ' закончил тест. \n' + 'Правильных ответов ' + correctAnswers + 'из ' + maxpossibleanswers
        }

        $http.post("http://localhost:3000/sendnotificationquizfinished", notification).success(function () {
            }
        )
    }


}



