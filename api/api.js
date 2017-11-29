var express = require('express');
var bodyParser = require("body-parser");
var monk = require('monk');	//we use monk to talk to MongoDB
var db = monk('mongo:27017/nodetest1');	//our database is nodetest1
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var http = require('http');
var path = require('path');
var fs = require('fs');

/*
var routes = require('./routes/index');
var users = require('./routes/users');
*/
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

//We can test the POST with CURL commands like (localhost example) :
//curl --data rl --data "name=Perez&surname=Mathieu&login=mperez&password=mp33" http://localhost:8080/api/users/
//curl --data rl --data "name=Humus&description=TreslongueDescription&login=mperez" http://localhost:8080/api/projects/
//curl --data rl --data "name=Humus&description=TreslongueDescription&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTBjOTNhZmUwNDU4ZjAzNGQ5ZGJlMWUiLCJuYW1lIjoiUHJlc3RhdCIsInN1cm5hbWUiOiJEaW1pdHJpIiwibG9naW4iOiJkcHJlc3RhdCIsInBhc3N3b3JkIjoiZHAzMyIsImlhdCI6MTUxMDc3MzY4OH0.DulBB-8fzxOpGODepAfmLzMiO-zACa5eK2kaO8x_oHU" http://localhost:8080/api/projects/
//curl -X PUT --data "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTBjOTNhZmUwNDU4ZjAzNGQ5ZGJlMWUiLCJuYW1lIjoiUHJlc3RhdCIsInN1cm5hbWUiOiJEaW1pdHJpIiwibG9naW4iOiJkcHJlc3RhdCIsInBhc3N3b3JkIjoiZHAzMyIsInByb2plY3RzIjpbIkh1bXVzIl0sImlhdCI6MTUxMDc4MDExNX0.w6DjZYUL95QMqFs8nm1UuNekyHeC7a85-OvsHWLZYZQ" http://localhost:8080/api/projects/Humus/users/mperez

//Test procedures :
//npm i
//for installing dependencies
//in a terminal
//mongodb --dbpath nodes_modules/data/
// in an other terminal
//node api.js
//You can now access http://localhost:8080/api/* !

//Temporally, in the future, set the config in a json file.

app.set('superSecret', "12345"); // secret variable


//Authentification Service
//Check Login Password
//Check Login Password
app.post('/api/users/token', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var userLogin = req.body.login;
    var userPassword = req.body.password;

    if (userLogin == null || userPassword == null) {
        res.status(422).send("Missing Arguments.");
    }
    else {
        //Compléter le service REST qui vérifie que la BD contient bien le login et le password d'un utilisateur(connexion d'un utilisateur US1)
        // Set our internal DB variable
        var db = req.db;

        // Find in a collection
        var query = {login: userLogin, password: userPassword};

        db.collection("userCollection").find(query, {}, function (e, docs) {
            if (docs.length != 0) {
                var query = {login: userLogin};
                var token = jwt.sign(docs[0], app.get('superSecret'));
                res.json({
                    success: true,
                    message: 'Authentication succeded!',
                    token: token
                });
            }
            else {
                res.status(400).json({success: false, message: 'Authentication failed. Wrong login/password.'});
            }
        });
    }
});

//Add a User Service
//Suppose :
// POST : {"name":"foo", "surname":"bar", "login":"user", "password":"pwd"}
// POST : url?name=foo&surname=bar&login=user&password=pwd
app.post('/api/users', function (req, res) {
    var name = req.body.name;
    var surname = req.body.surname;
    var login = req.body.login;
    var password = req.body.password;

    if (name == null || surname == null || login == null || password == null) {
        res.status(422).send("Missing Arguments.");
    }
    else {
        var db = req.db;
        var collection = db.get('userCollection');

        //Check if login already exists
        collection.find({login: login}, {}, function (err, doc) {
            if (err) {
                res.status(500).send("There was a problem with the database while checking if the login already exists.");
            }
            else {
                if (doc.length == 0) {
                    //Add the user
                    collection.insert({
                        "name": name,
                        "surname": surname,
                        "login": login,
                        "password": password
                    }, function (err, doc) {
                        if (err) {
                            res.status(500).send("There was a problem with the database while adding the user.");
                        }
                        else {
                            res.status(200).send({success: true});
                        }
                    });
                }
                else {
                    res.status(409).send("There is already a user with this login.");
                }
            }
        })
    }
});

// route middleware to verify a token
function verifyAuth(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                res.success(401).json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        res.status(401).send({
            success: false,
            message: 'No token provided.'
        });
    }

}

//Add a Project Service
//Suppose :
// POST : {"name":"foo", "description":"bar", "token":"token"}
// POST : url?name=foo&description=bar&token=token
app.post('/api/projects', function (req, res) {
    var name = req.body.name;
    var description = req.body.description;

    if (name == null || description == null) {
        res.status(422).send("Missing Arguments.");
    }
    else {
        var token = req.body.token;

        var db = req.db;
        var userCollection = db.get('userCollection');
        var projectCollection = db.get('projectCollection')

        verifyAuth(req, res, function () {

            var userQuery = {login: req.decoded.login};
            var projectQuery = {name: name};
            //Is the project name available
            projectCollection.find(projectQuery, {}, function (e, doc) {
                if (e) {
                    res.status(500).send("There was a problem with the database while checking if the project already exists.");
                }
                else {
                    if (doc.length == 0) {
                        //Creation of the project
                        projectCollection.insert({
                            "name": name,
                            "description": description
                        }, function (err, docProject) {
                            if (err) {
                                res.status(500).send("There was a problem with the database while creating the project.");
                            }
                            else {
                                //Add the project to the user's list

                                if (req.decoded.projects != undefined)
                                    delete req.decoded['projects'];
                                console.log("Req decoded");
                                console.log(req.decoded);

                                req.decoded.role = "Développeur";

                                var updateProject = {$addToSet: {users: req.decoded}};
                                projectCollection.update(projectQuery, updateProject, {upsert: true}, function (err, doc) {
                                    if (err) {
                                        res.status(500).send("There was a problem with the database while creating the project: adding the user to the project's user list.");
                                    }
                                    else {
                                        //res.status(200).send({success: true});
                                    }
                                });

                                console.log("doc Project");
                                console.log(docProject);
                                if (docProject.users != undefined)
                                    delete docProject['users'];
                                //Add the user to the project's list
                                var updateUser = {$addToSet: {projects: docProject}};
                                userCollection.update(userQuery, updateUser, {upsert: true}, function (err, doc) {
                                    if (err) {
                                        res.status(500).send("There was a problem with the database while creating the project: adding the project to the user's project list.");
                                    }
                                    else {
                                        console.log("Updated : ");
                                        console.log(doc);
                                        res.status(200).send({success: true});
                                    }
                                });
                            }
                        });
                    }
                    else {
                        res.status(409).send("There is already a project with this name.");
                    }
                }
            });
        });
    }
});

//Get a User Service
//From the Login
app.get('/api/users/:login', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var userLogin = req.params.login;
    //Remplacer userTestJSON par une requête MangoDB qui sélectionne un user selon son login
    var db = req.db;

    // Find in a collection
    var query = {login: userLogin};

    db.collection("userCollection").find(query, {}, function (e, docs) {
        if (docs.length != 0) {
            res.status(200).send(docs[0]);
        }
        else {
            res.status(404);
            res.send({error: 404});
        }
    });
});

//Get a Project Service
//From the Project Name
app.get('/api/projects/:name', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var projectName = req.params.name;
    //Remplacer userTestJSON par une requête MangoDB qui sélectionne un projet selon son nom
    var db = req.db;

    // Find in a collection
    var query = {name: projectName};

    verifyAuth(req, res, function () {
        //Fetch Project
        db.collection("projectCollection").find(query, {}, function (e, docs) {
            if (docs.length != 0) {
                //Check if the user is in the project
                var found = false;
                console.log(docs);
                for (var i = 0; i < docs[0].users.length; i++) {
                    if (docs[0].users[i].login == req.decoded.login) {
                        found = true;
                    }
                }
                if (found) {
                    res.status(200).send(docs);
                }
                else {
                    res.status(403);
                    res.send({error: 403});
                }
            }
            else {
                res.status(404);
                res.send({error: 404});
            }
        });
    });
});

//Add to the project with the "name" the User with the "login".
//Suppose :
// POST : {"name":"foo", "login":"bar"}
// POST : url?name=foo&login=bar
app.put('/api/projects/:name/users/:login', function (req, res) {
    var projectName = req.params.name;
    var userLogin = req.params.login;

    var role = req.body.role;

    //Remplacer userTestJSON par une requête MangoDB qui sélectionne un user selon son login
    var db = req.db;


    verifyAuth(req, res, function () {
        var projectQuery = {name: projectName};
        var userQuery = {login: userLogin};

        var projectCollection = db.get("projectCollection");
        var userCollection = db.get("userCollection");

        projectCollection.find(projectQuery, {}, function (e, docsProject) {
            if (docsProject.length != 0) {


                var found = false;
                for (var i = 0; i < docsProject[0].users.length; i++) {
                    if (docsProject[0].users[i].login == req.decoded.login) {
                        found = true;
                    }
                }
                if (found) {
                    userCollection.find(userQuery, {}, function (e, docsUser) {
                        if (docsUser.length != 0) {

                            if (docsUser[0].projects != undefined)
                                delete docsUser[0]['projects'];

                            docsUser[0].role = role;

                            console.log("Add U: ");
                            console.log(projectQuery);
                            console.log(docsUser[0]);
                            projectCollection.update(projectQuery, {$addToSet: {users: docsUser[0]}}, {upsert: true}, function (err, doc) {
                                if (err) {
                                    throw err;
                                }
                                console.log("Update P :");
                                console.log(doc);
                                if (docsProject[0].users != undefined)
                                    delete docsProject[0]['users'];

                                console.log("Add P:");
                                console.log(userQuery);
                                console.log(docsProject[0]);

                                userCollection.update(userQuery, {$addToSet: {projects: docsProject[0]}}, {upsert: true}, function (err, doc) {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log("Update U :");
                                    console.log(doc);
                                    res.status(200).send({success: true});
                                })
                            })
                        }
                        else {
                            res.status(404);
                            res.send({error: 404});
                        }
                    });
                }
                else {
                    res.status(403);
                    res.send({error: 403});
                }

            }
            else {
                res.status(404);
                res.send({error: 404});
            }
        });
    });
});

////// Attach application /////

// Catch all other routes and return an application file
app.get(['/', '/:requested'], function (req, res, next) {
    var requestedFileName = req.params.requested ? req.params.requested : 'index.html';

    var requestedPath = path.join(__dirname, '../web-app/dist', requestedFileName);

    // if redirected file exists, then redirect it else go to next catch
    if (fs.existsSync(requestedPath)) {
        res.sendFile(requestedPath);
    }
    else {
        next();
    }
});

///// else page introuvable
app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

// Get port from environment and store in Express.
var port = process.env.PORT || '8080';
app.set('port', port);

// Create HTTP server.
var server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, function () {
    console.log("API running on localhost:" + port);
});
