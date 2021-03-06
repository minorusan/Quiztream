'use strict';

var indexPageApp = angular.module('indexPageApp', ['ngCookies']);

var teachersApp = angular.module('teachersApp', ['ngCookies']).
    config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/groups', {
            templateUrl: './partials/teachersGroupsPartial.html',
            controller: TeachersController
        });

        $routeProvider.when('/quizes', {
            templateUrl: './partials/teachersQuizesPartial.html',
            controller: TeachersController
        });

        $routeProvider.when('/search', {
            templateUrl: './partials/searchTemplate.html',
            controller: SearchController
        });
        $routeProvider.when('/quiz/finished', {
            templateUrl: './partials/quizFinishedNotify.html'
        });
        $routeProvider.when('/student', {
            templateUrl: './partials/studentProfileView.html',
            controller: StudentProfileViewController
        });
        $routeProvider.when('/edit', {
            templateUrl: './partials/profileEditPartial.html',
            controller: TeachersController
        });
        $routeProvider.when('/quiz/pass', {
            templateUrl: './partials/answerQuizTemplate.html',
            controller: CreateTestController
        });
        $routeProvider.when('/editquiz', {
            templateUrl: '/partials/editQuizTemplate.html',
            controller: CreateTestController
        });
        $routeProvider.when('/editgroup', {
            templateUrl: '/partials/editGroupPartial.html',
            controller: CreateGroupController
        });

        $routeProvider.otherwise({redirectTo: '/groups'});
        $locationProvider.html5Mode(true)
    }]);

var studentApp = angular.module('studentApp', ['ngCookies']).
    config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/groups', {
            templateUrl: './partials/studentGroups.html',
            controller: StudentController
        });

        $routeProvider.when('/quizes', {
            templateUrl: './partials/studentQuizesPartial.html',
            controller: StudentController
        });

        $routeProvider.when('/search', {
            templateUrl: './partials/searchTemplate.html',
            controller: SearchController
        });
        $routeProvider.when('/answerquiz', {
            templateUrl: './partials/answerQuizTemplate.html',
            controller: AnswerQuizController
        });
        $routeProvider.when('/quizfinished', {
            templateUrl: './partials/quizFinishedNotify.html'
        });
        $routeProvider.when('/edit', {
            templateUrl: './partials/profileEditPartial.html',
            controller: StudentController
        });
        $routeProvider.when('/quiz/pass', {
            templateUrl: './partials/answerQuizTemplate.html',
            controller: AnswerQuizController
        });

        $routeProvider.otherwise({redirectTo: '/groups'});
        $locationProvider.html5Mode(true)
    }]);
