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

//*************JSON ****************//
//express server is setup to parse body requests
var bodyParser = require('body-parser')
// create application/json parser
//var jsonParser = bodyParser.json()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// parse various different custom JSON types as JSON 
//app.use(bodyParser.json({ type: 'application/*+json' }))
//*************CLOSE JSON ****************//

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


    // app.post('/viewSaveSearch', function (req, res) {
    //     var name= req.body.userID;
    //     console.log("-----------viewSaveSearch: "+name)
    //     MongoClient.connect(url, function (err, db) {
    //         if (err) throw err;

    //         db.collection("savedSearch").find({userID:name},{_id:1, description:1, savetime:1,savedate:1}).toArray(function (err, result) {
    //             if (err) throw err;
    //             //result = result.replace("\\\\", "");
    //             console.log("--------------Already read done!");      
    //             console.log(typeof result);
    //             result=JSON.stringify(result);
    //             console.log("---------------- result:" +  (result) );
                
    //             var data = JSON.parse(result);
                               
    //             res.json(data);
    //             db.close();
    //         });
    //     });
        
    // });


    app.post('/viewSaveSearch', function (req, res) {
            var name= req.body.userID;
            console.log("-----------viewSaveSearch: "+name)
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
    
                    db.collection("savedSearch").aggregate([ 
                        
                        { $match : { userID : name }},
                        { $unwind:'$description'},
                        { $project : {
                            _id : 1 ,
                            description:1, savetime:1,savedate:1
                        }}
                        
                    ]).toArray(function (err, result) {
                
                    
                    if (err) throw err;
                    //result = result.replace("\\\\", "");
                //    console.log("--------------Already read done!");      
                //    console.log(typeof result);
                    result=JSON.stringify(result);
                //    console.log("---------------- result:" +  (result) );
     
                    var data = JSON.parse(result);
              
                    for (var i = 0; i < data.length; i++) { 
                        data[i].description = 
                        
                        " fieldName = " + data[i].description.fieldName + 
                        "-- condition = " + data[i].description.condition + 
                        "-- value = " + data[i].description.value  + 
                        "-- operator = " + data[i].description.operator ;


                      //  console.log("---------------data : " +  data[i].description);
                    }
                  
                    res.json(data);
                    db.close();
                });
            });
            
        });

    app.post('/getUserId', function (req, res) {
        
        var name= req.body.username;
        console.log("---------------getUsertID : " + name);
          
        //import MongoClient from 'mongodb';
        //Connect to the db
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;

            db.collection("user_profile").find({LoginName:name},{_id:1}).limit(1).toArray(function (err, result) {
                if (err) throw err;
                
                
                result=JSON.stringify(result);
                //console.log("---------------- result:" +  (result) );
               
                var data = JSON.parse(result);
                //console.log("---------------data : " + data);
                res.json(data) ;
               
               // console.log("----------------function getUserId:" +  JSON.stringify(result) );
                
                db.close();
            });
        });
        //res.json(JSON.stringify("hello"));
    });

    app.post('/insertSaveSearch', function (req, res) {
   
        // console.log("----------- User ID:" +  ( req.body.userID) );
        // console.log("------------Description: " + req.body.description);
        // console.log("------------" + req.body.datelasttring);
        // console.log("------------" + req.body.savetime);
        // console.log("------------" + req.body.savedate);

        var items ={
            userID: req.body.userID,
            description:req.body.description,
            SearchValue: req.body.description,
            savetime: req.body.savetime,
            savedate: req.body.savedate,
            datelasttring: req.body.datelasttring
           
        }
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;

            db.collection("savedSearch").insertOne(items ,function (err, result) {
                if (err) throw err;
                console.log("Items inserted");      
                
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
