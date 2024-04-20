import  {Router} from "express"
import { createBooking, deleteBookingByID, getAllBookingsFromAUser } from "../controllers/bookings.js"
import auth from "../middleware/auth.js"

const bookingRouter = Router()

bookingRouter.post("/",auth(["member"]),createBooking)
bookingRouter.get("/:id",auth(["trainer","member","manager"]),getAllBookingsFromAUser)
bookingRouter.delete("/:id",auth(["member"]),deleteBookingByID)


export default bookingRouter