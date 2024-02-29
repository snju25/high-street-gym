import {Form, Link, useLoaderData} from "react-router-dom"
import customFetch from "../utils/axios/axios"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"


// create a post loader
export const action = (store) => async ({request}) => {
  const formData = await request.formData()
  const postContent = Object.fromEntries(formData)
  const {user_id} = store.getState().userState.user
  const {title, content} = postContent 
  try{
    const response = await customFetch.post("/createBlog", {user_id,title,content})
    toast.success(response.data.message || "Post Created successfully")
    return null
  } catch(err){
    console.log(err)
  }
  return null
}


// get all post loader
export const loader = async ({request}) =>{
  try{
    const response = await customFetch("/allBlogs")
    const allBlogPost = response.data
    return {allBlogPost: allBlogPost?.allBlogs}
  }
  catch(error){

  }
  return null
}

const Blog = () => {
  const {allBlogPost} = useLoaderData()

  // checks if user exist within the userState in userSlice to disable or enable create blog button. 
  const user = useSelector(state=> state.userState.user)
  console.log(user.user_id)
  return (
    <main>
      <section>
        {/* Post a blog */}
        <div className="rounded-lg shadow-lg border min-h-[100px] mb-5 p-4">
          <Form method="post" className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold" >Create a Post</h1>
            <input name="title" placeholder="Title...." className="border border-gray-300 p-4 w-[90%]" />
            <input name="content" placeholder="Write your own blog here...." className="border border-gray-300 p-4 w-[90%] min-h-[100px]" />
            <button type="submit" className="btn btn-secondary" disabled={user?false: true}>Create</button>
          </Form>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center">
          {allBlogPost.map((blog)=>{
            const {post_id, datetime, title, firstName, lastName, user_id,content} = blog
            return <div key={post_id} className="card card-compact w-[100%]  lg:w-[300px] bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold">{firstName} {lastName}</h2>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p>{content}</p>
              {user_id === user.user_id
              &&  <div className="card-actions justify-end ml-auto">
              <button className="btn bg-red-400 p-0 px-2 py-1 text-white">Delete</button>
              <button className="btn bg-gray-400 p-0 px-2 py-1 text-white">Edit</button>
              </div>
              }
            </div>
          </div>
          })}
      </section>
      
    </main>
  )
}
export default Blog