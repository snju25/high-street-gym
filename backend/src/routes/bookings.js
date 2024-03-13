import  {Router} from "express"
import { createBooking } from "../controllers/bookings.js"

const bookingRouter = Router()

bookingRouter.post("/",createBooking)

export default bookingRouter