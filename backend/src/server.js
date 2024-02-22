import express from "express"
import userRouter from "./routes/users.js"

const app = express();
const port = 8081;

// json parsing middleware
app.use(express.json())


app.use("/",userRouter)

app.listen(port, ()=>{
    console.log(`Server is listening on http://localhost:${port}`);
})