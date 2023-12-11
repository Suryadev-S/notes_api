const secretKey = "secretKey";
const jwt = require("jsonwebtoken"); 
const User = require("../models/User");

const verify = (req,res,next) => {
    const {token} = req.params;
    jwt.verify(token,secretKey,async (err,decoded)=>{
        if(err){
            return res.status(200).json({valid: false});
        }
        req.user = await User.findOne({_id: decoded.id});
        next();        
    })
}

module.exports = verify;