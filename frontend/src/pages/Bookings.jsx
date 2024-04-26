import { useLoaderData, useNavigate,redirect } from "react-router-dom"
import customFetch from "../utils/axios/axios"
import {toast} from "react-toastify"
import { useSelector } from "react-redux"
import {useState} from "react"


export const loader = (store) => async({request}) =>{
  
  try{
    const {id,authenticationKey,role} = store.getState().userState.user

    if(role === "member"){
      const response = await customFetch(`/bookings/member/${id}`,{
        headers: {
          "X-AUTH-KEY": authenticationKey
        }
      })
      const allBookings = response.data.bookings
      return allBookings
    } else {
      const response = await customFetch(`/bookings/trainer/${id}`,{
        headers: {
          "X-AUTH-KEY": authenticationKey
        }
      })
      const allBookings = response.data.bookings
      return allBookings
    }
  }catch(err){
    toast.error("You must login first")
    return redirect("/login");
  }
}

const Bookings = () => {
  const allBookings = useLoaderData()
  console.log(allBookings)
  const [bookings, setBooking] = useState(allBookings)
  const currentDate = new Date().toLocaleDateString('en-CA')

  const user = useSelector(state => state.userState.user)
  const handleCancel = async(id) =>{
    try{
      const response = await customFetch.delete(`/bookings/${id}`,{
        headers: {
          "X-AUTH-KEY": user?.authenticationKey
        }
      })
      toast.success(response.data.message)
      setBooking(bookings.filter(booking => booking.bookingId !== id))
      return;
    }catch(err){
      toast.error("There were some errors in deleting the booking")
      return err
    }
  }
  return (
    <>
    <h1 className="text-center text-2xl font-bold mb-5">Bookings</h1>
    <section className="flex flex-col gap-5">
    { user?.role === "member" ? bookings.filter(booking => new Date(booking.date).toLocaleDateString('en-CA') >= currentDate).map(booking=>{
      const { bookingId, time, date, activityName, roomNumber, trainerFirstName, trainerLastName } = booking
      
      return <div key={bookingId} className="grid gap-2 md:gap-0 md:grid-cols-3 md:place-items-center  shadow min-h-16 card p-4">
        <div>
          
          <p>Class: {activityName}</p>
          <p>Room Number: {roomNumber}</p>
        </div>
        <div>
          <p>Trainer: {trainerFirstName} {trainerLastName}</p>
          <p>Date: { new Date(date).toLocaleDateString('en-CA').split('/').join('-')} at {time}</p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={()=>  handleCancel(bookingId)}>Cancel</button>
        </div>
      </div>
}): bookings
    .filter(booking => new Date(booking.date).toLocaleDateString('en-CA') >= currentDate)
    .map(booking=>{
      const { class_id, class_datetime, date,class_room_number,booking_count,activity_name,activity_duration } = booking
      return <div key={class_id} className="grid gap-2 md:gap-0 place-items-center shadow min-h-16 card p-4">
        <div className="bg-neutral-200 text-xl font-semibold w-full rounded-lg p-2 text-center">
          <p>{new Date(date).toLocaleDateString('en-CA')}</p>
        </div>
        <div>
          <p>Class : {activity_name}</p>
          <p>Time: {class_datetime}</p>
          <p>Duration: {activity_duration} minutes</p>
          <p>Room Number: {class_room_number}</p>
          <p>Enrolled: {booking_count}</p>
        </div>
      </div>
})}
    </section>
    </>
  )
}
export default Bookings