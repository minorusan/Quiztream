/**
 * Created by Щукин on 4/3/2015.
 */
function CreateTestController($scope, entityKeeper, $http, $rootScope, helperMethods) {
    if (!$rootScope.quizToEdit) {
        $scope.currentQuiz = entityKeeper.getQuizModel($rootScope.currentUser._id);

    } else {
        $scope.currentQuiz = $rootScope.quizToEdit;
    }

    $scope.saveQuiz = function () {
        if (!$rootScope.quizToEdit) {
            $http.post('http://quiztream-quiztreambeta.rhcloud.com/savequiz', $scope.currentQuiz).success(function (data) {
                if (data.type) {
                    $('#saveChangesSuccess').css('display', 'inline').fadeOut(2000);
                    setTimeout(window.location.href = ('http://quiztream-quiztreambeta.rhcloud.com/quizes'), 1000)
                }
            });
            var notify = {
                title:'Новый тест',
                message: 'В группе '+' '+$scope.currentQuiz.group+' добавлен тест.',
                user:$scope.currentQuiz.group
            }
            $http.post("http://quiztream-quiztreambeta.rhcloud.com/sendnotificationtest", notify).success(function (data, status, headers, config) {
                console.log('sended notification')
            })
        } else {
            $http.post('http://quiztream-quiztreambeta.rhcloud.com/updatequiz', $scope.currentQuiz).success(function (data) {
                if (data.type) {
                    $('#saveChangesSuccess').css('display', 'inline').fadeOut(2000).text('Update quiz success');
                    setTimeout(window.location.href = ('http://quiztream-quiztreambeta.rhcloud.com/quizes'), 1000)
                }
            });
        }

    };

    helperMethods.addQuestionAndPageInit($scope, entityKeeper);

    $scope.deleteQuestion = function (questionToDelete) {
        $scope.currentQuiz.questions.splice($scope.currentQuiz.questions.indexOf(questionToDelete), 1);
        $('#questionsBox').fadeOut().fadeIn();
    };
}
