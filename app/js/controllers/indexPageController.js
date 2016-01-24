/**
 * Created by Щукин on 4/3/2015.
 */
$.material.init();
function IndexPageController($scope, $http, $cookieStore, entityKeeper, helperMethods) {
    $scope.registerEntity = entityKeeper.registerModel;
    $scope.loginModel = entityKeeper.loginModel;
    $scope.repeatPassword = '';

    var noError = true;
    $(function(){
        if($cookieStore.get('quiztreamAuth')){
            window.location.href = 'http://quiztream-quiztreambeta.rhcloud.com/'+$cookieStore.get('quiztreamAuth');
        }
    });

    helperMethods.initPictureInput($scope);

    $scope.logIn = function () {
        $http.post("http://quiztream-quiztreambeta.rhcloud.com/teachers/login", $scope.loginModel).success(function (data) {
            if (data.type) {
                $cookieStore.put('quiztreamAuth', data.token)
                if(data.student){
                    window.location.href = ("http://quiztream-quiztreambeta.rhcloud.com/studentprofile");
                }else{
                    window.location.href = ("http://quiztream-quiztreambeta.rhcloud.com/profile");
                }
                $('#loginSuccess').css('display', 'inline').fadeOut(2000);
            } else {
                $('#loginFailed').css('display', 'inline').fadeOut(2000);
            }
        })
    };

    $scope.register = function () {
        if($scope.registerEntity.isteacher===$scope.registerEntity.isstudent){
            alert("You can't be both teacher and student");
        }

        if ($scope.registerEntity.password != $scope.repeatPassword) {
            console.log('Error');
            noError = false;
            $("#passwordAlert").prop('hidden', false);
        }
        if ($scope.registerEntity.name.match(/\d+$/) != null || $scope.registerEntity.sirname.match(/\d+$/) != null || $scope.registerEntity.fathername.match(/\d+$/) != null) {
            $('.name-warning').prop('hidden', false);
            noError = false;
        }
        if (noError) {
            $http.post("http://quiztream-quiztreambeta.rhcloud.com/teachers/register", $scope.registerEntity).success(function (data, status, headers, config) {
                if(status!=413){
                    if (data.type) {
                        $cookieStore.remove('quiztreamAuth');
                        $cookieStore.put('quiztreamAuth', data.token)
                        $('#registerSuccess').css('display', 'inline').fadeOut(2000);
                        if($scope.registerEntity.isteacher){
                            window.location.href = ("http://quiztream-quiztreambeta.rhcloud.com/profile");
                        }else{
                            window.location.href = ("http://quiztream-quiztreambeta.rhcloud.com/studentprofile");
                        }

                    } else {
                        $('#registerFailed').css('display', 'inline').fadeOut(2000);
                        console.log(data.message)
                    }
                }
            })
        }
    }
}

