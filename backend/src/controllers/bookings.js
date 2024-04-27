import * as Bookings from "../models/bookings.js"

export const createBooking = async(req,res)=>{
    const bookingData = req.body
try{
    const booking = await Bookings.createBooking(bookingData)
    res.status(201).json({
        status: 201,
        message: "Booking has been created",
        booking: booking
    })
}
catch(err){
    return res.status(400).json({
        status: 400,
        message: "Error" + err,
    })
}
}
export const getAllBookingsFromAUser = async(req,res)=>{
    const id = req.params.id
    try{
        const bookings = await Bookings.getAllForOneUser(id)
        res.status(201).json({
            status: 201,
            message: "Booking has been created",
            bookings: bookings
        })

    }catch(err){
        return res.status(400).json({
            status: 400,
            message: "Error" + err,
        })
    }
}
export const deleteBookingByID = async(req,res)=>{
    const id = req.params.id
    
    try{
        Bookings.deleteBookingById(id).then(
            res.status(200).json({
                status:200,
                message: "Deleted Booking",
            })
        )

    }catch(err){
        return res.status(400).json({
            status: 400,
            message: "Error" + err,
        })
    }
}

export const getTrainerBookings = async(req,res)=>{
    const id = req.params.id
    try{
        const bookings = await Bookings.getBookingsByTrainerID(id)
        res.status(201).json({
            status: 201,
            message: "Booking has been created",
            bookings: bookings
        })
    }catch(err){
        return res.status(400).json({
            status: 400,
            message: "Error" + err,
        })
    }
}