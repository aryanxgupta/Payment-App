const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mainRouter = require('../backend/routes/index')
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.use('/api/v1', mainRouter)

app.listen(port, function(){
    console.log("Server running");
})