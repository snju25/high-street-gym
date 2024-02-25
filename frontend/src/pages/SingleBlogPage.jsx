
// export const loader = async ({params}) =>{
//   const {id} = params
//   const response = await customFetch(`/products/${id}`)
//   const product = response.data.data
//   return {product}

import { Link } from "react-router-dom"

// }
const sampleData = {
    blogId:1,
    username: "Sanjay",
    title: "First blog post..................................",
    subtitle:"I am 30  i want to make a career change. What should i do",
    content:"The blog post Content here................."
  }

const SingleBlogPage = () => {
  return (
    <div>
      <section className="flex items-center gap-3"><Link to='/blog'> <span className="font-bold text-3xl">&#8592;</span> </Link> <span className="text-4xl font-bold">{sampleData.title}</span></section>
      <article className="mt-5">
        <h1 className="text-3xl font-bold">{sampleData.subtitle}</h1>
        <p className="">{sampleData.content}</p>
      </article>
    </div>
  )
}
export default SingleBlogPage