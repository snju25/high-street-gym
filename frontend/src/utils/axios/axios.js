import axios from "axios"

 const customFetch = axios.create({
    baseURL: "https://high-street-gym-54sr.onrender.com/",
    headers: {
        Accept: 'application/json',
      },
})
export default customFetch; 