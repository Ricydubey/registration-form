const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Database')
const db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/sign_up",(req,res) => {
    const name= req.body.name
    const age=req.body.age
    const email=req.body.email
    const phno=req.body.phno
    const gender=req.body.gender
    const password=req.body.password

    const data = {
        "name":name,
        "age": age,
        "email": email,
        "phno": phno,
        "gender": gender,
        "password": password
    };
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    });
    return res.redirect('/signup_successful.html')
});

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    });
    return res.redirect('/index.html')
}).listen(3000);

console.log("Listening on port 3000")


