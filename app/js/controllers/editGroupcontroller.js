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
            $http.post('http://quiztream-quiztreambeta.rhcloud.com/updategroup', $scope.currentGroup).success(function (data) {
                if (data.type) {
                    $('#saveChangesSuccess').css('display', 'inline').fadeOut(2000);

                    setTimeout(window.location.href = ('http://quiztream-quiztreambeta.rhcloud.com/groups'), 1000)
                }
            });
        } else {
            $http.post('http://quiztream-quiztreambeta.rhcloud.com/updategroup', $scope.currentGroup).success(function (data) {
                if (data.type) {
                    $('#saveChangesSuccess').css('display', 'inline').fadeOut(2000).text('Update group success');
                    setTimeout(window.location.href = ('http://quiztream-quiztreambeta.rhcloud.com/groups'), 1000)
                }
            });
        }
        var notify = {
            title:$scope.currentGroup.groupName,
            message: 'В группе '+' '+$scope.currentGroup.groupName+' произошли изменения.',
            user:$scope.currentGroup
        }
        $http.post("http://quiztream-quiztreambeta.rhcloud.com/sendnotificationgroup", notify).success(function (data, status, headers, config) {
            console.log('sended notification')
        })
    };



    helperMethods.addLinkAndPageInit($scope, entityKeeper);

    $scope.removeGroupLink = function (link) {
        $scope.currentGroup.links.splice($scope.currentGroup.links.indexOf(link),1);
    };
}