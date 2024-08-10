const express = require('express')
const { Account, User } = require('../db')
const { transferValidationMiddleware } = require('../middlewares/userAuthMW')
const { verifyJWT } = require('../middlewares/jwtMW')
const { default: mongoose } = require('mongoose')
const router = express.Router()

router.get('/balance', verifyJWT, async function(req, res){
    try{
        const userAcc = await Account.findOne({userId: req.userId})
        res.status(200).json({
            message: "Balance fetched successfully", 
            balance: userAcc.balance
        })
    }catch(err){
        return res.status(500).json({
            message: "Server Error", 
            error: err.message
        })
    }
})

router.post('/transfer', transferValidationMiddleware, verifyJWT, async function(req, res){

    try{
        const session = await mongoose.startSession()
        session.startTransaction()
        const { to, amount } = req.body
        if (amount <= 0) {
            await session.abortTransaction();
            session.endSession()
            return res.status(400).json({ message: "Invalid transfer amount." });
        }
        const fromAcc = await Account.findOne({userId: req.userId}).session(session)
        if(!fromAcc || fromAcc.balance < amount){
            await session.abortTransaction()
            session.endSession()
            return res.status(400).json({
                message: "Insufficient Funds"
            })
        }

        const toAcc = await Account.findOne({userId: to}).session(session)
        if(!toAcc){
            await session.abortTransaction()
            session.endSession()
            return res.status(400).json({
                message: "Invalid reciever details"
            })
        }
        const beforeSender = await Account.findOne({userId: req.userId})
        const beforeReciever = await Account.findOne({userId: to})
        console.log(`Before Sender: ${beforeSender.balance} reciever: ${beforeReciever.balance}`);
        
        await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session)
        await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session)

        await session.commitTransaction()
        session.endSession()

        const afterSender = await Account.findOne({userId: req.userId})
        const afterReciever = await Account.findOne({userId: to})
        console.log(`after Sender: ${afterSender.balance} reciever: ${afterReciever.balance}`);

        res.status(200).json({
            message: "Transaction successful"
        })        
        
    }catch(err){
        return res.status(500).json({
            message: "Server Error", 
            error: err.message
        })
    }
})

module.exports = router