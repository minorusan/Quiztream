/**
 * Created by Щукин on 4/3/2015.
 */

module.exports.serverQueries = function (app, MongoDB, jwt) {

    var ObjectID = require('mongodb').ObjectID;

    app.get('/', function (req, res) {
        res.sendFile('app/index.html');
    });

    app.get('/profile', function (req, res) {
        res.sendFile(__dirname + '/app/profile.html');
    });

    app.get('/edit', function (req, res) {
        res.sendFile(__dirname + '/app/profile.html');
    });

    app.get('/quizes', function (req, res) {
        res.sendFile(__dirname + '/app/profile.html');
    });

    app.get('/groups', function (req, res) {
        res.sendFile(__dirname + '/app/profile.html');
    });


    app.get('/auth/:token', function (req, res) {
        MongoDB.collection('Teachers').findOne({token: req.params.token}, function (err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user) {
                    console.log('sended a guy')
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

    app.get('/teachers/getStudent', function (req, res) {

    });


    app.post('/teachers/register', function (req, result) {
        req.body.token = jwt.sign(req.body, 'quiztream').substring(0, 20);
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


    app.get('/teachers/getTeacherGroups', function (req, result) {
        MongoDB.collection('Groups').find({}).toArray(function (err, res) {
            result.json(res);
        })
    });

    app.post('/teachers/getTeacherQuizes', function (req, result) {
        MongoDB.collection('Quizes').find({teacherid: req.body._id}).toArray(function (err, res) {
            result.json(res);
        })
    });

    app.post('/removequiz', function (req, result) {
        MongoDB.collection('Quizes').removeOne({_id: new ObjectID(req.body._id)},function (err, res) {
            console.log('removed quiz.');
            result.json(res);
        })
    });

    app.post('/teachers/saveUser', function (req, result) {
        delete req.body._id;
        MongoDB.collection('Teachers').update({login: req.body.login}, req.body, {w:1},function (err, doc) {
            if (err) {
                console.log(err);
                result.json({type:false})
            }else{
                console.log('insert success! docs uploaded:' + doc)
                result.json({type:true})
            }

        });
    });

    app.post('/updatequiz', function (req, result) {
        var id = req.body._id;
        delete req.body._id;
        MongoDB.collection('Quizes').update({_id:new ObjectID(id)}, req.body, {w:1},function (err, doc) {
            if (err) {
                console.log(err);
                result.json({type:false})
            }else{
                console.log('update success! docs uploaded:' + doc)
                result.json({type:true})
            }
        });
    });

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
}

