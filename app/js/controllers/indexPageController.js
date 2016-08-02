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
            window.location.href = 'http://localhost:8080/'+$cookieStore.get('quiztreamAuth');
        }
    });

    helperMethods.initPictureInput($scope);

    $scope.logIn = function () {
        $http.post("http://localhost:8080/teachers/login", $scope.loginModel).success(function (data) {
            if (data.type) {
                $cookieStore.put('quiztreamAuth', data.token)
                if(data.student){
                    window.location.href = ("http://localhost:8080/studentprofile");
                }else{
                    window.location.href = ("http://localhost:8080/profile");
                }
                $('#loginSuccess').css('display', 'inline').fadeOut(2000);
            } else {
                $('#loginFailed').css('display', 'inline').fadeOut(2000);
            }
        })
    };

    $scope.register = function () {
        noError = true;
        if ($scope.registerEntity.password != $scope.repeatPassword) {
            console.log('Error');
            noError = false;
            $("#passwordAlert").prop('hidden', false);
        }
        if ($scope.registerEntity.name.match(/\d+$/) != null || $scope.registerEntity.sirname.match(/\d+$/) != null || $scope.registerEntity.fathername.match(/\d+$/) != null) {
            $('.name-warning').prop('hidden', false);
            noError = false;
        }

        if(!validateEmail($scope.registerEntity.email))
        {
            $('.email-warning').prop('hidden', false);
            noError = false;
        }



        if (noError) {
            $http.post("http://localhost:8080/teachers/register", $scope.registerEntity).success(function (data, status, headers, config) {
                if(status!=413){
                    if (data.type) {
                        $cookieStore.remove('quiztreamAuth');
                        $cookieStore.put('quiztreamAuth', data.token)
                        $('#registerSuccess').css('display', 'inline').fadeOut(2000);
                        if($scope.registerEntity.isteacher){
                            window.location.href = ("http://localhost:8080/profile");
                        }else{
                            window.location.href = ("http://localhost:8080/studentprofile");
                        }

                    } else {
                        $('#registerFailed').css('display', 'inline').fadeOut(2000);
                        console.log(data.message)
                    }
                }
            })
        }

        function validateEmail(email)
        {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
    }
}

