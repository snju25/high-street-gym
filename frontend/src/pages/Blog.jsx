import {Form, Link} from "react-router-dom"

import { useState } from "react"
const testData = [
  {
    blogId:1,
    username: "Sanjay",
    title: "First blog post..................................",
  },
  {

    blogId: 2,
    username: "Sanjay",
    title: "First blog post..................................",
  },{
    blogId: 3,
    username: "Sanjay",
    title: "First blog post..................................",
  },
  {
    blogId: 4,
    username: "Sanjay",
    title: "First blog post..................................",
  }
]

const Blog = () => {
  const [testShowBlogCreated,setTestShowBlogCreated] = useState(false)
  return (
    <main>
      <section>
        {/* Post a blog */}
        <div className="rounded-lg shadow-lg border min-h-[100px] mb-5 p-4">
          <Form>
            <input placeholder="Write your own blog here...." className="border border-gray-300 p-4 w-[90%] mr-3" />
            <button className="btn btn-secondary" onClick={()=> setTestShowBlogCreated(true)}>Create</button>
          </Form>
        </div>
      </section>
      <section className="flex flex-col gap-5">
          {testData.map((blog,i)=>{
            return <section key={i} className="flex gap-3">
              <img src="https://images.pexels.com/photos/15294904/pexels-photo-15294904/free-photo-of-portrait-of-brown-cat.jpeg" alt="default user photo" className="h-[40px] w-[40px] rounded-full object-cover"/>
              <div className="flex justify-center flex-col">
                <h1>{blog.username}</h1>
                <p>{blog.title}</p>
              </div>
              <Link to={`/blog/${blog.blogId}`} className="btn btn-primary ml-auto p-0 px-2 py-1">Read More</Link>
            </section>
          })}

          {testShowBlogCreated && <section className="flex gap-3">
              <img src="https://images.pexels.com/photos/15294904/pexels-photo-15294904/free-photo-of-portrait-of-brown-cat.jpeg" alt="default user photo" className="h-[40px] w-[40px] rounded-full object-cover"/>
              <div className="flex justify-center flex-col">
                <h1>{testData[0].username}</h1>
                <p>{testData[0].title}</p>
              </div>
              <Link to={`/blog/${testData[0].blogId}`} className="btn btn-primary ml-auto p-0 px-2 py-1">Read More</Link>
            </section>}
      </section>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </main>
  )
}
export default Blog