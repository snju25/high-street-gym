import { db } from "../database.js"
import * as Users from "../models/users.js"
import { v4 as uuid4 } from "uuid"
import bcrypt from "bcryptjs"
import xml2js from "xml2js"
import validator from "validator";

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


    if (!/[a-zA-Z-]{2,}/.test(firstName)) {
        return res.json({
            message: "First name must be letters",
        });
    }
    if (!/[a-zA-Z-]{2,}/.test(lastName)) {
        return res.json({
            message: "last name must be letters",
        });
    }
    if (!/[a-zA-Z0-9-]{6,}/.test(password)) {
        return res.json({
            message:  "Password must be at least 6 characters long and contain a variety of characters.",
        });
    }
    if (!/(^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$)/.test(phone)) {
        return res.json({
            message: "Please enter a valid australian phone number",
        });
    }
    if ( !/^\S{1,}@\S{1,}[.]\S{1,}$/.test(email)) {
        return res.json({
            message:  "Please enter a valid email address",
        });
    }
    if ( !/^\d+\s+([a-zA-Z]+\s*)+/.test(address)) {
        return res.json({
            message:  "Please enter a valid  address",
        });
    }

   

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
        validator.escape(email),
        validator.escape(password),
        "member",
        validator.escape(phone),
        validator.escape(firstName),
        validator.escape(lastName),
        validator.escape(address),
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
// update user

export const updateUser = async (req,res) =>{
    const userID = req.params.id
    const userData = req.body

    userData.id = userID

    if (!/[a-zA-Z-]{2,}/.test(userData.firstName)) {
        return res.json({
            message: "First name must be letters",
        });
    }
    if (!/[a-zA-Z-]{2,}/.test(userData.lastName)) {
        return res.json({
            message: "last name must be letters",
        });
    }
    if (!/[a-zA-Z0-9-]{6,}/.test(userData.password)) {
        return res.json({
            message:  "Password must be at least 6 characters long and contain a variety of characters.",
        });
    }
    if (!/(^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$)/.test(userData.phone)) {
        return res.json({
            message: "Please enter a valid australian phone number",
        });
    }
    if ( !/^\S{1,}@\S{1,}[.]\S{1,}$/.test(userData.email)) {
        return res.json({
            message:  "Please enter a valid email address",
        });
    }
    if ( !/^\d+\s+([a-zA-Z]+\s*)+/.test(userData.address)) {
        return res.json({
            message:  "Please enter a valid  address",
        });
    }

    if (userData.password && !userData.password.startsWith("$2a")) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }
     // Convert the user data into a User model object
     const user = Users.newUser(
        userData.id,
        userData.email,
        userData.password,
        userData.role,
        userData.phone,
        userData.firstName,
        userData.lastName,
        userData.address,
        userData.authenticationKey
    )

    // Use the update model function to update this user in the DB
    Users.update(user).then(user => {
        res.status(200).json({
            status: 200,
            message: "Updated user",
            user: user
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Failed to update user",
        })
    })
}

// server side validation - ----- for all formData.

export const logoutUser = async(req, res) => {
    const authenticationKey = req.get("X-AUTH-KEY")
    console.log(authenticationKey)
    Users.getByAuthenticationKey(authenticationKey)
        .then(user => {
            user.authenticationKey = null
            Users.update(user).then(user => {
                res.status(200).json({
                    status: 200,
                    message: "user logged out"
                })
            })
        }).catch(error => {
            res.status(500).json({
                status: 500,
                message: "failed to logout user",
                error
            })
        })
}

export const createNewUsers = async (req, res) => {
    if (req.files && req.files["xml-file"]) {
        // Access the XML file as a string
        const XMLFile = req.files["xml-file"]
        const file_text = XMLFile.data.toString()

        // Set up XML parser
        const parser = new xml2js.Parser();
        try {
            const data = await parser.parseStringPromise(file_text);
            const userUpload = data["user-upload"]
            const userUploadAttributes = userUpload["$"]
            const operation = userUploadAttributes["operation"]
            // Slightly painful indexing to reach nested children
            const usersData = userUpload["users"][0]["user"]
            console.log(usersData)
            const emailAlreadyExist = []
            
            if (operation === "insert") {
                Promise.all(usersData.map(async (userData)=>{
                    const userModel = Users.newUser(
                        null,
                        userData.email.toString(),
                        bcrypt.hashSync(userData.password.toString()),
                        userData.role.toString(),
                        userData.phone.toString(),
                        userData.firstName.toString(),
                        userData.lastName.toString(),
                        userData.address.toString(),
                        null
                    );
                    try{
                        const userExist = await Users.getByEmail2(userModel.email)
                        if(userExist.length > 0){
                            emailAlreadyExist.push(userExist)
                            return null
                        } 
                        const createUser = await  Users.createUser(userModel)
                        return createUser

                    } catch(err){
                        return err;
                    }
                    // Check if a user with that email exists
                })).then(result=> {
                    res.status(200).json({
                        status: 200,
                        message: "XML Upload insert successfully",
                        emailThatExist: emailAlreadyExist
                    });
                }).catch(error =>{
                    res.status(400).json({
                        status: 400,
                        message: "Unsupported operation"
                    });     
                })
            } else {
                res.status(400).json({
                    status: 400,
                    message: "XML Contains invalid operation attribute value",
                })
            }
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Error parsing XML - " + error,
            })
        }
    }
    else {
        res.status(400).json({
            status: 400,
            message: "No file selected",
        })
    }
};