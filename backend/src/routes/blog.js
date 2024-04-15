import express from "express"
import { editBlog,getAllBlogs,createABlog,getById,deleteBlogPost } from "../controllers/blog.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/allBlogs", auth(["manager","member","trainer"]), getAllBlogs)
router.get("/blog/:id",auth(["manager","member","trainer"]), getById)
router.post("/createBlog",auth(["manager","member","trainer"]), createABlog)
router.patch("/blog/:id",auth(["manager","member","trainer"]),editBlog)
router.delete("/blog/:id",auth(["manager","member","trainer"]), deleteBlogPost)
export default router

