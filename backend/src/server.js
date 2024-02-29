import express from "express"
import cors from "cors"
import userRouter from "./routes/users.js"
import blogRouter from "./routes/blog.js"

const app = express();
const port = 8081;

// Enable cross-origin resources sharing (CORS)
app.use(cors({
    // Allow all origins
    origin: true,
}))

// json parsing middleware
app.use(express.json())


app.use("/",userRouter)
app.use("/", blogRouter)

app.listen(port, ()=>{
    console.log(`Server is listening on http://localhost:${port}`);
})