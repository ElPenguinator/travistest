var express = require('express');
var bodyParser = require("body-parser");
var monk = require('monk');	//we use monk to talk to MongoDB
var db = monk('mongo:27017/nodetest1');	//our database is nodetest1
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var http = require('http');
var path = require('path');
var fs = require('fs');
const userStories = require('./userStories');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.set('superSecret', "12345"); // secret variable

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


//Add a UserStory Service
//Create a userStory in the userStoryCollection. Also add it in the projectCollection array: userStories
//Suppose :
// POST : {"description":"foo", "difficulty":"difficulty"}
// POST : url?description=foo&difficulty=difficulty
app.put('/projects/:name', function (req, res) {
    var description = req.body.description;
    var difficulte = req.body.difficulte;
    //var projectName = req.params.name;
    var projectName = req.decoded.projects;

    if (description == null || difficulte == null) {
        res.status(422).send("Missing Arguments.");
    }
    else {
        var db = req.db;
        var userStoryCollection = db.get('userStoryCollection');
        var projectCollection = db.get('projectCollection')

        verifyAuth(req, res, function () {
            //Creation of the userStory
            userStoryCollection.insert({
                "description": description,
                "difficulty": difficulte,
                "project": projectName
            }, function (err, docProject) {
                if (err) {
                    res.status(500).send("There was a problem with the database while creating the userStory.");
                }
                else {
                    //req.decoded.role = "Développeur";

                    //add the userStory in the projectCollection
                    var updateProject = {$addToSet: {userStories: description}};
                    var projectQuery = {name: projectName};
                    projectCollection.update(projectQuery, updateProject, {upsert: true}, function (err, doc) {
                        if (err) {
                            res.status(500).send("There was a problem with the database while updating the project: adding the userStory to the project's userStory list.");
                        }
                        else {
                            res.status(200).send({success: true});
                        }
                    });
                }
            });
        }); //end of verifyAuth
    }
});


//Add a UserStory Service
//Update a userStory (by it's id) in the userStoryCollection. Also update the project's array of userStories
//Suppose :
// POST : {"description":"foo", "difficulty":"difficulty"}
// POST : url?description=foo&difficulty=difficulty
app.patch('/:id/projects/:name', function (req, res) {
    var description = req.body.description;
    var difficulte = req.body.difficulte;
    //var projectName = req.params.name;
    var projectName = req.decoded.projects;
    var userStoryId = req.params.id;

    if (description == null || difficulte == null) {
        res.status(422).send("Missing Arguments.");
    }
    else {
        var db = req.db;
        var userStoryCollection = db.get('userStoryCollection');
        var projectCollection = db.get('projectCollection');

        verifyAuth(req, res, function () {
            //Update the userStory
            var userStoryQuery = {description: description, difficulte: difficulte};
            var updateUserStory = {description: description, difficulte: difficulte};
            userStoryCollection.update(userStoryQuery, updateUserStory, {upsert: true}, function (err, doc) {
                if (err) {
                    res.status(500).send("There was a problem with the database while updating the userStory.");
                }
                else {
                    //update the userStory in the projectCollection's array
                    var updateProject = {$addToSet: {userStories: description}};
                    var projectQuery = {name: projectName};
                    projectCollection.update(projectQuery, updateProject, {upsert: true}, function (err, doc) {
                        if (err) {
                            res.status(500).send("There was a problem with the database while updating the project: updating the userStory in the project's userStory list.");
                        }
                        else {
                            res.status(200).send({success: true});
                        }
                    });
                }
            });
        }); //end of verifyAuth
    }
});


//Add a UserStory Service
//Delete a userStory (by it's id) in the userStoryCollection. Also update the project's array of userStories
//Suppose :
// POST : {"description":"foo", "difficulty":"difficulty"}
// POST : url?description=foo&difficulty=difficulty
app.delete('/:id/projects/:name', function (req, res) {
    //var projectName = req.params.name;
    var projectName = req.decoded.projects;
    var userStoryId = req.params.id;

        var db = req.db;
        var userStoryCollection = db.get('userStoryCollection');
        var projectCollection = db.get('projectCollection');

        verifyAuth(req, res, function () {
        //Delete the userStory
        var userStoryQuery = {description: description, difficulte: difficulte};
        var updateUserStory = {description: description, difficulte: difficulte};

        userStoryCollection.update(userStoryQuery, updateUserStory, {upsert: true}, function (err, doc) {
            
        });
    }); //end of verifyAuth
});


