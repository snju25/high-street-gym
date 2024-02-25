import {Form, Link} from "react-router-dom"
import InputForm from "../components/InputForm"
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
  return (
    <main>
      <section>
        {/* Post a blog */}
        <div className="card rounded-lg shadow-lg border border-red-100 h-[100px] mb-5 ">
          <Form>
            <InputForm label="title" placeholder="create a blog here..." />

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
        
      </section>
    </main>
  )
}
export default Blog