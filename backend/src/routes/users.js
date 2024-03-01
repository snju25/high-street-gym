import express from "express"
import { updateUser, getAllUsers,loginUser,registerUser } from "../controllers/users.js"

const router = express.Router()

router.get("/AllUsers", getAllUsers);
router.post("/register",registerUser)
router.post("/login",loginUser)
router.patch("/profile/:id",updateUser)

export default router