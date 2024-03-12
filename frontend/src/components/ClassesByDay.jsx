import { useLoaderData } from "react-router-dom"
import customFetch from "../utils/axios/axios"

export const loader = async({params}) =>{
    const day = params.day
    try{
        const response = await customFetch(`/classes/${day}`)
        const classes = response.data.class
        return classes
    }catch(err){
        return null
    }

}
const ClassesByDay = () => {
    const classes = useLoaderData()
  return (
    <div className="grid gap-5">
    {classes.map(allAvailableClass => {
        const {
            activity_description,
            activity_duration, 
            activity_name, 
            class_activity_id, 
            class_datetime,
            class_id,
            class_room_number,
            class_trainer_user_id,
            day,
            user_email,
            user_firstName,
            user_lastName} = allAvailableClass
        return <div key={class_id} className="card shadow-gray-400 shadow min-h-16">
            <div className="p-[10px]">
                <h1 className="text-2xl">{activity_name}</h1>
                <p>{activity_description}</p>
            </div>
            <div className="mt-2 p-[10px]">
                <p>Start Time: {class_datetime}</p>
                <p>Duration: {activity_duration} mins</p>
            </div>
            <button className="btn btn-primary">Book Now</button>
        </div>
    })}
    </div>
  )
}
export default ClassesByDay