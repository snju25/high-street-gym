import  {Router} from "express"
import { createBooking, getAllBookingsFromAUser } from "../controllers/bookings.js"

const bookingRouter = Router()

bookingRouter.post("/",createBooking)
bookingRouter.get("/:id",getAllBookingsFromAUser)


export default bookingRouter