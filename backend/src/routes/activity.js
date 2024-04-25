import express from "express"
import { getActivitiesIDandName } from "../controllers/activity.js";

const router = express.Router()

router.get("/",getActivitiesIDandName)

export default router
