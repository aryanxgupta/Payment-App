const mongoose = require('mongoose')
const URL = "mongodb+srv://itssaryan:bfe01301@cluster0.jfxuw3a.mongodb.net/payment-db"
mongoose.connect(URL)

const userSchema = mongoose.Schema({
    firstName: String, 
    lastName: String,
    username: String,  
    password: String 
})

const accountSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }, 
    balance: Number

})

const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Account', accountSchema)
module.exports = {
    User, 
    Account
}