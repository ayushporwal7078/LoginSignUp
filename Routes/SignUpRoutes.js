const express = require('express');
const router =  express.Router()
const bcrypt =  require('bcrypt');
const User = require('../Models/User');

router.post('/signup', async(req,res) =>{

    const  {
        firstName,
        lastName,
        mobileNumber,
        State,
        city,
        gender,
        Password,
        confirmPassword,
    } = req.body;
    
console.log(req.body)

    if(Password != confirmPassword){
        return res.status(404).json({error : "Password did not match"})
    }

    try {
        const existingUser = await User.findOne({mobileNumber});
        if(existingUser){
            return res.status(404).json({error: "User Already exist"})
        }
 
        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = new User ({
              firstName,
              lastName,
              mobileNumber,
              State,
              city,
              gender,
              Password : hashedPassword,
        });
    await newUser.save();
res.status(201).json({message : "User Created Successfully"});
console.log("user created successfully")
    } catch (error) {
        console.error(error);
    res.status(500).json({error : "Internal Server Error"})
    }
})

module.exports = router;
