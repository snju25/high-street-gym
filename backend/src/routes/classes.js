import {Router} from "express"
import { getAllUniqueActivity, getClassesByDay } from "../controllers/classes.js"

const classesRouter = Router()

classesRouter.get("/:day", getClassesByDay)
classesRouter.get("/unique/:day",getAllUniqueActivity )

export default classesRouter