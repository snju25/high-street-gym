import { redirect, useLoaderData, useNavigate } from "react-router-dom"
import customFetch from "../utils/axios/axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import {toast} from "react-toastify"

export const loader = (store) => async({params}) =>{
  const {date,id} = params
  const user = store.getState().userState.user
  try{
    const response = await customFetch(`classes/createBooking/${date}/${id}`,{
      headers: {
        "X-AUTH-KEY": user?.authenticationKey
      }
    })
    const availableClasses = response.data.classes
    return availableClasses

  }catch(err){
    toast.error("You must login first")
    return redirect("/login");
  }

}


const CreateBooking = () => {
  const classes = useLoaderData();
  const navigate = useNavigate()

  // State to hold the selected time and class
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);

  // gets the id from react redux userState
  const {id,authenticationKey} = useSelector(state => state.userState.user)
  console.log(classes)

  // Group classes by time
  const classesByTime = classes.reduce((acc, curr) => {
    acc[curr.class_datetime] = acc[curr.class_datetime] || [];
    acc[curr.class_datetime].push(curr);
    return acc;
  }, {});
  // console.log(classesByTime)

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {user_id:id,time:selectedTime, class_id: selectedClass.class_id, trainer_id: selectedClass.class_trainer_user_id, date: new Date(selectedClass.date).toLocaleDateString('en-CA').split('/').join('-')}
    
    try{
      const response = await customFetch.post("/bookings/",bookingData, {
        headers:{
          "X-AUTH-KEY": authenticationKey
        }
      })
      toast.success(response.data.message || "Created Booking")
      return navigate("/bookings")

    }catch(err){
      toast.error("Error creating booking")
      return err
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <h1 className="text-2xl font-bold mb-5">Create Booking</h1>
      <div className="flex flex-col md:flex-row gap-2">

      <label htmlFor="time" className="mr-5 text-xl font-semibold">Select Time:</label>
      <select id="time" value={selectedTime} onChange={e => setSelectedTime(e.target.value)} className="select select-bordered w-full max-w-xs">
        <option  disabled value="">Select a time</option>
        {Object.keys(classesByTime).map(time => (
          <option key={time} value={time}>{time}</option>
          ))}
      </select>
          </div>

      {selectedTime && (
        <div className="mt-5 flex flex-col md:flex-row gap-2">
          <label htmlFor="trainer" className="mr-5 text-xl font-semibold">Select Trainer:</label>
          <select className="select select-bordered w-full max-w-xs" id="trainer" value={selectedClass?.class_id || ''} onChange={e => setSelectedClass(classesByTime[selectedTime].find(c => c.class_id === parseInt(e.target.value)))}>
            <option value="">Select a trainer</option>
            {classesByTime[selectedTime].map(classInfo => (
              <option key={classInfo.class_id} value={classInfo.class_id}>
                {classInfo.user_firstName} {classInfo.user_lastName} (Room {classInfo.class_room_number})
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="mt-5">
        <button type="submit" disabled={selectedClass? false: true} className="btn btn-primary">Create Booking</button>
      </div>
    </form>
  );
};

export default CreateBooking;