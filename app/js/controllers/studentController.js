/**
 * Created by Щукин on 4/3/2015.
 */


function StudentController($scope, $http, $rootScope, helperMethods, $location) {
    $scope.currentUser = $rootScope.currentUser;
    $rootScope.groupToEdit = null;
    $rootScope.quizToEdit = null;


    if($scope.currentUser.activationStatusCode == kUnregisteredUserStatusCode)
    {
        $location.path(kUnRegisteredUserLocation);
    }else if($scope.currentUser.activationStatusCode == kBannedUserStatusCode)
    {
        $location.path(kBannedUserLocation);
    }
    else if($scope.currentUser.activationStatusCode == kVerifyUserStatusCode)
    {
        $location.path(kVerifyUserLocation);
    }

    helperMethods.initAvatarSelection($scope, $rootScope)

    $scope.editGroup = function (group) {
        $rootScope.groupToEdit = group;
    };


    $scope.editQuiz = function (quiz) {
        $rootScope.quizToEdit = quiz;
    };



    $scope.removeQuiz = $rootScope.removeQuiz =  function (quiz) {
        $scope.currentUser.quizes.splice($scope.currentUser.quizes.indexOf(quiz), 1);
        $scope.saveChanges();
        $http.post("http://quiztream-quiztreambeta.rhcloud.com//removequiz", quiz).success(function (data, status, headers, config) {
        })
    };

    $scope.removeGroup = function (group) {
        $scope.currentUser.groups.splice($scope.currentUser.quizes.indexOf(group), 1);
        $scope.saveChanges();
    };

    $scope.uploadMembers = function (group) {
        $http.post("http://quiztream-quiztreambeta.rhcloud.com//teachers/getGroupMembers", group).success(function (data, status, headers, config) {
            group.members = data;
            console.log('group members');
            console.log(data);
        })
    };


    $scope.saveChanges = function () {
        $http.post("http://quiztream-quiztreambeta.rhcloud.com//teachers/saveUser", $scope.currentUser).success(function (data, status, headers, config) {
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

    $scope.answerQuiz = function(quiz){
        $rootScope.quizToAnswer = quiz;
    }
    $http.post("http://quiztream-quiztreambeta.rhcloud.com//teachers/getStudentGroups", $scope.currentUser).success(function (data, status, headers, config) {
        $scope.currentUser.groups = data;
    })

    $http.post("http://quiztream-quiztreambeta.rhcloud.com//teachers/getStudentQuizes", $scope.currentUser).success(function (data, status, headers, config) {
        $scope.currentUser.quizes = data;
    
    })
}
