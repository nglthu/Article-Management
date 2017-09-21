/**
 * This is the entry point for the server when a request is made wherr a server side (pre)render is
 * required. 
 **/


/** since the application is of a modular structure, transformation of modules in the components are
 * required, i.e. compile react components, this essentially allows the application to be server as if it was just
 * a single js and css file
 **/
require("babel-core/register")({
    "presets": ["es2015", "react", "stage-1"],
    "plugins": [
        [
            "css-modules-transform", {
                "generateScopedName": "[name]__[local]___[hash:base64:5]",
                "extensions": [".css"]
            }
        ],
        ["transform-decorators-legacy"], // needed for the connect module in the components 
        ["system-import-transformer"]
    ]
})

const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://mongo/SERLER";

const express = require("express")
const app = express();
const compression = require("compression") // use for content encoding gzip
const path = require('path')
// Route handlers go there
var index = require("./routes/index")



app.use(compression()) // compresses the content in gzip 
app.use(express.static(__dirname + "/../dist"))

/**
 * This block is for server to server the correct file in the environment 
 * for the purpose of loading vender productions files
 **/
if (process.env.NODE_ENV === 'production') {
    app.set('views', "./server/views/production")
} else {
    app.set('views', "./server/views/development")
}

app.set('view engine', 'ejs') // view engine to enable embedded javascript


// routes namespaces
app.use("/", index);
app.use('/user',index);
app.use('/search',index);
app.use('/articleFilter',index);

function replacer(key, value) {
  
  return value.toString().replaceAll("\\\\","");
}

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    
    app.get('/dataGet', function (req, res) {
        //import MongoClient from 'mongodb';
        //Connect to the db
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;

            db.collection("article").find({}).toArray(function (err, result) {
                if (err) throw err;
                //result = result.replace("\\\\", "");
                console.log(typeof result);
                result=JSON.stringify(result);
                var data = JSON.parse(result);
                res.json(data);
                db.close();
            });
        });
        //res.json(JSON.stringify("hello"));
    });

    

    app.get('/dataGet/getArticalReject/:id', function (req, res) {
        //import MongoClient from 'mongodb';
        //Connect to the db
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;

            db.collection("article").find({_id:id}).toArray(function (err, result) {
                if (err) throw err;
                //result = result.replace("\\\\", "");
                console.log(typeof result);
                result=JSON.stringify(result);
                var data = JSON.parse(result);
                res.json(data);
                db.close();
            });
        });
        //res.json(JSON.stringify("hello"));
    });

    app.get('/userGetdata', function (req, res) {
        
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;

            db.collection("user_profile").find({}).toArray(function (err, result) {
                if (err) throw err;
                //result = result.replace("\\\\", "");
                console.log(typeof result);
                result=JSON.stringify(result);
                var data = JSON.parse(result);
                res.json(data);
                db.close();
            });
        });
        
    });

    app.get('/article', function (req, res) {
       
    });

    app.get('/search', function (req, res) {
        
    });

    app.get('/user', function (req, res) {
        
    });

    app.post('/update', function (req, res) {
       
        //Connect to the db
        MongoClient.connect(url, function (err, db) {
            db.collection("articles").insert({
                data: "Job 2017",
                content: "Job Application",
                status: "Moderate",
                note: "Testing"
            });
            if (err) {
                res.send(500, "something went wrong");
            } else {
                res.send("200 OK");
            }
            db.close();
        });
    });
    

});
