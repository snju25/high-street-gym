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

export const getAllUniqueActivity = async(req,res)=>{
    const day = req.params.day
    const uniqueClasses =  await Classes.displayAllUniqueClassesByDay(day)
    res.status(200).json({
        status:200,
        message: "Unique days from different classes",
        uniqueClasses: uniqueClasses
    })
}

export const getByDateAndActivity = async(req,res) => {
    const day = req.params.day
    const id = req.params.id

    const classes = await Classes.getByDayAndActivity(day,id)
    if (classes.length ===  0){
        return res.status(200).json({
            status: 200,
            message: "All classes on Monday with activity id",
            classes: classes
        })
        
    }
    res.status(200).json({
        status: 200,
        message: "All classes on Monday with activity id",
        classes: classes
    })
}
