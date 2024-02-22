import express from "express"
import { getAllUsers,registerUser } from "../controllers/users.js"

const router = express.Router()

router.get("/AllUsers", getAllUsers);
router.post("/register",registerUser)

export default router