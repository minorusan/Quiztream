/**
 * Created by Щукин on 4/3/2015.
 */
function StudentProfileViewController($scope, $http) {
    var responsePromise = $http.get('http://localhost:3000/teachers/getstudent');

    responsePromise.success(function (data, status, headers, config) {
        $scope.currentStudent = data;
        console.log($scope.currentStudent);
        document.getElementById('currentUserId').innerHTML = $scope.currentStudent.name + ' ' + $scope.currentStudent.sirName + ' ' + $scope.currentStudent.fatherName;
        setTimeout(function () {
            for (var q in $scope.currentStudent.completedQuizes) {
                switch ($scope.currentStudent.completedQuizes[q].grade) {
                    case 5:
                    {
                        $("#mark" + $scope.currentStudent.completedQuizes[q].id).addClass('label-success');
                        break;
                    }
                    case 4:
                    {
                        $('#mark' + $scope.currentStudent.completedQuizes[q].id).addClass('label-success');
                        break;
                    }
                    case 3:
                    {
                        $('#mark' + $scope.currentStudent.completedQuizes[q].id).addClass('label-warning');
                        break;
                    }
                    case 2:
                    {
                        $('#mark' + $scope.currentStudent.completedQuizes[q].id).addClass('label-danger');
                        break;
                    }
                }
            }
        }, 100);
    });
}
