import * as Blog from "../models/blog.js"

// get all blogs
export const getAllBlogs = async(req,res) =>{
    const allBlogs = await Blog.getAllBlogPost()
    res.status(200).json({
        status: 200,
        message: "Blog List",
        allBlogs: allBlogs
    })

}
// user should be able to edit their blog

//  user can delete their blog

//  user can create a blog

