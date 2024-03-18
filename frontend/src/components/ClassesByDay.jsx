import { useLoaderData, useNavigate } from "react-router-dom"
import customFetch from "../utils/axios/axios"
import {useSelector} from "react-redux"


export const loader = async({params}) =>{
    const day = params.day
    try{
        const response = await customFetch(`/classes/unique/${day}`)
        const uniqueClasses = response.data.uniqueClasses
        return uniqueClasses
        
    }catch(err){
        return err
    }

}
const ClassesByDay = () => {
    const classes = useLoaderData()
    // const currentUser = useSelector(state => state.userState.user)
  return (
    <div className="grid gap-5">
    {classes.map((allAvailableClass) => {
        const {
            activity_id,
            activity_description,   
            activity_name, 
        } = allAvailableClass
        return <div key={activity_id} className="card shadow-gray-400 shadow min-h-16">
            <div className="p-[10px]">
                <h1 className="text-2xl">{activity_name}</h1>
                <p>{activity_description}</p>
            </div>
            <button 
                className="btn btn-primary"
                >Book Now</button> 
        </div>
    })}

    </div>
  )
}
export default ClassesByDay