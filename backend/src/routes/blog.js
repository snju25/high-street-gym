import express from "express"
import { getAllBlogs } from "../controllers/blog.js"

const router = express.Router()

router.get("/allBlogs", getAllBlogs)

export default router

