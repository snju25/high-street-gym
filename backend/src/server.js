import express from "express"
import cors from "cors"
import userRouter from "./routes/users.js"
import blogRouter from "./routes/blog.js"
import classesRouter from "./routes/classes.js"
import bookingRouter from "./routes/bookings.js"
import activityRouter from "./routes/activity.js"
import fileUpload from "express-fileupload"

const app = express();
const port = 8081;

// Enable cross-origin resources sharing (CORS)
app.use(cors({
    // Allow all origins
    origin: true,
}))

// json parsing middleware
app.use(express.json())
app.use(fileUpload({
    limits: { fileSize: 50*1024*1024},
}))


app.use("/",userRouter)
app.use("/", blogRouter)
app.use("/classes", classesRouter)
app.use("/bookings",bookingRouter)
app.use("/activity",activityRouter)

app.listen(port, ()=>{
    console.log(`Server is listening on http://localhost:${port}`);
})