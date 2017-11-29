var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var user = require('./models/user');
var mongoose = require('mongoose');
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

// GET request to /api returns { message: 'Hello World' }
// In my C9 account the request must be sent to https://node-angular-lgobinath.c9users.io:8081/api
router.get('/', function(req, res) {
    res.json({ message: 'Hello World' });
});


router.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    
    user.findOne({username: username, password: password}, function(err, user){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        if(!user){
            return res.status(404).send();
        }
        return res.status(200).send();
    })
    
})

router.post('/register', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    
    var newUser = new user();
    newUser.username = username;
    newUser.password = password;
    
    newUser.save(function(err, savedUser){
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send();
    });
});


app.use('/api', router);

app.listen(port);
console.log('Server is running on port ' + port);