/**
 * Created by Щукин on 4/3/2015.
 */

module.exports.serverQueries = function (app, MongoDB, jwt) {
    var ObjectID = require('mongodb').ObjectID;

    app.get('/', function (req, res) {
        res.sendFile('app/index.html');
    });

    app.get('/:token', function (req, res) {
        if (req.params.token.indexOf('student') != -1) {
            res.sendFile(__dirname + '/app/studentprofile.html');
            console.log('sended student')
        } else {
            res.sendFile(__dirname + '/app/profile.html');
            console.log('sended teacher')
        }
    });


    app.get('/studentprofile', function (req, res) {
        console.log('Sended student profile')
        res.sendFile(__dirname + '/app/studentprofile.html');
    });

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
    app.get('/auth/:token', function (req, res) {
        MongoDB.collection('Teachers').findOne({token: req.params.token}, function (err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user) {
                    res.json({
                        type: true,
                        data: user,
                        token: user.token
                    });
                } else {
                    res.json({
                        type: false,
                        data: "Incorrect email/password"
                    });
                }
            }
        });
    })

    app.post('/teachers/register', function (req, result) {
        var student = '';
        if (!req.body.isteacher) {
            student = 'student';

        }
        req.body.token = guid() + student;
        console.log(req.body.token);
        MongoDB.collection('Teachers').findOne({login: req.body.login}, function (err, docs) {
            if (docs) {
                console.log('Login is busy')
                result.json({
                    type: false,
                    message: 'There is a user with that login '
                })
            } else {
                MongoDB.collection('Teachers').insert(req.body, function (err, doc) {
                    if (!err && doc) {
                        console.log('create success')
                        result.json({
                            type: true,
                            token: req.body.token
                        })
                    } else {
                        console.log('create failure')
                        result.json({
                            type: false,
                            message: 'Registration failed ' + err
                        })
                    }
                })
            }
        })


    });
    app.post('/teachers/login', function (req, result) {
        MongoDB.collection('Teachers').findOne({
            login: req.body.login,
            password: req.body.password
        }, function (err, doc) {
            if (!err && doc) {
                result.json({
                    type: true,
                    student: doc.isstudent,
                    token: doc.token
                })
            } else {
                result.json({
                    type: false,
                    message: 'no such a user ' + err
                })
            }
        })

    });

    app.post('/teachers/getGroupMembers', function (req, result) {
        var members = [];
        MongoDB.collection('Teachers').find().toArray(function (err, res) {
            for (var student in res) {
                if (res[student].isstudent) {
                    for (var group in res[student].groups) {
                        if (res[student].groups[group]._id == req.body._id) {
                            members.push(res[student])
                        }
                    }

                }
            }
            result.json(members);
        })
    });

    app.post('/teachers/getTeacherGroups', function (req, result) {
        MongoDB.collection('Groups').find({teacherId: req.body._id}).toArray(function (err, res) {
            result.json(res);
        })
    });

    app.post('/teachers/getStudentGroups', function (req, result) {
        var groups = [];
        MongoDB.collection('Groups').find().toArray(function (err, res) {

            for (var group in res) {
                for (var studentgroups in req.body.groups) {
                    if (res[group]._id == req.body.groups[studentgroups]._id) {
                        groups.push(res[group])
                    }
                }
            }
            result.json(groups);
        })

    });

    app.post('/teachers/getStudentQuizes', function (req, result) {

        var quizestosend = [];
        MongoDB.collection('Teachers').findOne({_id: new ObjectID(req.body._id)}, function (err, res) {
            groupNames = [];
            for(var group in res.groups){
                groupNames.push(res.groups[group].groupName)
            }
            for(var group in groupNames){
                MongoDB.collection('Quizes').find({group: groupNames[group]}).toArray(function (err, res) {
                    for(var quiz in res){
                        quizestosend.push(res[quiz]);
                    }
                    result.json(quizestosend);
                })
            }
        })

    });

    app.post('/teachers/getTeacherQuizes', function (req, result) {

        MongoDB.collection('Quizes').find({teacherid: req.body._id}).toArray(function (err, res) {
            result.json(res);
        })
    });

    app.post('/removequiz', function (req, result) {
        MongoDB.collection('Quizes').removeOne({_id: new ObjectID(req.body._id)}, function (err, res) {

            result.json(res);
        })
    });

    app.post('/removegroup', function (req, result) {
        MongoDB.collection('Groups').removeOne({_id: new ObjectID(req.body._id)}, function (err, res) {

            result.json(res);
        })
    });

    app.post('/removegrouplink', function (req, result) {
        delete req.body._id;
        MongoDB.collection('Groups').update({groupName: req.body.groupName}, req.body, {w: 1}, function (err, doc) {
            if (err) {
                console.log(err);
                result.json({type: false})
            } else {
                console.log('insert success! docs uploaded:' + doc)
                result.json({type: true})
            }

        });
    });

    app.post('/teachers/saveUser', function (req, result) {
        delete req.body._id;
        console.log(req.body.groups)
        MongoDB.collection('Teachers').update({login: req.body.login}, req.body, {w: 1}, function (err, doc) {
            if (err) {
                console.log(err);
                result.json({type: false})
            } else {
                console.log('insert success! docs uploaded:' + doc)
                result.json({type: true})
            }
        });
    });

    app.post('/updatequiz', function (req, result) {
        var id = req.body._id;
        delete req.body._id;
        MongoDB.collection('Quizes').update({_id: new ObjectID(id)}, req.body, {w: 1}, function (err, doc) {
            if (err) {
                console.log(err);
                result.json({type: false})
            } else {
                console.log('update success! docs uploaded:' + doc)
                result.json({type: true})
            }
        });
    });

    app.post('/updategroup', function (req, result) {
        var id = req.body._id;
        delete req.body._id;
        MongoDB.collection('Groups').update({_id: new ObjectID(id)}, req.body, {w: 1}, function (err, doc) {
            if (err) {
                console.log(err);
                result.json({type: false})
            } else {
                console.log('update success! docs uploaded:' + doc)
                result.json({type: true})
            }
        });
    });

    app.post('/sendnotification', function (req, result) {
        var notificationBody = {
            title: req.body.title,
            message: req.body.message
        }
        MongoDB.collection('Teachers').findOne({_id: new ObjectID(req.body.user)}, function (err, doc) {
            if (!err) {
                console.log(doc)
                addNotificationTo(doc, notificationBody)
            }
        })
    })



    app.post('/sendnotificationquizfinished', function (req, result) {
        var notificationBody = {
            title: req.body.title,
            message: req.body.message
        }
        console.log('Got here!'+notificationBody.message);
       MongoDB.collection('Groups').findOne({groupName:req.body.quiz.group}, function (err, doc) {
           console.log('And here'+doc.groupName);
           MongoDB.collection('Teachers').findOne({_id:new ObjectID(doc.teacherId)},function(err,teacher){
               console.log('And here'+doc.name);
               addNotificationTo(teacher,notificationBody);
           })
       })
    })

    app.post('/sendnotificationgroup', function (req, result) {
        var notificationBody = {
            title: req.body.title,
            message: req.body.message
        }

        MongoDB.collection('Teachers').find().toArray(function (err, res) {
            if (!err) {
                for (var student in res) {
                    if (res[student].isstudent) {
                        for (var group in res[student].groups) {
                            if (res[student].groups[group]._id == req.body.user._id) {
                                console.log('adding notification')
                                addNotificationTo(res[student], notificationBody)
                            }
                        }

                    }
                }

            }
        })
    })

    app.post('/sendnotificationtest', function (req, result) {
        var notificationBody = {
            title: req.body.title,
            message: req.body.message
        }

        MongoDB.collection('Teachers').find().toArray(function (err, res) {
            if (!err) {
                for (var student in res) {
                    if (res[student].isstudent) {
                        for (var group in res[student].groups) {
                            if (res[student].groups[group].groupName == req.body.user) {
                                console.log('adding notification')
                                addNotificationTo(res[student], notificationBody)
                            }
                        }

                    }
                }

            }
        })
    })


    function addNotificationTo(reciever, notificationBody) {
        if (reciever.notifications) {
            reciever.notifications.push(notificationBody)
        } else {
            reciever.notifications = [];
            reciever.notifications.push(notificationBody)
        }

        delete reciever._id;
        MongoDB.collection('Teachers').update({login: reciever.login}, reciever, {w: 1}, function (err, doc) {
            if (!err && doc) {
                console.log('Added notification')
            }
        })
    }

    app.post('/savequiz', function (req, result) {
        req.body._id = new ObjectID();
        MongoDB.collection('Quizes').insert(req.body, function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                result.json({
                    type: true,
                    message: 'success'
                });
            }
        });
    });

    app.post('/search', function (req, result) {
        var searchresults = {
            groups: [],
            teachers: []

        }

        MongoDB.collection('Groups').find().toArray(function (err, res) {
            for (var group in res) {
                if (res[group].groupName.indexOf(req.body.query) != -1) {
                    searchresults.groups.push(res[group]);
                }
            }
            MongoDB.collection('Teachers').find().toArray(function (err, res) {
                for (var teacher in res) {
                    var teacherName = res[teacher].name + res[teacher].sirname + res[teacher].fathername;

                    if (res[teacher].isteacher && teacherName.toLowerCase().indexOf(req.body.query.toLowerCase()) != -1) {
                        searchresults.teachers.push(res[teacher]);
                    }
                }

                result.json(searchresults);
            });
        });


    });


    app.post('/savegroup', function (req, result) {
        req.body._id = new ObjectID();
        MongoDB.collection('Groups').insert(req.body, function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                result.json({
                    type: true,
                    message: 'success'
                });
            }
        });
    });
}

