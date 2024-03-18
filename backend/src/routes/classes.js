import {Router} from "express"
import { getAllUniqueActivity, getByDateAndActivity, getClassesByDay } from "../controllers/classes.js"

const classesRouter = Router()

classesRouter.get("/:day", getClassesByDay)
classesRouter.get("/unique/:day",getAllUniqueActivity )
classesRouter.get("/createBooking/:day/:id",getByDateAndActivity )

export default classesRouter