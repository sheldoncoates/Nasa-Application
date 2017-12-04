var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var collection = require('./models/collection');
var mongoose = require('mongoose');
var sanitizeHtml = require('sanitize-html');
var bcrypt = require('bcrypt');
var saltRounds = 10;
mongoose.connect('mongodb://localhost:27017/nasa'); 
var http = require('http');
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
//to create collection in db
router.post('/createCollection', function(req, res) {
    var username = sanitizeHtml(req.body.username, {
        allowedTags: [],
        allowedAttributes: []
    });
    var name = sanitizeHtml(req.body.name, {
        allowedTags: [],
        allowedAttributes: []
    });
    var description = sanitizeHtml(req.body.description, {
        allowedTags: [],
        allowedAttributes: []
    });
    var visibility = sanitizeHtml(req.body.visibility, {
        allowedTags: [],
        allowedAttributes: []
    });
    var newCollection = new collection();
    newCollection.username = username;
    newCollection.name = name;
    newCollection.description = description;
    newCollection.visibility = visibility;
    newCollection.save(function(err, savedCollection){
        if(err){
            console.log(err);
        }
        return res.json("new collection created");
    });
});
//to get specific collection
router.post('/getCollections', function(req, res) {
    var username = sanitizeHtml(req.body.username, {
        allowedTags: [],
        allowedAttributes: []
    });
    collection.find({username: username}, function(err, collection){
        if(err){
            console.log(err);
        }
        return res.json(collection);
    });
    
    console.log('got collection');
});
//adding an image to a collection
router.post('/addUrl', function(req, res) {
    var collectionName = sanitizeHtml(req.body.name, {
        allowedTags: [],
        allowedAttributes: []
    });
    var url = sanitizeHtml(req.body.url, {
        allowedTags: [],
        allowedAttributes: []
    });
    collection.findOne({name: collectionName}, function(err, collection){
        if(err){
            console.log(err);
        }
        if(!collection){
            return res.json("no collection exist");
        }
        collection.urls.push(url);
        collection.save(function(err){
            if(err){
                console.log(err);
            }
            return res.json("added picture");
        })
    })
    
})
//deleting a collection
router.post('/deleteCollection', function(req, res) {
    var collectionName = sanitizeHtml(req.body.name, {
        allowedTags: [],
        allowedAttributes: []
    });
    collection.findOne({name: collectionName}, function(err, collection){
        if(err){
            console.log(err);
        }
        collection.remove();
    })
})
//deleting an image
router.post('/deleteUrl', function(req, res) {
    var collectionName = sanitizeHtml(req.body.name, {
        allowedTags: [],
        allowedAttributes: []
    });
    var url = sanitizeHtml(req.body.url, {
        allowedTags: [],
        allowedAttributes: []
    });
    collection.findOne({name: collectionName}, function(err, collection){
        var index = collection.urls.indexOf(url);
        if(index!== -1){
            collection.urls.splice(index,1);
            collection.save();
        }
        return res.json("deleted")
    })
})
//renaming a collection
router.post('/rename', function(req, res) {
    var collectionName = sanitizeHtml(req.body.name, {
        allowedTags: [],
        allowedAttributes: []
    });
    collection.findOne({name: collectionName}, function(err, collection){
        if(err){
            console.log(err);
        }
        var newname = sanitizeHtml(req.body.newname, {
        allowedTags: [],
        allowedAttributes: []
    });
        collection.name = newname;
        collection.save();
    })
})
//changing visibility
router.post('/visibility', function(req, res) {
    var collectionName = sanitizeHtml(req.body.name, {
        allowedTags: [],
        allowedAttributes: []
    });
    collection.findOne({name: collectionName}, function(err, collection) {
        if(err){
            console.log(err);
        }
        if(req.body.visibilty == 'public' || req.body.visibility == 'Public'){
            collection.visibility = "Private";
        }
        if(req.body.visibility == 'private' || req.body.visibility == 'Private'){
            collection.visibility = "Public";
        }
        collection.save();
    })
    res.json('Visibilty changed');
})
//getting all collections
router.get('/getAllCollections', function(req, res){
    collection.find(function(err, collection){
        if(err){
            console.log(err);
        }
        return res.json(collection);
    })
})
//making a rating
router.post('/rating', function(req, res) {
    var collectionName = sanitizeHtml(req.body.name, {
        allowedTags: [],
        allowedAttributes: []
    });
    collection.findOne({name: collectionName}, function(err, collection) {
        if(err){
            console.log(err);
        }
        var rating = sanitizeHtml(req.body.rating, {
        allowedTags: [],
        allowedAttributes: []
    });
        collection.rating = rating;
        collection.save();
        res.json('rating changed');
    })
})

app.use('/api', router);

app.listen(port);
console.log('Server is running on port ' + port);