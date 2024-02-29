import express from "express"
import { getAllBlogs,createABlog } from "../controllers/blog.js"

const router = express.Router()

router.get("/allBlogs", getAllBlogs)
router.post("/createBlog", createABlog)

export default router

