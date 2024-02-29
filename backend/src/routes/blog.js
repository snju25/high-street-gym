import express from "express"
import { editBlog,getAllBlogs,createABlog,getById } from "../controllers/blog.js"

const router = express.Router()

router.get("/allBlogs", getAllBlogs)
router.get("/blog/:id", getById)
router.post("/createBlog", createABlog)
router.patch("/blog/:id",editBlog)
export default router

