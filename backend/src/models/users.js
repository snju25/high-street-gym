import {db} from "../database.js"


export const newUser = (id,email,password,role,phone,firstName,lastName,address,authenticationKey) => {
    return {
        id,
        email,
        password, 
        role,
        phone,
        firstName,
        lastName,
        address,
        authenticationKey
    }
}

export const getAll = async() =>{
    const [allUserResults] = await db.query("SELECT * FROM users")

    return await allUserResults.map((userResult)=>{
        return newUser(
            userResult.user_id.toString(),
            userResult.user_email,
            userResult.user_password,
            userResult.user_role,
            userResult.user_phone,
            userResult.user_firstName,
            userResult.user_lastName,
            userResult.user_address,
            userResult.authenticationKey
        )
    })
}

export const createUser = async (user) =>{
    return db.query(
        "INSERT INTO users (user_email,user_password,user_role,user_phone,user_firstName,user_lastName)"
        + "VALUE (?,?,?,?,?,?)",
        [
            user.email,
            user.password,
            user.role,
            user.phone,
            user.firstName,
            user.lastName
        ]
    ).then(([result])=>{
        return {...user, id: result.insertId }
    })
}

export const getByEmail = async (email) =>{
    const [userResults] = await db.query(
        "SELECT * FROM users WHERE user_email = ?", email
    )
    // userResults return an array and we need an object to work with here.
    if(userResults.length>0){
        const userResult = userResults[0]
        return Promise.resolve(
            newUser(
                userResult.user_id.toString(),
                userResult.user_email,
                userResult.user_password,
                userResult.user_role,
                userResult.user_phone,
                userResult.user_firstName,
                userResult.user_lastName,
                userResult.user_address,
                userResult.authenticationKey
            )
        )
    } else {
        return Promise.reject("no results found")
    }
}

export const getByID = async (userID) =>{
    const [userResults] = await db.query(
        "SELECT * FROM users WHERE user_id = ?", userID
    )
    // userResults return an array and we need an object to work with here.
    if(userResults.length>0){
        const userResult = userResults[0]
        return Promise.resolve(
            newUser(
                userResult.user_id.toString(),
                userResult.user_email,
                userResult.user_password,
                userResult.user_role,
                userResult.user_phone,
                userResult.user_firstName,
                userResult.user_lastName,
                userResult.user_address,
                userResult.authenticationKey
            )
        )
    } else {
        return Promise.reject("no results found")
    }
}


export const update = async (user) => {
    return db.query(
        "UPDATE users SET "
        + "user_email = ?, "
        + "user_password = ?, "
        + "user_role = ?, "
        + "user_phone = ?, "
        + "user_firstName = ?, "
        + "user_lastName = ?, "
        + "authenticationKey = ? "
        + "WHERE user_id = ?",
        [
            user.email,
            user.password,
            user.role,
            user.phone,
            user.firstName,
            user.lastName,
            user.authenticationKey,
            user.id
        ]
    ).then(([result]) => {
        return { ...user }
    })
}

export const deletePost = async(userID) =>{
    return db.query(
        "DELETE FROM blog_posts WHERE user_id = ?", userID
    )
}
