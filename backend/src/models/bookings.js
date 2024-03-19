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
const book = { user_id: 1, time: "08:00:00", class_id: 12, trainer_id: 9, day: "Monday" }

// createBooking(book).then(res=> console.log(res))

export const getAllForOneUser = async (user_id) => {
    const [allBookings] = await db.query(
        `SELECT 
            bookings.booking_id,
            bookings.booking_user_id,
            bookings.booking_class_id,
            bookings.booking_time,
            bookings.booking_day,
            bookings.booking_trainer_id,
            activities.activity_name,
            classes.class_room_number,
            users.user_firstName,
            users.user_lastName
        FROM bookings
        JOIN classes ON bookings.booking_class_id = classes.class_id
        JOIN activities ON classes.class_activity_id = activities.activity_id
        JOIN users ON bookings.booking_trainer_id = users.user_id
        WHERE bookings.booking_user_id = ?`,
        [user_id]
    );

    return allBookings.map(booking => {
        return {
            bookingId: booking.booking_id,
            userId: booking.booking_user_id,
            classId: booking.booking_class_id,
            time: booking.booking_time,
            day: booking.booking_day,
            trainerId: booking.booking_trainer_id,
            activityName: booking.activity_name,
            roomNumber: booking.class_room_number,
            trainerFirstName: booking.user_firstName,
            trainerLastName: booking.user_lastName,
        };
    });
};

export const deleteBookingById = async(id)=>{
    return db.query('DELETE FROM bookings WHERE booking_id = ?',id)
}




