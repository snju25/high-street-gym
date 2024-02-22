import express from "express"
import { getAllUsers,loginUser,registerUser } from "../controllers/users.js"

const router = express.Router()

router.get("/AllUsers", getAllUsers);
router.post("/register",registerUser)
router.post("/login",loginUser)

export default router