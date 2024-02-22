import axios from "axios"

 const customFetch = axios.create({
    baseURL: "http://localhost:8081/"
})
export default customFetch; 