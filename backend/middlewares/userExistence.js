const { User } = require('../db')
async function userExistenceMiddleware(req, res, next){
    try{
        const {username} = req.body
        const response = await User.findOne({
            username
        })
        
        if(response){
            return res.status(400).json({
                message: "User already exists."
            })
        }
        next()
    }catch(err){
        return res.status(500).json({
            message: "Server Error", 
            error: err.message
        })
    }
} 

async function notExistingUserMiddleware(req, res, next){
    try{
        const { username, password } = req.body 
        const response = await User.findOne({
            username
        })
        if(!response){
            return res.status(400).json({
                message: "User does not exists."
            })
        }else if(response.password != password){
            return res.status(400).json({
                message: "Wrong password"
            })            
        }
        req.user = username, 
        req.userId = response._id
        next() 
    }catch(err){
        return res.status(500).json({
            message: "Server Error", 
            error: err.message
        })
    }
}
module.exports = {
    userExistenceMiddleware, 
    notExistingUserMiddleware
}