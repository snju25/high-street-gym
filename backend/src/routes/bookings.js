import  {Router} from "express"
import { createBooking, deleteBookingByID, getAllBookingsFromAUser,getTrainerBookings } from "../controllers/bookings.js"
import auth from "../middleware/auth.js"

const bookingRouter = Router()

bookingRouter.post("/",auth(["member","trainer","manager"]),createBooking)
bookingRouter.get("/member/:id",auth(["trainer","member","manager"]),getAllBookingsFromAUser)
bookingRouter.get("/trainer/:id",auth(["trainer","member","manager"]),getTrainerBookings)
bookingRouter.delete("/:id",auth(["member","manager","trainer"]),deleteBookingByID)


export default bookingRouter