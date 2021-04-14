const express = require('express');
const app = express();
const cors = require('cors')
const bodyparser = require('body-parser');
app.use(cors());
const mongodbclient = require('mongodb');
dburl = "mongodb://localhost:27017/";
var request = require('request');
 function updateClient(postData){

        }
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors())

kucchidb="kucchi";
kucchicollection="kucchicollection";



app.get('/kucchi/download',function(req,res){
    console.log(req.body);
    
    res.setHeader('Content-type','application/zip');
    // res.sendFile(__dirname + '/fonts/kucchi_ttf.zip');
    // const file = `${__dirname}/fonts/kucchi_ttf.zip`;
    // const data = fs.readFileSync(file, 'utf-8');
    res.download("kucchi.zip","kucchi.zip");
    // app.use("/fonts", express.static("fonts"))
})

app.post('/adddata',function(req,res){
    console.log(req.body);
    var postData={from:"antonyrahul@untitled1.in",to:req.body.email,subject:"DOWNLOAD KUCCHI FONTS",text:"",html:"<h3>Please find the font and lisence attached",attachments:["./attachments/kucchi.zip","./attachments/asur.zip"]}
    var clientServerOptions = {
        uri: 'http://localhost:4125/sendmail',
        body: JSON.stringify(postData),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(clientServerOptions, function (error, response) {
        console.log(error,response.body);
        if(error||response.body.message!="saved")
        {
            res.json({
                message:"failed"
            })
        }
       
    });
    var date=new Date();
    var datestr=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    console.log(datestr)
    var time= Date.now()


   

    mongodbclient.connect(dburl, function (err, client) {
        if (err) throw err;
        var db = client.db(kucchidb);
        let finddata = { creatorsinckey: "creatorsinc" }
        req.body.date=datestr;
        req.body.time=time;
        

        let updatedata = {
            $push: { userData: req.body},
            $setOnInsert: finddata,

        }
        
      
            db.collection(kucchicollection).findOneAndUpdate(finddata,updatedata, { upsert: true }, function (err, data) {
                if (err) {throw err};
                client.close();
                res.json({
                    message: "saved",
                    
            })
            // Store hash in your password DB.
        

       // client.close();
    });

})

})

app.post('/getalldata',function(req,res){
   

   

    mongodbclient.connect(dburl, function (err, client) {
        if (err) throw err;
        var db = client.db(kucchidb);
        let finddata = { creatorsinckey: "creatorsinc" }

        // let updatedata = {
        //     $inc: { "formvisitcount":+1},
        //     $setOnInsert: finddata,

        // }
 
            db.collection(kucchicollection).findOne(finddata, function (err, data) {
                if (err) throw err;
                client.close();
                res.json({
                    message: "saved",
                    data:data
                    
            })

    });

})

})

app.post('/sitevisit',function(req,res){
   


   

    mongodbclient.connect(dburl, function (err, client) {
        if (err) throw err;
        var db = client.db(kucchidb);
        let finddata = { creatorsinckey: "creatorsinc" }

        let updatedata = {
            $inc: { "sitevisitcount":+1},
            $setOnInsert: finddata,

        }
 
            db.collection(kucchicollection).findOneAndUpdate(finddata,updatedata, { upsert: true }, function (err, data) {
                if (err) throw err;
                client.close();
                res.json({
                    message: "saved",
                    
            })

    });

})

})

app.post('/infovisit',function(req,res){
 
   

    mongodbclient.connect(dburl, function (err, client) {
        if (err) throw err;
        var db = client.db(kucchidb);
        let finddata = { creatorsinckey: "creatorsinc" }

        let updatedata = {
            $inc: { "infovisitcount":+1},
            $setOnInsert: finddata,

        }
 
            db.collection(kucchicollection).findOneAndUpdate(finddata,updatedata, { upsert: true }, function (err, data) {
                if (err) throw err;
                client.close();
                res.json({
                    message: "saved",
                    
            })

    });

})

})

app.post('/fontvisit',function(req,res){
  
   

    mongodbclient.connect(dburl, function (err, client) {
        if (err) throw err;
        var db = client.db(kucchidb);
        let finddata = { creatorsinckey: "creatorsinc" }

        let updatedata = {
            $inc: { "fontvisitcount":+1},
            $setOnInsert: finddata,

        }
 
            db.collection(kucchicollection).findOneAndUpdate(finddata,updatedata, { upsert: true }, function (err, data) {
                if (err) throw err;
                client.close();
                res.json({
                    message: "saved",
                    
            })

    });

})

})

app.post('/kucchivisit',function(req,res){
  
   

    mongodbclient.connect(dburl, function (err, client) {
        if (err) throw err;
        var db = client.db(kucchidb);
        let finddata = { creatorsinckey: "creatorsinc" }

        let updatedata = {
            $inc: { "kucchivisitcount":+1},
            $setOnInsert: finddata,

        }
 
            db.collection(kucchicollection).findOneAndUpdate(finddata,updatedata, { upsert: true }, function (err, data) {
                if (err) throw err;
                client.close();
                res.json({
                    message: "saved",
                    
            })

    });

})

})



app.listen(4123, function () {

    console.log("listening on port 4123");
});