/**
 * Created by Щукин on 4/6/2015.
 */
indexPageApp.factory('entityKeeper', allEntitiesProvider);
teachersApp.factory('entityKeeper', allEntitiesProvider);
studentApp.factory('entityKeeper', allEntitiesProvider);
function allEntitiesProvider() {
    return {
        newLinkModel:{
            text:'Some study material name',
            url:'Link to study material'
        },
        newQuestionModel: {
            text: "New question text",
            answers: [
                {
                    text: "Answer one",
                    iscorrect: false
                },
                {
                    text: "Answer two",
                    iscorrect: false
                },
                {
                    text: "Answer three",
                    iscorrect: false
                },
                {
                    text: "Answer four",
                    iscorrect: false
                }]

        },
        registerModel: {
            login: '',
            password: '',
            isteacher:false,
            name: '',
            email: '',
            sirname: '',
            token: '',
            activationStatusCode: 500,
            avatar: 'http://quiztream-quiztreambeta.rhcloud.com//img/dummy_avatar_male.jpg',
            publicnote: '',
            documentPhoto:'http://quiztream-quiztreambeta.rhcloud.com//img/license-permit.png',
            fathername: '',
            profession: '',
            quizes: [],
            groups: [],
            notifications: []
        },
        loginModel: {
            login: '',
            password: ''
        },
        getQuizModel: function (_id) {
            return {
                name: "",
                teacherid: _id,
                isoutdated: false,
                date: "",
                questionstodisplay:10,
                duration: 45,
                questions: [{
                    text: "Is this a best sample question?",
                    answers: [
                        {
                            text: "Yes",
                            iscorrect: false
                        },
                        {
                            text: "Yes",
                            iscorrect: false
                        },
                        {
                            text: "Yes",
                            iscorrect: true
                        },
                        {
                            text: "No",
                            iscorrect: false
                        }
                    ]
                }]
            }
        },
        getGroupModel: function (id) {
            return {
                groupName: 'New grop name',
                teacherId: id,
                message:'You can leave a message to students here.',
                links:[{
                    text:'Some study material name',
                    url:'Link to study material'
                }]
            }
        }
    }
}