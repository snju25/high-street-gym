import { useLoaderData, useNavigate } from "react-router-dom"
import customFetch from "../utils/axios/axios"
import {useSelector} from "react-redux"
import {toast} from "react-toastify"
import BookingPopup from "./bookingPopUp"
import { useState } from "react"

export const loader = async({params}) =>{
    const day = params.day
    try{
        const response = await customFetch(`/classes/${day}`)
        const classes = response.data.class
        return classes
    }catch(err){
        return err
    }

}
const ClassesByDay = () => {
    const classes = useLoaderData()
    const currentUser = useSelector(state => state.userState.user)
    const user_id = currentUser.id
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = useState(false)
    // handleBooking({user_id,class_id,day,class_trainer_user_id,class_datetime})}
    // const handleBooking = async({user_id,class_id,day,class_trainer_user_id,class_datetime}) =>{
    //     // create booking api here.
    //     try{
    //         const response = await customFetch.post("/bookings",{"user_id":user_id,"class_id":class_id,"day":day,"trainer_id":class_trainer_user_id,"time":class_datetime})
    //         toast.success(response.data.message || "Booking has been created")
    //         return navigate("/bookings")
    //     }
    //     catch(error){
    //         return err
    //     }
    // }
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
                {/* <p>Room: {class_room_number}</p>
                <p>Trainer: {user_firstName} {user_lastName}</p>
                <p>Contact: {user_email}</p> */}
            </div>
            {/* handles booking here */}
            <button 
                className="btn btn-primary"
                onClick={()=> setShowPopup(true)}
                >Book Now</button> 
            {showPopup && <BookingPopup onClose= {()=> setShowPopup(false)}/> }     
        </div>
    })}

        

    </div>
  )
}
export default ClassesByDay