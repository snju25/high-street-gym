import * as Users from "../models/users.js"
import bcrypt from "bcryptjs"

export const getAllUsers = async (req,res)=>{
    const users = await Users.getAll()
    res.status(200).json({
        status: 200,
        message: "User list",
        users: users,
    })
}
// ---------Auth middleware -----------this can go in routes
// Login

// Logout 

// Register
export const registerUser = async(req,res)=>{
    const {phone,firstName,lastName,address,email} = req.body
    let {password} = req.body

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


