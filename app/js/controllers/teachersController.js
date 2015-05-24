/**
 * Created by Щукин on 4/3/2015.
 */
function TeachersController($scope, $http, $rootScope, helperMethods) {
    $scope.currentUser = $rootScope.currentUser;
    $rootScope.groupToEdit = null;
    $rootScope.quizToEdit = null;

    helperMethods.initAvatarSelection($scope, $rootScope)

    $scope.editGroup = function (group) {
        $rootScope.groupToEdit = group;
    };

    $scope.editQuiz = function (quiz) {
        $rootScope.quizToEdit = quiz;
    };

    $scope.uploadMembers = function (group) {
        $http.post("http://localhost:3000/teachers/getGroupMembers", group).success(function (data, status, headers, config) {
            group.members = data;
            console.log('group members');
            console.log(data);
        })
    };

    $scope.removeQuiz = function (quiz) {
        $scope.currentUser.quizes.splice($scope.currentUser.quizes.indexOf(quiz),1);
        $scope.saveChanges();
        $http.post("http://localhost:3000/removequiz", quiz).success(function (data, status, headers, config) {})
    };

    $scope.removeGroup = function (group) {
        $scope.currentUser.groups.splice($scope.currentUser.quizes.indexOf(group),1);
        $scope.saveChanges();
        $http.post("http://localhost:3000/removegroup", group).success(function () {})
    };

    $scope.removeGroupLink = function (group, link) {
        delete group.links.splice(group.links.indexOf(link),1);
        $http.post("http://localhost:3000/removegrouplink", group).success(function () {})
    };

    $scope.saveChanges = function () {
        $http.post("http://localhost:3000/teachers/saveUser", $scope.currentUser).success(function (data, status, headers, config) {
            console.log(data.message);
            if (!data.type) {
                $('#saveChangesFail').css('display', 'inline').fadeOut(2000).text('Save changes failed. Server error');
            } else {
                $('#saveChangesSuccess').css('display', 'inline').fadeOut(2000);
            }
        }).error(function (data, status) {
            if (status == 413) {
                $('#saveChangesFail').css('display', 'inline').fadeOut(2000).text('Save changes failed. Picture is too large');
            }
        });
    };


    $http.post("http://localhost:3000/teachers/getTeacherGroups", $scope.currentUser).success(function (data, status, headers, config) {
        $scope.currentUser.groups = data;
    })

    $http.post("http://localhost:3000/teachers/getTeacherQuizes", $scope.currentUser).success(function (data, status, headers, config) {
        $scope.currentUser.quizes = data;
    });
}
