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

}
