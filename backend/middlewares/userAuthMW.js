const zod = require('zod')
const usernameSchema = zod.object({
    firstName: zod.string(), 
    lastName: zod.string(), 
    username: zod.string(), 
    password: zod.string().min(6)
})

const loginSchema = zod.object({
    username: zod.string(), 
    password: zod.string().min(6)
})

const updateSchema = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(), 
    password: zod.string().min(6).optional()
})

const transferSchema = zod.object({
    to: zod.string(), 
    amount: zod.number()
})

function userAuthMiddleware(req, res, next){
    try{
        const payLoad = req.body
        if(usernameSchema.safeParse(payLoad).success){
            //Validated
            next()
        }else{
            //Not validated
            return res.status(400).json({
                message: "Something went wrong with the login credentials."
            })
        }
    }catch(err){
        return res.status(500).json({
            message: "Server Error", 
            error: err.message
        })
    }
}

function loginAuthMiddleware(req, res, next){
    try{
        const payLoad = req.body
        if(loginSchema.safeParse(payLoad).success){
            //Validated
            next()
        }else{
            //Not validated
            return res.status(400).json({
                message: "Something went wrong with the login credentials."
            })
        }
    }catch(err){
        return res.status(500).json({
            message: "Server Error", 
            error: err.message
        })
    }
}

function updateMiddleware(req, res, next){
    try{
        const payLoad = req.body
        if(updateSchema.safeParse(payLoad).success){
            //Validated
            next()
        }else{
            //Not validated
            return res.status(400).json({
                message: "Something went wrong with the login credentials."
            })
        }
    }catch(err){
        return res.status(500).json({
            message: "Server Error", 
            error: err.message
        })
    }
}

function transferValidationMiddleware(req, res, next){
    try{
        const payLoad = req.body
        if(transferSchema.safeParse(payLoad).success){
            next()
        }else{
            return res.status(400).json({
                message: "Wrong inputs for the transfer"
            })
        }
    }catch(err){
        return res.status(500).json({
            message: "Server Error", 
            error: err.message
        })
    }
}

module.exports = {
    userAuthMiddleware, 
    loginAuthMiddleware, 
    updateMiddleware, 
    transferValidationMiddleware
}