const { Account } = require('../db')
async function addBalance(req, res, next){
    try{
        const newAccount = await Account.create({
            userId: req.userId,
            balance: 1 + Math.random()*10000 
        })
        res.status(200).json({
            message: "New user created successfully", 
            username: req.username, 
            token: req.token 
        })
    }catch(err){
        return res.status(500).json({
            message: "Server Error", 
            error: err.message
        })
    }
}

module.exports = {
    addBalance
}