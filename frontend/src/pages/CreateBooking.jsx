import { redirect, useLoaderData, useNavigate } from "react-router-dom"
import customFetch from "../utils/axios/axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import {toast} from "react-toastify"

export const loader = async({params})=>{
  const {day,id} = params
  try{
    const response = await customFetch(`classes/createBooking/${day}/${id}`)
    const availableClasses = response.data.classes
    return availableClasses

  }catch(err){
    return err
  }

}


const CreateBooking = () => {
  const classes = useLoaderData();
  const navigate = useNavigate()

  // State to hold the selected time and class
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const {id} = useSelector(state => state.userState.user)

  // Group classes by time
  const classesByTime = classes.reduce((acc, curr) => {
    acc[curr.class_datetime] = acc[curr.class_datetime] || [];
    acc[curr.class_datetime].push(curr);
    return acc;
  }, {});

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {user_id:id,time:selectedTime, class_id: selectedClass.class_id, trainer_id: selectedClass.class_trainer_user_id, day: selectedClass.day}
    console.log(bookingData)
    // Further processing or API call to create booking
    try{
      const response = await customFetch.post("/bookings/",bookingData)
      toast.success(response.data.message || "Created Booking")
      redirect("/bookings")

    }catch(err){
      console.log(err)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="time">Select Time:</label>
      <select id="time" value={selectedTime} onChange={e => setSelectedTime(e.target.value)}>
        <option value="">Select a time</option>
        {Object.keys(classesByTime).map(time => (
          <option key={time} value={time}>{time}</option>
        ))}
      </select>

      {selectedTime && (
        <>
          <label htmlFor="trainer">Select Trainer:</label>
          <select id="trainer" value={selectedClass?.class_id || ''} onChange={e => setSelectedClass(classesByTime[selectedTime].find(c => c.class_id === parseInt(e.target.value)))}>
            <option value="">Select a trainer</option>
            {classesByTime[selectedTime].map(classInfo => (
              <option key={classInfo.class_id} value={classInfo.class_id}>
                {classInfo.user_firstName} {classInfo.user_lastName} (Room {classInfo.class_room_number})
              </option>
            ))}
          </select>
        </>
      )}

      <button type="submit">Create Booking</button>
    </form>
  );
};

export default CreateBooking;




