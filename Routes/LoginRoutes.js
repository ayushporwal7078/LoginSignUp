const  express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Models/User')
const jwt = require('jsonwebtoken')

router.post('/login', async(req, res) => {
    const { mobileNumber, password } = req.body;
    console.log(req.body)
    try{
        const user = await User.findOne({mobileNumber})
        if (!user) {
            return res.status(400).json({error : "Invalid Credential"});
        }

        const isMatch = await bcrypt.compare(password, user.Password);
        if(!isMatch) {
            return res.status(400).json({error : "Invalid Credential"})
        }

        const token = jwt.sign({
            userId : user.id,
            mobileNumber : user.mobileNumber
        },
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3ODUyODU4MSwiaWF0IjoxNjc4NTI4NTgxfQ.Z4g6E7pj_vCj1SawuVTlNEu2R8FuV2KgN705s3XyGvA',{
            expiresIn : '1h',
        }
        );
        res.status(200).json({ token });
    }

    catch(error) {
        console.error(error);
     res.status(500).json({error : "Internal Server Error"})
    }
})



module.exports = router;