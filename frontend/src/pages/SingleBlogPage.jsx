import { Form, Link, redirect, useLoaderData } from "react-router-dom"
import customFetch from "../utils/axios/axios"
import { useState } from "react"
import {toast} from "react-toastify"


export const action = (store) => async({request,params})=>{
  const formData = await request.formData()
  const title = formData.get("title");
  const content = formData.get("content");
  const {authenticationKey} = store.getState().userState.user
  try{
    const response = await customFetch.patch(`/blog/${params.id}`,{title,content},{
      headers : {
        "X-AUTH-KEY": authenticationKey
      }
    })
    toast.success(response.data.message)
    return redirect("/blog")
  }
  catch(err){
    toast.error("Post could not be updated")
    return null
  }
}
export const loader = (store)=> async({params})=>{
  const {authenticationKey} = store.getState().userState.user
  try{
    const response = await customFetch(`/blog/${params.id}`,{
      headers : {
        "X-AUTH-KEY": authenticationKey
      }
    })
    return response.data.post
  }
  catch(err){
    return err
  }
}
const SingleBlogPage = () => {
  const post = useLoaderData();
  const [formData, setFormData] = useState({
    title:post.title,
    content: post.content

  })
  return (
    <Form method="post" className="flex flex-col gap-3">
      <p className="text-2xl font-bold flex items-center gap-2" ><Link to='/blog'> <span className="font-bold text-3xl">&#8592;</span> </Link> <span>Update Blog</span></p>
      <input
        value={formData.title}
        onChange={(e) => setFormData(existing => { return { ...existing, title: e.target.value } })}
        name="title" 
        placeholder="Title...." 
        className="border border-gray-300 p-4 w-[90%]"
         />
      <input 
        name="content" 
        placeholder="Write your own blog here...." 
        className="border border-gray-300 p-4 w-[90%] min-h-[100px]"
        value={formData.content}
        onChange={(e) => setFormData(existing => { return { ...existing, content: e.target.value } })}
        
        />
      <button type="submit" className="btn btn-secondary" >Update</button>
  </Form>
  )
}
export default SingleBlogPage