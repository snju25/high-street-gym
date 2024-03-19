import  {Router} from "express"
import { createBooking, deleteBookingByID, getAllBookingsFromAUser } from "../controllers/bookings.js"

const bookingRouter = Router()

bookingRouter.post("/",createBooking)
bookingRouter.get("/:id",getAllBookingsFromAUser)
bookingRouter.delete("/:id",deleteBookingByID)


export default bookingRouter