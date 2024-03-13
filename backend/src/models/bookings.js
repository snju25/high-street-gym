import {db} from "../database.js"


export const booking = (id,user_id,class_id,time,day,trainer_id) =>{
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


