const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

function signJWT(req, res, next){
    try{
        const token = jwt.sign({userId: req.userId}, JWT_SECRET)
        req.token = token 
        next()
    }catch(err){
        return res.status(500).json({
            message: "Server Error", 
            error: err.message
        })
    }
}

function verifyJWT(req, res, next){
    try{
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({
                message: "Invalid authorization header."
            })
        }
        const token = authHeader.split(" ")[1]
        jwt.verify(token, JWT_SECRET, (err, decoded)=>{
            if(err){
                if(err.name === 'TokenExpiredError'){
                    return res.status(400).json({
                        message: "Token expired"
                    })
                }else if(err.name === 'JsonWebTokenError'){
                    return res.status(400).json({
                        message: "Invalid token"
                    })
                }else{
                    return res.status(500).json({
                        message: "Something went wrong with verifying the token"
                    })
                }
            }
            req.user = decoded.username
            req.userId = decoded.userId
            next()
        })
    }catch(err){
        return res.status(500).json({
            message: "Server Error", 
            error: err.message
        })
    }
}

module.exports = {
    signJWT, 
    verifyJWT
}