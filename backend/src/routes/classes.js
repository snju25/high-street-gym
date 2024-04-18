import {Router} from "express"
import { getAllUniqueActivity, getByDateAndActivity, getClassesByDate,getAllUniqueClassEveryDayForTheWeek, createNewClasses } from "../controllers/classes.js"

const classesRouter = Router()

classesRouter.get("/getAllClasses/:date", getClassesByDate) // get all classes from a particular date
classesRouter.get("/calender",getAllUniqueClassEveryDayForTheWeek ) // get all unique classes for 1 week requires query params
classesRouter.get("/createBooking/:date/:id",getByDateAndActivity ) // get by date and activity id for a certain day.
classesRouter.post("/importXML/class",createNewClasses ) // get by date and activity id for a certain day.

export default classesRouter