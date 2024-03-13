import * as Bookings from "../models/bookings.js"

export const createBooking = async(req,res)=>{
    const bookingData = req.body

    const booking = await Bookings.createBooking(bookingData)
    res.status(201).json({
        status: 201,
        message: "Booking has been created",
        booking: booking
    })
}