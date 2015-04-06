/**
 * Created by Щукин on 4/3/2015.
 */
function TeachersController($scope, $http, $rootScope, helperMethods) {
    $scope.currentUser = $rootScope.currentUser;

    helperMethods.initAvatarSelection($scope, $rootScope)

    $scope.editQuiz = function (quiz) {
        $rootScope.quizToEdit = quiz;
    };

    $scope.removeQuiz = function (quiz) {
        $http.post("http://localhost:3000/removequiz", quiz).success(function (data, status, headers, config) {
            window.location.href = 'http://localhost:3000/quizes';
        })
    }

    $scope.saveChanges = function () {
        $http.post("http://localhost:3000/teachers/saveUser", $scope.currentUser).success(function (data, status, headers, config) {

            console.log(data.message);
            if (!data.type) {
                $('#saveChangesFail').css('display', 'inline').fadeOut(2000).text('Save changes failed. Server error');
            } else {
                $('#saveChangesSuccess').css('display', 'inline').fadeOut(2000);
            }
        }).error(function (data, status, headers, config) {
            if (status == 413) {
                $('#saveChangesFail').css('display', 'inline').fadeOut(2000).text('Save changes failed. Picture is too large');
            }
        });
    };

    $http.post("http://localhost:3000/teachers/getTeacherQuizes", $scope.currentUser).success(function (data, status, headers, config) {
        $scope.currentUser.quizes = data;
    });
}
