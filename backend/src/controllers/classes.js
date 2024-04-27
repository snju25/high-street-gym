import * as Classes from "../models/classes.js"
import xml2js from "xml2js"

export const getClassesByDate = async(req,res) =>{
    const date = req.params.date
    try{
        const classes = await Classes.getClassesByDate(date)
        res.status(200).json({
            status: 200,
            message: `Classes available on ${date}}`,
            class: classes
        })

    }catch(err){
        return res.status(400).json({
            status: 400,
            message: "Error" + err,
        })
    }
    
}

export const getAllUniqueActivity = async(req,res)=>{
    const date = req.params.date
    try{
        const uniqueClasses =  await Classes.displayAllUniqueClassesByDate(date)
        res.status(200).json({
            status:200,
            message: "Unique date from different classes",
            uniqueClasses: uniqueClasses
        })

    }catch(err){
        return res.status(400).json({
            status: 400,
            message: "Error" + err,
        })
    }
}

export const getByDateAndActivity = async(req,res) => {
    let date = req.params.date
    const id = req.params.id
    date = new Date(date).toLocaleDateString('en-CA')
    // console.log(date);
    try{
        const classes = await Classes.getByDateAndActivity(date,id)
        if (classes.length ===  0){
            return res.status(200).json({
                status: 200,
                message: "All classes on Monday with activity id",
                classes: classes
            })
            
        }
        return res.status(200).json({
            status: 200,
            message: "All classes on Monday with activity id",
            classes: classes
        })

    } catch(err){
        return res.status(400).json({
            status: 400,
            message: "Error" + err,
        })
    }
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

export const createNewClasses = async (req, res) => {
    if (req.files && req.files["xml-file"]) {
        // Access the XML file as a string
        const XMLFile = req.files["xml-file"]
        const file_text = XMLFile.data.toString()

        // Set up XML parser
        const parser = new xml2js.Parser();
        try {
            const data = await parser.parseStringPromise(file_text);
            const classUpload = data["class-upload"]
            const classUploadAttributes = classUpload["$"]
            const operation = classUploadAttributes["operation"]
            // Slightly painful indexing to reach nested children
            const classesData = classUpload["classes"][0]["class"]
            // console.log(classesData[0].date.toString())
            
            let classesAlreadyExist = []
            if (operation === "insert") {
                Promise.all(classesData.map((classData,index)=>{
                    const classModel = Classes.newClass(
                        null,
                        classData.datetime.toString(),
                        classData.activityID.toString(),
                        classData.trainerID.toString(),
                        classData.date.toString(),
                        classData.roomNumber.toString(),
                    );
                    // Check if a user with that email exists
                     return Classes.classAlreadyExists({activity_id: classModel.activity_id, trainer_id: classModel.trainer_id,time: classModel.time, date: classModel.date}).then(classes => {
                        if (classes) {
                            classesAlreadyExist.push({index, ...classModel})
                            // If a matching user object is found, skip insertion
                            return null
                        } else {
                            // If no matching user object is found, insert the user
                            return Classes.createNewClass(classModel)
                        }
                    })
                })).then(result=> {
                    res.status(200).json({
                        status: 200,
                        message: "XML Upload insert successfully",
                        classesAlreadyExist
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