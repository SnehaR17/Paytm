const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const router = express.Router();

const signupBody =  zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

router.post("/signup", async function(req, res){
try {
            // 1. take input from body
            // 2. {username: "name@gmail.com",
                // firstName: "name",
                // lastName: "name",
                // password: "123456"}
            // 3. Validate inputs and zod validation
                const inputData = req.body;
                const safeParsedInput = signupBody.safeParse(inputData)            
                // {
                //      success : true/false,
                //      data/error
                // }
                if(!safeParsedInput.success){
                    return res.status(411).json({
                        message: "Incorrect Inputs"
                    })
                }
                
            // 4. Check if user with same email exists if yes then return error
            const existingUser = await User.findOne({
                username: req.body.username
            })
    
            if(existingUser){
                return res.status(411).json({
                    message: "Email already taken"
                })
            }
    
            // 5. Create user
            const user = await User.create({
                username: req.body.username,
                password:req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            })
    
            // 6. Extract userid and convert to jwt
            const userId = user._id;
    
            const token = jwt.sign({
                userId
            }, JWT_SECRET);
    
            // 7. Send response
            return res.json({
                message: "User created successfully",
                token: token
            })   
} catch (error) {
    return res.status(411).json({
        message: "Internal Server Error occurred"
    })
} 
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async function(req, res){

    try {
            // 1. take input from body
        // 2. {
            // 	username: "name@gmail.com",
            // 	password: "123456"
            // }
        // 3. Validate inputs and zod validation

        const inputData = req.body
        const safeParsedInput2 = signinBody.safeParse(inputData);
        if(!safeParsedInput2.success){
            return res.status(411).json({
                message: "Incorrect inputs"
            })
        }
        
        // 4. Check is the user with the corresponding email and password exists if not then throw error
        // 5. Extract the userId and convert to jwt
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        })
        if(user){
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET);

            // 6. Send response
            return res.status(200).json({
                token: token
            })
        }
    } catch (error) {
        return res.json({
            message: "Error while logging in"
        })
    }
    
})

module.exports = router;

