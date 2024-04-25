import { db } from "../database.js";

export const Activity = (id,activityName) =>{
    return {
        id,
        activityName
    }
}
export const getActivityIDandName = async() =>{
    const [allActivities] = await db.query(`SELECT * FROM activities`)
    return await allActivities.map(activity => {
       return Activity(
            activity.activity_id,
            activity.activity_name
        )
        
    })
}
// console.log('asdsa')

// getActivityIDandName().then(res=> console.log(res))