
const express = require('express');
const router = express.Router();

//mongoDB connection
const mongodb_URI = "mongodb+srv://joelcraju:theholybible@user.6vaajf4.mongodb.net/?retryWrites=true"; //the mongoDb uri
const  MongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectId;
const client = new MongoClient(mongodb_URI);
client.connect();
const User = client.db('User'); //databse

//this function allows the cors functionality and add the header to all the routes/api
function appSetHeader(res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

//api to fetch all the blogs and display in react
router.get('/blogs',async (req,res)=>{
    appSetHeader(res);
    try{
        var blogs = await User.collection("Blogs").find({}).toArray();
        res.send(blogs);
    }catch(e){
        res.status(500).send({ message: e.message });
    }
})

//api to fetch the user's profile details and display in react
router.get('/profile/:id',async (req,res)=>{
    appSetHeader(res);
    try{
        var profile = User.collection("Profile");
        let result = await profile.find({_id: new ObjectId(req.params.id)}).toArray();
        res.send(result);
    }catch(e){
        res.status(500).send({ message: e.message });
    }
})

//api to fetch an individual blog using this blog's id and Delete
router.delete('/blogs/:id',async(req,res)=>{
    try{
        const blog = User.collection("Blogs");
        let result = await blog.deleteOne({_id: new ObjectId(req.params.id)},(err,obj)=>{
            if(err) throw err;
        })
        console.log(result);
        res.send("blog deleted");
    }catch(e){
        console.log(e);
        res.status(500).send({ message: e.message });
    }
})

//api to fetch a specific blog using blog's ID and display in react
router.get('/blogs/:id',async (req,res)=>{
    appSetHeader(res);
    try{
        const blog = User.collection("Blogs");
        let result = await blog.find({_id: new ObjectId(req.params.id)}).toArray();
        res.send(result);
    }catch(e){
        res.status(500).send({ message: e.message });
    }

})

//APi takes the blog's detail and save it to the database
router.post('/save',async (req,res)=>{
    appSetHeader(res);
    try{
        
        const data = req.body;
        console.log(data);
        User.collection("Blogs").insertOne(data);
        res.status(200).send("Inserted New Document");
    }catch(e){
        res.status(500).send({ message: e.message });
    }
})


module.exports = router;