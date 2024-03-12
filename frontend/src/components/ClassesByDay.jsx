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
    <>
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
        return <div key={class_id}>
            {activity_description}
        </div>
    })}
    </>
  )
}
export default ClassesByDay