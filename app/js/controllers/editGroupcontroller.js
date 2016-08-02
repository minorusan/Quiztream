/**
 * Created by Щукин on 4/24/2015.
 */
function CreateGroupController($scope, entityKeeper, $http, $rootScope, helperMethods) {
    if (!$rootScope.groupToEdit) {
        $scope.currentGroup = entityKeeper.getGroupModel($rootScope.currentUser._id);

    } else {
        $scope.currentGroup = $rootScope.groupToEdit;
    }

    $scope.saveGroup = function () {
        if (!$rootScope.groupToEdit) {
            $http.post('http://localhost:8080/savegroup', $scope.currentGroup).success(function (data) {
                if (data.type) {
                    $('#saveChangesSuccess').css('display', 'inline').fadeOut(2000);

                    setTimeout(window.location.href = ('http://localhost:8080/groups'), 1000)
                }
            });
        } else {
            $http.post('http://localhost:8080/updategroup', $scope.currentGroup).success(function (data) {
                if (data.type) {
                    $('#saveChangesSuccess').css('display', 'inline').fadeOut(2000).text('Update group success');
                    setTimeout(window.location.href = ('http://localhost:8080/groups'), 1000)
                }
            });
        }
        var notify = {
            title:$scope.currentGroup.groupName,
            message: 'В группе '+' '+$scope.currentGroup.groupName+' произошли изменения.',
            user:$scope.currentGroup
        }
        $http.post("http://localhost:8080/sendnotificationgroup", notify).success(function (data, status, headers, config) {
            console.log('sended notification')
        })
    };

    helperMethods.addLinkAndPageInit($scope, entityKeeper);

    $scope.removeGroupLink = function (link) {
        $scope.currentGroup.links.splice($scope.currentGroup.links.indexOf(link),1);
    };
}