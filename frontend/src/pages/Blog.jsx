import {Form, Link, useLoaderData, useNavigate} from "react-router-dom"
import customFetch from "../utils/axios/axios"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"


// create a post loader
export const action = (store) => async ({request}) => {
  const formData = await request.formData()
  const postContent = Object.fromEntries(formData)
  const {id,authenticationKey} = store.getState().userState.user
  const {title, content} = postContent 
  try{
    const response = await customFetch.post("/createBlog", {user_id:id,title,content},{
      headers: {
        'X-AUTH-KEY': authenticationKey
      }
    })
    toast.success(response.data.message || "Post Created successfully")
    return null
  } catch(err){
    return err
  }
}


// get all post loader
export const loader = (store) => async ({request}) =>{
  const {authenticationKey} = store.getState().userState.user
  try{
    const response = await customFetch("/allBlogs",{
      headers : {
        "X-AUTH-KEY": authenticationKey
      }
    })
    const allBlogPost = response.data
    return {allBlogPost: allBlogPost?.allBlogs}
  }
  catch(error){

  }
  return null
}

const Blog = () => {
  const {allBlogPost} = useLoaderData()
  const navigate = useNavigate()

  // checks if user exist within the userState in userSlice to disable or enable create blog button. 
  const user = useSelector(state=> state.userState.user)

  const handleDelete = async (post_id) => {
    try {
        const response = await customFetch.delete(`/blog/${post_id}`,{
          headers : {
            "X-AUTH-KEY": user.authenticationKey
          }
        });
        toast.success(response.data.message || "Post deleted successfully");
        navigate(0)
    } catch (error) {
        toast.error("Error deleting post");
    }
};

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
      <section className="grid gap-3 place-items-center">
          {allBlogPost.map((blog)=>{
            const {post_id, datetime, title, firstName, lastName, user_id,content} = blog
            return <div key={post_id} className="card card-compact w-[100%] bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold">{firstName} {lastName}</h2>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p>{content}</p>
              <p>{new Date(datetime).toLocaleString()}</p>
              {user && user_id === user.id
              &&  <div className="card-actions justify-end ml-auto">
              <button className="btn bg-red-400 p-0 px-2 py-1 text-white" onClick={() =>handleDelete(post_id)}>Delete</button>
              <Link to={`/blog/${post_id}`} className="btn bg-gray-400 p-0 px-2 py-1 text-white">Edit</Link>
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