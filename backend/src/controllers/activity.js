import * as Activity from "../models/activity.js"

export const getActivitiesIDandName = async(req,res)=>{
    try{
        const result = await Activity.getActivityIDandName()
        res.status(200).json({
            status: 200,
            message: "These are list of all activities",
            allActivities: result
        })
    }catch(err){
        res.status(404).json({
            status: 404,
            message: "Error getting those activities",
        })
    }
}