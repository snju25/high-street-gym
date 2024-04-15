import express from "express"
import { updateUser, getAllUsers,loginUser,registerUser, logoutUser, createNewUsers } from "../controllers/users.js"

const router = express.Router()

router.get("/AllUsers", getAllUsers);
router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.patch("/profile/:id",updateUser)
router.post("/importXML",createNewUsers)

export default router