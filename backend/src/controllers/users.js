import { db } from "../database.js"
import * as Users from "../models/users.js"
import { v4 as uuid4 } from "uuid"
import bcrypt from "bcryptjs"

export const getAllUsers = async (req,res)=>{
    const users = await Users.getAll()
    res.status(200).json({
        status: 200,
        message: "User list",
        users: users,
    })
}
// ---------Auth middleware -----------this will go in routes
// Login
export const loginUser = async(req,res)=>{
    // check if there is email and password in 
    const {email,password} = req.body
    Users.getByEmail(email).then(user=>{
        if(bcrypt.compareSync(password,user.password)){
            user.authenticationKey = uuid4().toString()

            Users.update(user).then(result=>{
                res.status(200).json({
                    status:200,
                    message: "Successfully Logged In",
                    user: user,
                })
            })
        } 
        // if password is wrong
        else {
            res.status(400).json({
                status: 400,
                message: "invalid credentials"
            })

        }
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Login Failed, Please provide correct credentials",
        })
    })

}

// Logout 

// Register
export const registerUser = async(req,res)=>{
    const {phone,firstName,lastName,address,email} = req.body
    let {password} = req.body

    // TODO: check if the user already exits in the database
    // First, check if the username already exists
    const [users] = await db.query(`SELECT * FROM users WHERE user_email = ?`, [email]);
        
    if (users.length > 0) {
        // If a user is found, send an error response
        return res.status(409).json({message: "Username is already taken."});
    }

    // hash the password
    password = bcrypt.hashSync(password);

    // convert the user data into an user model object
    const user = Users.newUser(
        null,
        email,
        password,
        "member",
        phone,
        firstName,
        lastName,
        address,
        null 
    )

    Users.createUser(user).then(user =>{
        res.status(200).json({
            status: 200,
            message: "You have been registered",
            user: user
        })
    }).catch(error =>{
        res.status(500).json({
            status: 500,
            message: "Registration failed",
            error
        })
    })

}


// server side validation - ----- for all formData.


