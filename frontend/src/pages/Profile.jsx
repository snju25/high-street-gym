import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {Form} from "react-router-dom"
import customFetch from "../utils/axios/axios"
import {toast} from "react-toastify"
import {editUser} from "../features/user/userSlice"


const Profile = () => {
  const user = useSelector(state => state.userState.user)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    id: user.id,
    firstName : user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    password: user.password,
    role: user.role,
    address: user.address || "", // if address is null then empty string
    authenticationKey: user.authenticationKey 
  })


  const handleSubmit = async (e) =>{
    e.preventDefault()

    try{
      const response = await customFetch.patch(`/profile/${user.id}`,formData,{
        headers:{
          "X-AUTH-KEY": formData.authenticationKey
        }
      })
      toast.success(response.data.message || "User has been updated")
      dispatch(editUser(formData))
    }catch(err){
      console.log(err)
      return err
    }
  }
  return (
    <main className="grid place-items-center">
      <form className="form-control card w-96 md:w-[80%] max-w-[900px] p-8 bg-base-100 shadow-lg grid md:grid-cols-2 md:gap-2 " onSubmit={handleSubmit}>
        <div>
          <div className="label">
            <span className="label-text">First Name</span>
          </div>
          <input 
            name="firstName"
            className="input input-bordered w-full max-w-xs" 
            value={formData.firstName}
            onChange={(e)=> setFormData((prevData) => { return {...prevData,  firstName: e.target.value}})}
            required
            />
        </div>
        <div>
          <div className="label">
            <span className="label-text">Last Name</span>
          </div>
          <input 
            name="lastName"
            className="input input-bordered w-full max-w-xs" 
            value={formData.lastName}
            onChange={(e)=> setFormData((prevData) => { return {...prevData,  lastName: e.target.value}})}
            required
            />
        </div>
        <div>
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input 
            name="email"
            className="input input-bordered w-full max-w-xs" 
            value={formData.email}
            onChange={(e)=> setFormData((prevData) => { return {...prevData,  email: e.target.value}})}
            required
            />
        </div>
        <div>
          <div className="label">
            <span className="label-text">password</span>
          </div>
          <input 
            type="password"
            name="password"
            className="input input-bordered w-full max-w-xs" 
            value={formData.password}
            onChange={(e)=> setFormData((prevData) => { return {...prevData,  password: e.target.value}})}
            required
            />
        </div>
        <div>
          <div className="label">
            <span className="label-text">Phone</span>
          </div>
          <input 
            name="phone"
            className="input input-bordered w-full max-w-xs" 
            value={formData.phone}
            onChange={(e)=> setFormData((prevData) => { return {...prevData,  phone: e.target.value}})}
            />
        </div>
        <div>
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <input 
            name="address"
            className="input input-bordered w-full max-w-xs" 
            value={formData.address}
            onChange={(e)=> setFormData((prevData) => { return {...prevData,  address: e.target.value}})}
            />
        </div>
        <button className="btn btn-primary md:col-span-2 mt-5">Update</button>
      </form>
    </main>
  )
}
export default Profile