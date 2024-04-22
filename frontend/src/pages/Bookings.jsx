import { useLoaderData, useNavigate,redirect } from "react-router-dom"
import customFetch from "../utils/axios/axios"
import {toast} from "react-toastify"
import { useSelector } from "react-redux"
import {useState} from "react"


export const loader = (store) => async({request}) =>{
  
  try{
    const {id,authenticationKey} = store.getState().userState.user
    const response = await customFetch(`/bookings/${id}`,{
      headers: {
        "X-AUTH-KEY": authenticationKey
      }
    })
    const allBookings = response.data.bookings
    return allBookings
  }catch(err){
    toast.error("You must login first")
    return redirect("/login");
  }
}

const Bookings = () => {
  const allBookings = useLoaderData()
  const [bookings, setBooking] = useState(allBookings)
  const navigate = useNavigate()
  const {authenticationKey} = useSelector(state => state.userState.user)
  const handleCancel = async(id) =>{
    try{
      const response = await customFetch.delete(`/bookings/${id}`,{
        headers: {
          "X-AUTH-KEY": authenticationKey
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
    { bookings.map(booking=>{
      const { bookingId, userId, classId, time, date, trainerId, activityName, roomNumber, trainerFirstName, trainerLastName } = booking
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
    })}
    </section>
    </>
  )
}
export default Bookings