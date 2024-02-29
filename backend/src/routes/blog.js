import express from "express"
import { editBlog,getAllBlogs,createABlog,getById,deleteBlogPost } from "../controllers/blog.js"

const router = express.Router()

router.get("/allBlogs", getAllBlogs)
router.get("/blog/:id", getById)
router.post("/createBlog", createABlog)
router.patch("/blog/:id",editBlog)
router.delete("/blog/:id",deleteBlogPost)
export default router

