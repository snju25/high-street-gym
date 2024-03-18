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
export const getAllBookingsFromAUser = async(req,res)=>{
    const id = req.params.id
    const bookings = await Bookings.getAllForOneUser(id)
    res.status(201).json({
        status: 201,
        message: "Booking has been created",
        bookings: bookings
    })
}