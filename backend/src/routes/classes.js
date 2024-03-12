import {Router} from "express"
import { getClassesByDay } from "../controllers/classes.js"

const classesRouter = Router()

classesRouter.get("/:day", getClassesByDay)

export default classesRouter