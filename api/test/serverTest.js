var expect  = require("chai").expect;
var request = require("request");
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

describe("Scrum Management API", function() {

    var url = "http://localhost:8080/api/";

    describe("POST Créer un utilisateur", function() {
        var localurl = url + "users/";

        it("Bad request (missing Argument) : returns status 422", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { login: "dprestat", password: "dp33", surname: "Dimitri"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(422);
                done();
            });
        });

        it("Good request : returns status 200", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { login: "dprestat", password: "dp33", name: "Prestat", surname: "Dimitri"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("Another request : returns status 200", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { login: "abounader", password: "ab33", name: "Bounader", surname: "Adrien"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("Duplicate request : returns status 409", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { login: "dprestat", password: "dp33", name: "Prestat", surname: "Dimitri"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(409);
                done();
            });
        });

    });

    describe("POST Authentification", function() {
        var localurl = url + "users/token";

        it("Bad Request (missing arguments) : returns status 409", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    {password: "dp33"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(422);
                done();
            });
        });

        it("Bad Request (not matching arguments) : returns status 409", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { login: "dpresta", password: "dp33"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        });

        it("Good Request : returns status 200", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { login: "dprestat", password: "dp33"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("fetched the associated user", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { login: "dprestat", password: "dp33"}
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                var token = bodyJson.token;
                jwt.verify(token, "12345", function (err, decoded) {
                    expect(decoded.login).to.equal("dprestat");
                    expect(decoded.password).to.equal("dp33");
                });
                done();

            });
        });
    });




    describe("POST Créer un projet", function() {
        var localurl = url + "projects/";
        var authurl = url + "users/token";

        it("Bad request (missing Argument) : returns status 422", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     authurl,
                form:    { login: "dprestat", password: "dp33"}
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                //done();
                request.post({
                    headers: {'x-access-token' : bodyJson.token},
                    url:     localurl,
                    form:    { name: "Bepp"}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(422);
                    done();
                });

            });
        });

        it("Bad request (missing Token) : returns status 401", function(done) {
                request.post({
                    url:     localurl,
                    form:    { name: "Bepp"}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(422);
                    done();
                });
        });

        it("Bad request (bad Token) : returns status 401", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     authurl,
                form:    { login: "abounad", password: "ab33"}
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                //done();
                request.post({
                    headers: {'x-access-token' : bodyJson.token},
                    url:     localurl,
                    form:    { name: "Bepp", description: "Notre projet"}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(401);
                    done();
                });

            });
        });

        it("Good request : returns status 200", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     authurl,
                form:    { login: "dprestat", password: "dp33"}
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                //done();
                request.post({
                    headers: {'x-access-token' : bodyJson.token},
                    url:     localurl,
                    form:    { name: "Bepp", description: "Notre projet"}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(200);
                    done();
                });

            });
        });


        it("Duplicate request : returns status 409", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     authurl,
                form:    { login: "dprestat", password: "dp33"}
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                //done();
                request.post({
                    headers: {'x-access-token' : bodyJson.token},
                    url:     localurl,
                    form:    { name: "Bepp", description: "Notre projet"}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(409);
                    done();
                });

            });
        });
    });



    describe("GET Obtenir un utilisateur", function() {
        var localurl = url + "users/dprestat";
        it("Good request : returns status 200", function(done) {
            request.get({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("fetched the associated user", function(done) {
            request.get({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                var login = bodyJson.login;
                var password = bodyJson.password;
                var name = bodyJson.name;
                var surname = bodyJson.surname;

                expect(login).to.equal("dprestat");
                expect(password).to.equal("dp33");
                expect(name).to.equal("Prestat");
                expect(surname).to.equal("Dimitri");
                done();
            });
        });
    });

    describe("GET Obtenir un projet", function() {
        var localurl = url + "projects/Bepp";
        var authurl = url + "users/token";

        it("Bad request (missing Token) : returns status 401", function(done) {
            request.get({
                url:     localurl,
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(401);
                done();
            });
        });

        it("Bad request (bad Token) : returns status 401", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     authurl,
                form:    { login: "abounad", password: "ab33"}
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                //done();
                request.get({
                    headers: {'x-access-token' : bodyJson.token},
                    url:     localurl,
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(401);
                    done();
                });

            });
        });

        it("Bad request (Unauthorized Token) : returns status 403", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     authurl,
                form:    { login: "abounader", password: "ab33"}
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                //done();
                request.get({
                    headers: {'x-access-token' : bodyJson.token},
                    url:     localurl,
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(403);
                    done();
                });
            });
        });

        it("Good request : returns status 200", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     authurl,
                form:    { login: "dprestat", password: "dp33"}
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                //done();
                request.get({
                    headers: {'x-access-token' : bodyJson.token},
                    url:     localurl,
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(200);
                    done();
                });

            });
        });
    });

    describe("PUT Ajouter un utilisateur à un projet", function() {
        var localurl = url + "projects/Bepp/users/abounader";
        var authurl = url + "users/token";

        it("Bad request (missing Token) : returns status 401", function(done) {
            request.put({
                url:     localurl,
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(401);
                done();
            });
        });

        it("Bad request (bad Token) : returns status 401", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     authurl,
                form:    { login: "abounad", password: "ab33"}
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                //done();
                request.put({
                    headers: {'x-access-token' : bodyJson.token},
                    url:     localurl,
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(401);
                    done();
                });

            });
        });

        it("Bad request (Unauthorized Token) : returns status 403", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     authurl,
                form:    { login: "abounader", password: "ab33"}
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                //done();
                request.put({
                    headers: {'x-access-token' : bodyJson.token},
                    url:     localurl,
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(403);
                    done();
                });
            });
        });

        it("Good request : returns status 200", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     authurl,
                form:    { login: "dprestat", password: "dp33"}
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                //done();
                request.put({
                    headers: {'x-access-token' : bodyJson.token},
                    url:     localurl,
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(200);
                    done();
                });

            });
        });
    });
});