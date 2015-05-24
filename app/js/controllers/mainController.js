/**
 * Created by Щукин on 4/3/2015.
 */
function MainController($scope, $http, $rootScope, $cookieStore) {
    var token = $cookieStore.get('quiztreamAuth');
    if(!token){
        window.location.href = 'http://localhost:3000/';
    }

    //Initial get request
    $http.get("http://localhost:3000/auth/"+token).success(function (data, status, headers, config) {
        $scope.notification = '';
        $scope.currentUser = data.data;

        $scope.logOut = function(){
            $cookieStore.remove('quiztreamAuth');
            window.location.href = 'http://localhost:3000/';
        }

        $scope.onClearNotificationsClick = function () {
            $scope.currentUser.notifications = [];
            $http.post("http://localhost:3000/teachers/saveUser", $scope.currentUser).success(function (data, status, headers, config) {
                console.log(data.message);
            })
        };

        $scope.clearCurrentNotification = function (notification) {
            $scope.currentUser.notifications.splice($scope.currentUser.notifications.indexOf(notification), 1);
            $http.post("http://localhost:3000/teachers/saveUser", $scope.currentUser).success(function (data, status, headers, config) {
                console.log(data.message);
            })
        };

        $scope.onNotificationClick = function (notify) {
            $scope.notification = notify;
            switch ($scope.notification.grade) {
                case 5:
                {
                    $('#markLabel').addClass('label-success');
                    break;
                }
                case 4:
                {
                    $('#markLabel').addClass('label-success');
                    break;
                }
                case 3:
                {
                    $('#markLabel').addClass('label-warning');
                    break;
                }
                case 2:
                {
                    $('#markLabel').addClass('label-danger');
                    break;
                }
            }
            $('#not' + notify.id).css('display', 'none');
        };



        $('#avatarSm').attr('src', $scope.currentUser.avatar);



        $rootScope.currentUser = $scope.currentUser;//saving user to the root scope of app
    });//End of initial GET request
}