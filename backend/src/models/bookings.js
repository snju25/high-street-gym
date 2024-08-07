import {db} from "../database.js"


export const Booking = (id,user_id,class_id,time,date,trainer_id) =>{
    return {
        id,
        user_id,
        class_id,
        time,
        date,
        trainer_id
    }
}

export const createBooking = async(booking)=>{
    return db.query(
        "INSERT INTO bookings (booking_user_id,booking_class_id, booking_date,booking_trainer_id,booking_time)" +
        "VALUES (?,?,?,?,?)",
        [
            booking.user_id,
            booking.class_id,
            new Date(booking.date).toLocaleDateString('en-CA'),
            booking.trainer_id,
            booking.time
        ]
    ).then(([result])=>{
        return {...booking,id:result.insertId}
    })
}
const book = { user_id: 1, time: "08:00:00", class_id: 12, trainer_id: 9, date: "2024-04-15" }

// createBooking(book).then(res=> console.log(res))

export const getAllForOneUser = async (user_id) => {
    const [allBookings] = await db.query(
        `SELECT 
            bookings.booking_id,
            bookings.booking_user_id,
            bookings.booking_class_id,
            bookings.booking_time,
            bookings.booking_date,
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
            date: booking.booking_date,
            trainerId: booking.booking_trainer_id,
            activityName: booking.activity_name,
            roomNumber: booking.class_room_number,
            trainerFirstName: booking.user_firstName,
            trainerLastName: booking.user_lastName,
        };
    });
};

export const getBookingsByTrainerID = async (trainer_id) => {
    const [allBookings] = await db.query(
        `SELECT 
            class_id,
            class_datetime,
            date,
            activity_name,
            activity_duration,
            class_room_number,
            COUNT(booking_id) AS booking_count
        FROM 
            classes
        JOIN
            activities ON classes.class_activity_id = activities.activity_id
        LEFT JOIN
            bookings ON class_id = booking_class_id
        WHERE 
            class_trainer_user_id = ? AND date >= CURRENT_DATE()
        GROUP BY
            class_id,
            class_datetime,
            date,
            activity_name,
            activity_duration
        ORDER BY 
            date
        `, trainer_id
    );
    return allBookings;
}

// getBookingsByTrainerID(1).then(res => console.log(res))


export const deleteBookingById = async(id)=>{
    return db.query('DELETE FROM bookings WHERE booking_id = ?',id)
}

// check if booking already exist in database
export const bookingAlreadyExist = async(booking)=>{
    try{
        const [bookings] = db.query(`
        SELECT * FROM bookings WHERE booking_user_id=?,booking_class_id = ?, booking_date=?,booking_trainer_id=?,booking_time=?`
        ,[
            booking.user_id,
            booking.class_id,
            new Date(booking.date).toLocaleDateString('en-CA'),
            booking.trainer_id,
            booking.time
        ])
        return booking

    }catch(err){
        console.log(err)
        return err
    }
  
}
// bookingAlreadyExist({
//     bookings: {
//         user_id:'44',
//         class_id: '20',
//         new Date().toLocaleDateString('en-CA'),
//         trainer_id,
//         time
//     }
// })



