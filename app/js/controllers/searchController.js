/**
 * Created by Щукин on 4/3/2015.
 */
function SearchController($scope, $http, $rootScope) {
    $scope.query = '';
    $scope.searchresults = [];
    $scope.performSearch = function () {
        var search = {query:$scope.query}
        $http.post("http://localhost:3000/search", search).success(function (data, status, headers, config) {
            $scope.searchresults = data;
        })
    };

    $scope.joinGroup = function(group){
        var alreadyingroup = false
        for(var groupsy in $rootScope.currentUser.groups){
            if($rootScope.currentUser.groups[groupsy]._id==group._id) {
                alreadyingroup = true;
            }
        }

        if(!alreadyingroup){
            $rootScope.currentUser.groups.push(group)
            $http.post("http://localhost:3000/teachers/saveUser", $rootScope.currentUser).success(function (data, status, headers, config) {
                console.log('added a group')

                notify = {
                    title:'Добавлен в группу',
                    message: $rootScope.currentUser.name + ' ' + $rootScope.currentUser.sirname+' добавлен в группу '+group.groupName,
                    user:group.teacherId
                }
                $http.post("http://localhost:3000/sendnotification", notify).success(function (data, status, headers, config) {
                    console.log('sended notification')
                })
            })
        }else{
            alert('Already in group')
        }


    }
}