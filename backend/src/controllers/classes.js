import * as Classes from "../models/classes.js"

export const getClassesByDate = async(req,res) =>{
    const date = req.params.date
    
    const classes = await Classes.getClassesByDate(date)
    res.status(200).json({
        status: 200,
        message: `Classes available on ${date}}`,
        class: classes
    })
}

export const getAllUniqueActivity = async(req,res)=>{
    const date = req.params.date
    const uniqueClasses =  await Classes.displayAllUniqueClassesByDate(date)
    res.status(200).json({
        status:200,
        message: "Unique date from different classes",
        uniqueClasses: uniqueClasses
    })
}

export const getByDateAndActivity = async(req,res) => {
    const date = req.params.date
    const id = req.params.id

    console.log(typeof date, date)


    const classes = await Classes.getByDateAndActivity(date,id)
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


export const getAllUniqueClassEveryDayForTheWeek = async(req,res)=>{
    const startDate = req.query.startDate
    const endDate = req.query.endDate

    try{
        const results = await Classes.displayAllUniqueClassesForWeek(startDate,endDate)
        res.status(200).json({
            status:200,
            message: "all the unique classes for the week",
            classes: results
        })
    }catch (err){
        res.status(500).json({
            status:500,
            message: "could not fetch any data from the database",
            error: err
        })

    }
}