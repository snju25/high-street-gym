import {db} from "../database.js"

export const newBlogPost = (id,dateTime,userID,title,content) =>{
    return {
        id,
        dateTime,
        userID,
        title,
        content
    }
}

export const getAllBlogPost = async () =>{
    const [allBlogPosts] = await  db.query("SELECT * FROM blog_posts")
    return await allBlogPosts.map((blogPost)=>{
        return newBlogPost(
            blogPost.post_id,
            blogPost.post_datetime,
            blogPost.post_user_id,
            blogPost.post_title,
            blogPost.post_content
        )
    })
}
// getAllBlogPost().then(res => console.log(res))
export const getPostByID = async(postID) =>{
    const [blogResults] = await db.query(
        "SELECT * FROM blog_posts WHERE post_id = ?", postID
    )
    if(blogResults.length>0){
        const blogResult = blogResults[0]
        return Promise.resolve(
            newBlogPost(
                blogResult.post_id,
                blogResult.post_datetime,
                blogResult.post_user_id,
                blogResult.post_title,
                blogResult.post_content,

            )
        )
    } else {
        return Promise.reject("no results found")
    }
}

export const createPost = async(post)=>{
    return db.query(
        "INSERT INTO blog_posts (post_user_id,post_title,post_content)" + "VALUES (?,?,?)",
        [
            post.userID,
            post.title,
            post.content
        ]
    ).then(([result])=>{
        return {...post, id: result.insertId}
    })
}

// update post 
export const updatePost = async (post) => {
    return db.query(
        "UPDATE blog_posts SET "
        + "post_title = ?, "
        + "post_content = ? "
        + "WHERE post_id = ?",
        [
            post.title,
            post.content,
            post.id
        ]
    ).then(([result]) => {
        return { ...post}
    });
};



export const deletePost = async(postID) =>{
    return db.query(
        "DELETE FROM blog_posts WHERE post_id = ?", postID
    )
}







