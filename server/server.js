var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var user = require('./models/user');
var mongoose = require('mongoose');
var sanitizeHtml = require('sanitize-html');
var bcrypt = require('bcrypt');
var saltRounds = 10;
mongoose.connect('mongodb://localhost:27017/nasa'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Start server on port 8081
// It is important to start Node on a different port
var port = 8081;

var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening');
    next();
});

router.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    user.findOne({username: username}, function(err, user){
        var response = res;
        if(err){
            console.log(err);
            return res.status(500).send("error");
        }
        if(!user){
            return res.status(404).send("user does not exist");
        }
        var hashPassword = user.password;
        bcrypt.compare(password, hashPassword, function(err, res){
            if(res == true){
                return response.status(200).send("user has been found with matching password");
            }
            else{
                return response.status(404).send("password does not match username");
            }
        });
    });
    
});

router.post('/register', function(req, res){
    var username = sanitizeHtml(req.body.username, {
        allowedTags: [],
        allowedAttributes: []
    });
    var password = sanitizeHtml(req.body.password, {
        allowedTags: [],
        allowedAttributes: []
    });
    
    if(username == "" || password == ""){
        res.status(400).send("injection detected");
    }else{
        var newUser = new user();
        newUser.username = username;
        newUser.password = password;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash){
                newUser.password = hash;
                newUser.save(function(err, savedUser){
                    if (err) {
                        console.log(err);
                        return res.status(500).send();
                    }
                    return res.status(200).send();
                });
            });
        });
    }
});


app.use('/api', router);

app.listen(port);
console.log('Server is running on port ' + port);