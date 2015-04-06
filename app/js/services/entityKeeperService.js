/**
 * Created by Щукин on 4/6/2015.
 */
indexPageApp.factory('entityKeeper', allEntitiesProvider);
teachersApp.factory('entityKeeper', allEntitiesProvider);

function allEntitiesProvider() {
    return {
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
            name: '',
            sirname: '',
            token: '',
            avatar: 'http://localhost:3000/img/dummy_avatar_male.jpg',
            publicnote: '',
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
        }
    }
}