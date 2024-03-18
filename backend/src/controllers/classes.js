import * as Classes from "../models/classes.js"

export const getClassesByDay = async(req,res) =>{
    const day = req.params.day

    const validDays = ["Monday","Tuesday","Wednesday","Thursday","Friday"]

    if(!validDays.includes(day)){
        return res.status(404).json({
            status: 404,
            message: "Please choose an appropriate day"
        })
    }
    
    const classes = await Classes.getClassesByDay(day)
    res.status(200).json({
        status: 200,
        message: `Classes available on ${day}}`,
        class: classes
    })
}

