import { Link } from "react-router-dom";
import customFetch from "../utils/axios/axios"
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";


  // Function to format a date as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  function getMondayDate() {
    let today = new Date(); // Get today's date
    let day = today.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    let diff = today.getDate() - day + (day === 0 ? -6 : 1); // Calculate the difference to Monday
    let monday = new Date(today.setDate(diff)); // Set the date to Monday

    // Format the date as "YYYY-MM-DD"
    let formattedMonday = monday.toISOString().slice(0, 10);
    
    return formattedMonday;
}

// Example usage:


const Calendar = () => {
   // Get the current date
   const currentDate = new Date();
   // Calculate the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
   const currentDayOfWeek = currentDate.getDay();
   // Calculate the difference between the current day and Monday (negative if the current day is before Monday)
   const differenceToMonday = currentDayOfWeek - 1;
   // Calculate the difference between the current day and Sunday (positive if the current day is before Sunday)
   const differenceToSunday = 7 - currentDayOfWeek;
   
   // Calculate the Monday and Sunday dates of the current week
   const mondayDate = new Date(currentDate);
   mondayDate.setDate(currentDate.getDate() - differenceToMonday);
   const sundayDate = new Date(currentDate);
   sundayDate.setDate(currentDate.getDate() + differenceToSunday);
 
   // Format the dates as YYYY-MM-DD strings
  const [startDate, setStartDate] = useState(formatDate(mondayDate));
  const [endDate, setEndDate] = useState(formatDate(sundayDate))
  // console.log(startDate,endDate)

  // console.log(currentDayOfWeek)

  const [classes, setClasses] = useState({});


  const fetchClassesForWeek = async () => {
    try {
      const response = await customFetch(`/classes/calender?startDate=${startDate}&endDate=${endDate}`);
      setClasses(response.data.classes);
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };
  // console.log(formatDate(currentDate), startDate)

  useEffect(() => {
    const mondayDate = getMondayDate()
    if( mondayDate <= startDate){
      fetchClassesForWeek();
    }
  }, [startDate]);

  const handleNextWeek = () => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate)
    newEndDate.setDate(newEndDate.getDate()+7)
    newStartDate.setDate(newStartDate.getDate() + 7);
    setEndDate(newEndDate.toISOString().split('T')[0]);
    setStartDate(newStartDate.toISOString().split('T')[0]);
  };

  const handlePreviousWeek = () => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate)
    newEndDate.setDate(newEndDate.getDate()-7)
    newStartDate.setDate(newStartDate.getDate() - 7);
    setEndDate(newEndDate.toISOString().split('T')[0]);
    setStartDate(newStartDate.toISOString().split('T')[0]);
  };

  return (
    <div>
      <div className="flex justify-between mb-5">
        <button onClick={handlePreviousWeek} className="btn btn-sm btn-primary text-xs md:text-lg">Previous Week</button>
        <button onClick={handleNextWeek} className="btn btn-sm btn-primary text-xs md:text-lg" >Next Week</button>
      </div>
      <div className="grid gap-4">
        {Object.entries(classes).map(([date, dayClasses]) => (
          <div key={date} className="">
            <div className="rounded-lg p-4 bg-[#f2f2f2] flex justify-between gap-2 items-center ">
              <h3 className="font-bold text-base md:text-2xl">{new Date(date).toLocaleDateString("en-US", { weekday: 'long' })}</h3>
              <span className="font-bold text-base md:text-2xl">{date.split(' ').splice(1,3).join(" ")}</span>
            </div>
            <div className="grid gap-3">
            {dayClasses.map(({ activity_id, activity_name, activity_description }) => (
              <div key={activity_name} className="card w-full bg-base-100 shadow-xl py-4 px-2">
                <div className="md:flex items-center justify-between">
                  <div className="py-4 md:py-0">
                    <h1 className="text-base md:text-2xl">{activity_name}</h1>
                    <p className="text-sm md:text-lg">{activity_description}</p>
                  </div>
                  {(new Date(date) > currentDate) && (
                    <Link
                    to={`/createBooking/${new Date(date).toLocaleDateString('en-CA').split('/').join('-')}/${activity_id}`}
                    className="btn btn-primary"
                  >
                    Book Now
                  </Link>
                  )} 

                </div>
              </div>
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
