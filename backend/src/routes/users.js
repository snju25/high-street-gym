import express from "express"
import { updateUser, getTrainerAndManager,loginUser,registerUser, logoutUser, createNewUsers } from "../controllers/users.js"
import auth from "../middleware/auth.js";

const router = express.Router()

router.get("/AllUsers", getTrainerAndManager);
router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.patch("/profile/:id",updateUser)
router.post("/importXML/user",auth(["trainer","manager"]), createNewUsers)

export default router