import {db} from "../database.js"


export const Booking = (id,user_id,class_id,time,day,trainer_id) =>{
    return {
        id,
        user_id,
        class_id,
        time,
        day,
        trainer_id
    }
}

export const createBooking = async(booking)=>{
    return db.query(
        "INSERT INTO bookings (booking_user_id,booking_class_id, booking_day,booking_trainer_id,booking_time)" +
        "VALUES (?,?,?,?,?)",
        [
            booking.user_id,
            booking.class_id,
            booking.day,
            booking.trainer_id,
            booking.time
        ]
    ).then(([result])=>{
        return {...booking,id:result.insertId}
    })
}

export const getAllForOneUser = async(user_id) =>{
    const [allBookings] = await db.query("SELECT * FROM bookings WHERE booking_user_id = ?", user_id)
         return allBookings.map(booking => {
                return Booking(
                booking.booking_id,
                booking.booking_user_id,
                booking.booking_class_id,
                booking.booking_time,
                booking.booking_day,
                booking.booking_trainer_id,
            )
        })
    
}
// getAllForOneUser(8).then(res=> console.log(res))



