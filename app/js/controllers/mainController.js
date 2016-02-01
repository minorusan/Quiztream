﻿/**
 * Created by Щукин on 4/3/2015.
 */
function MainController($scope, $http, $rootScope, $cookieStore, $rootElement, $q) {
	$.material.init();
    var token = $cookieStore.get('quiztreamAuth');
    if(!token) {
        window.location.href = 'http://quiztream-quiztreambeta.rhcloud.com/';
    }

    $rootScope.$on("$locationChangeStart", function(event, next, current) {
        if(token.indexOf('student') != -1 && $rootElement.attr('ng-app').indexOf('teacher') != -1){
            window.location.href = ("http://quiztream-quiztreambeta.rhcloud.com/studentprofile");
        }
    });
    
    var futureUser = $q.defer();
    
    $scope.currentUser = futureUser.promise;
    

    //Initial get request
    $http.get("http://quiztream-quiztreambeta.rhcloud.com/auth/"+token).success(function (data) {
        $scope.notification = '';
        futureUser.resolve(data.data);
    });//End of initial GET request
    
    futureUser.promise.then(function(){
         $scope.logOut = function(){
            $cookieStore.remove('quiztreamAuth');
            window.location.href = 'http://quiztream-quiztreambeta.rhcloud.com/';
        }

        $scope.onClearNotificationsClick = function () {
            $scope.currentUser.notifications = [];
            $http.post("http://quiztream-quiztreambeta.rhcloud.com/teachers/saveUser", $scope.currentUser).success(function (data, status, headers, config) {
                console.log(data.message);
            })
        };

        $scope.clearCurrentNotification = function (notification) {
            $scope.currentUser.notifications.splice($scope.currentUser.notifications.indexOf(notification), 1);
            $http.post("http://quiztream-quiztreambeta.rhcloud.com/teachers/saveUser", $scope.currentUser).success(function (data, status, headers, config) {
                console.log(data.message);
            })
        };

        $scope.onNotificationClick = function (notify){
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

        $rootScope.currentUser = futureUser.promise;//saving user to the root scope of app
    });
}