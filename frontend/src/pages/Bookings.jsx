import { useLoaderData } from "react-router-dom"
import customFetch from "../utils/axios/axios"


export const loader = (store) => async({request}) =>{
  const {id,authenticationKey} = store.getState().userState.user

  try{
    const response = await customFetch(`/bookings/${id}`)
    const bookings = response.data.bookings
    console.log(bookings)
    return bookings
  }catch(err){
    return err
  }
}
const Bookings = () => {
  const bookings = useLoaderData()
  // map over bookings day and time and trainer name 
  return (
    <div>Bookings</div>
  )
}
export default Bookings