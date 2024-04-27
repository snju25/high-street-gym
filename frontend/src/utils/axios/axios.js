import axios from "axios"

 const customFetch = axios.create({
    baseURL: "http://localhost:8081",
    headers: {
        Accept: 'application/json',
      },
})
export default customFetch; 