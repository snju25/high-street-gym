import axios from "axios"

 const customFetch = axios.create({
    baseURL: "https://high-street-gym-production.up.railway.app",
    // baseURL: "http://localhost:8081",
    headers: {
        Accept: 'application/json',
      },
})
export default customFetch; 