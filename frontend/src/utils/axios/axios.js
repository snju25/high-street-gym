import axios from "axios"

 const customFetch = axios.create({
    baseURL: "https://high-street-gym-production.up.railway.app/",
    headers: {
        Accept: 'application/json',
      },
})
export default customFetch; 