/**
 * Created by Щукин on 4/3/2015.
 */

function IncativeController($scope, $http, $rootScope, helperMethods, $location) {
    setTimeout(function(){
        $("#openDocument").change(function () {
            var fileToLoad = this.files[0];

            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                var image = new Image();
                image.src = fileLoadedEvent.target.result;

                $scope.currentUser.documentPhoto = jic.compress(image, 10, 'image/jpg').src;
                $scope.$digest();
            }
            fileReader.readAsDataURL(fileToLoad);
        });
        $("#pickDocument").click(function (e) {
            e.preventDefault();
            $("#openDocument").trigger('click');
        });
    },200)


    $scope.saveChanges = function () {
        $http.post("http://localhost:8080/authallusers").success(function (data, status, headers, config)
        {
            console.error("DEBUGMODE::ALL USERS GAINING ACCESS!");
        });


    /*
        $http.post("http://localhost:8080/teachers/saveUser", $scope.currentUser).success(function (data, status, headers, config) {
            console.log(data.message);
            if (!data.type) {
                $('#saveChangesFail').css('display', 'inline').fadeOut(2000).text('Request failed. Server error');
            } else {
                $('#saveChangesSuccess').css('display', 'inline').fadeOut(2000);
            }
        }).error(function (data, status) {
            if (status == 413) {
                $('#saveChangesFail').css('display', 'inline').fadeOut(2000).text('Request failed.');
            }
        });*/
    };

}
