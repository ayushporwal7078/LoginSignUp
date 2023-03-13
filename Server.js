const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require("cors");

//app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use(cors());

// app.get("/",(req,res)=>{
//     res.send("<h1>Welcome to Express JS : </h1>")
//  })


const SignupRoute = require('./Routes/SignUpRoutes')
const loginRoute = require('./Routes/LoginRoutes')

app.use("/api", SignupRoute)
app.use("/api", loginRoute)


mongoose.connect('mongodb://127.0.0.1:27017/User', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to Mongo")
}).catch(Error => {
    console.log(Error)
})



app.listen(8080, function(){
    console.log('Server Running : http://localhost:8080/');
})

