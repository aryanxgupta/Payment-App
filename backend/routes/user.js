const express = require('express')
const router = express.Router()
const { User } = require('../db')
const { addBalance } = require('../middlewares/accountMW')
const { userAuthMiddleware, loginAuthMiddleware, updateMiddleware } = require('../middlewares/userAuthMW')
const { userExistenceMiddleware, notExistingUserMiddleware } = require('../middlewares/userExistence')
const { signJWT, verifyJWT } = require('../middlewares/jwtMW')

router.post('/signup', userAuthMiddleware, userExistenceMiddleware, async function(req, res, next){
    try{
        const {firstName, lastName, username, password} = req.body
        const newUser = await User.create({
            firstName, 
            lastName, 
            username, 
            password
        })
        req.user = newUser.username
        req.userId = newUser._id
        next()
    }catch(err){
        return res.status(500).json({
            message: "Server Error", 
            error: err.message
        })
    }
}, signJWT, addBalance)

router.put('/', verifyJWT, updateMiddleware, async function(req, res){
    try{
        const payload = req.body
        const updateUser = await User.updateOne({_id: req.userId}, {$set: payload})
        return res.status(200).json({
            message: "User updated successfully"
        })
    }catch(err){
        return res.status(500).json({
            message: "Server Error", 
            error: err.message
        })
    }

})

router.get('/bulk', verifyJWT, async function(req, res){
    try{
        const filter = req.query.filter || ""
        if (filter.trim() === "") {
            return res.status(200).json({
                message: []
            });
        }
        const filteredUsers = await User.find({
            $and: [
                {
                    $or: [
                        { firstName: { $regex: filter, $options: 'i' } },
                        { lastName: { $regex: filter, $options: 'i' } }
                    ]
                },
                {
                    _id: { $ne: req.userId } // Exclude current user's username
                }
            ]
        });
    
        const userArray = filteredUsers.map((user)=>{
            const userx = {
                firstName: user.firstName, 
                lastName: user.lastName, 
                id: user._id
            }
            return userx 
        })
    
        res.status(200).json({
            message: userArray
        })
    }catch(err){
        return res.status(500).json({
            message: "Server Error", 
            error: err.message
        })
    }
})

router.post('/signin', loginAuthMiddleware, notExistingUserMiddleware, signJWT, function(req, res, next){
    try{
        res.status(200).json({
            message: `Logged In successfully ${req.user}`, 
            token: req.token
        })
    }catch(err){
        return res.status(500).json({
            message: "Server Error", 
            error: err.message
        })
    }
})


module.exports = router