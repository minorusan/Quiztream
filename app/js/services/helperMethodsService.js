/**
 * Created by Щукин on 4/6/2015.
 */
teachersApp.factory('helperMethods', allHelperMethodsProvider);
indexPageApp.factory('helperMethods', allHelperMethodsProvider);
studentApp.factory('helperMethods', allHelperMethodsProvider);

function allHelperMethodsProvider() {
    return {
        initPictureInput: function ($scope) {
            $("#openFile").change(function () {
                var fileToLoad = this.files[0];

                var fileReader = new FileReader();

                fileReader.onload = function (fileLoadedEvent) {
                    var image = new Image();
                    image.src = fileLoadedEvent.target.result;

                    $scope.registerEntity.avatar = jic.compress(image, 9, 'image/jpg').src;
                    $scope.$digest();
                }
                fileReader.readAsDataURL(fileToLoad);
            });
            $("#avatarSm").click(function (e) {
                e.preventDefault();
                $("#openFile").trigger('click');
            });
        },

        addQuestionAndPageInit: function ($scope, entityKeeper) {
            $(function () {
                $('#testDate').datepicker();
            })
            $('#testDate').change(function () {
                $scope.currentQuiz.date = $('#testDate').val();
            })

            document.getElementById('addQuestionButton').onclick = function () {
                $scope.currentQuiz.questions.unshift(entityKeeper.newQuestionModel);

                if ($scope.currentQuiz.questions.length > 10) {
                    $('#qcountlabel').removeClass('label-info')
                    $('#qcountlabel').addClass('label-success')
                }
                if ($scope.currentQuiz.questions.length > 20) {
                    $('#qcountlabel').removeClass('label-success')
                    $('#qcountlabel').addClass('label-warning')
                }
                if ($scope.currentQuiz.questions.length > 30) {
                    $('#qcountlabel').removeClass('label-warning')
                    $('#qcountlabel').addClass('label-danger')
                }

                console.log($scope.currentQuiz.questions[0])
                $scope.$digest();
                $('#questionsBox').fadeOut().fadeIn();
            };
        },
        addLinkAndPageInit: function ($scope, entityKeeper) {
            document.getElementById('addQuestionButton').onclick = function () {
                $scope.currentGroup.links.unshift(entityKeeper.newLinkModel);

                if ($scope.currentGroup.links.length > 10) {
                    $('#qcountlabel').removeClass('label-info')
                    $('#qcountlabel').addClass('label-success')
                }
                if ($scope.currentGroup.links.length > 20) {
                    $('#qcountlabel').removeClass('label-success')
                    $('#qcountlabel').addClass('label-warning')
                }
                if ($scope.currentGroup.links.length > 30) {
                    $('#qcountlabel').removeClass('label-warning')
                    $('#qcountlabel').addClass('label-danger')
                }
                $scope.$digest();
                $('#questionsBox').fadeOut().fadeIn();
            };
        },

        initAvatarSelection: function ($scope, $rootScope) {

            $("#openfile").change(function () {
                var fileToLoad = this.files[0];
                var fileReader = new FileReader();
                fileReader.onload = function (fileLoadedEvent) {
                    var image = new Image();
                    image.src = fileLoadedEvent.target.result;
                    $scope.currentUser.avatar = jic.compress(image, 10, 'image/jpg').src;
                    console.log('done!')
                    $rootScope.$digest();
                    $scope.$digest();
                }
                fileReader.readAsDataURL(fileToLoad);
            });
            $("#changepick").click(function (e) {
                e.preventDefault();
                $("#openfile").trigger('click');
            });

            //Initialising modals for quizes
            setTimeout(function () {
                console.log('Quizes count:' + $scope.currentUser.quizes.length)
                for (var i = 0; i <= $scope.currentUser.quizes.length - 1; i++) {
                    if ($scope.currentUser.quizes[i].isoutdated == true) {
                        var tr = document.getElementById($scope.currentUser.quizes[i]._id);
                        if (tr != null) {
                            tr.setAttribute('class', 'danger');
                            tr.setAttribute('title', 'This test is already outdated');
                        }
                    }
                    ;
                    var anyrow = document.getElementById($scope.currentUser.quizes[i]._id);
                    if (anyrow != null) {
                        anyrow.setAttribute('data-toggle', 'modal');
                        anyrow.setAttribute('data-target', '#myModal' + $scope.currentUser.quizes[i]._id);
                    }
                }
            }, 100);
        }
    }
}