import * as Blog from "../models/blog.js"
import * as BlogUser from "../models/blogUser.js"

// get all blogs
export const getAllBlogs = async(req,res) =>{
    const allBlogs = await BlogUser.getAllBlogs()
    res.status(200).json({
        status: 200,
        message: "Blog List",
        allBlogs: allBlogs
    })

}
export const createABlog  = async(req,res) =>{
    const {user_id, title,content} = req.body
    const blog = Blog.newBlogPost(
        null,
        null,
        user_id,
        title,
        content
    ) 

    Blog.createPost(blog).then(post=>{
        res.status(200).json({
            status: 200,
            message: "Created a blog",
            blog: blog,
        })
    }).catch(error =>{
        res.status(500).json({
            status: 500,
            message: "Could not create",
            error
        })
    })

}

// user should be able to edit their blog

//  user can delete their blog

//  user can create a blog

