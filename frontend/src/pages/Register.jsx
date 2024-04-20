import { Form, Link, redirect } from "react-router-dom"
import SubmitBtn from "../components/SubmitBtn"
import InputForm from "../components/inputForm"
import { toast } from "react-toastify"
import customFetch from "../utils/axios/axios"

export const action = async ({request}) =>{
  const formData = await request.formData()
  const registerData = Object.fromEntries(formData)
  console.log(registerData)

  try{
    const response = await customFetch.post("/register",registerData)
    toast.success(response.data.message)
    if(response.data.message === "You have been registered"){
      return redirect("/login")
    }
    return null;
  }
  catch (error){
    console.log(error)
    toast.error(error?.response?.data?.message || "Dry different Credentials")
    return null
  }
}

const Register = () => {
  return (
    <section className="h-screen grid place-items-center my-5">
      <Form method="post" className="card w-96 md:w-[80%] max-w-[900px] p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"> 
      <h4 className="text-center text-3xl font-bold">Register</h4>
      <div className="grid md:grid-cols-2 md:gap-2">
        <InputForm type="email" label="email" name="email" errorMessage="Invalid input..." />
        <InputForm type="password" label="password" name="password" errorMessage="invalid input...." />
        <InputForm type="text" label="phone" name="phone" errorMessage="Invalid input...."/>
        <InputForm type="text" label="first Name" name="firstName" errorMessage="Invalid input...."/>
        <InputForm type="text" label="Last Name" name="lastName" errorMessage="Invalid input...."/>
        <InputForm type="text" label="Address" name="address" errorMessage="Invalid input...."/>
      </div>
      <div className="mt-4">
        <SubmitBtn  text='Register'/>
      </div>
      <p className="text-center">Already a member? <Link to="/login" className="ml-2 link link-hover link-primary capitalize text-center" >
            Login
          </Link></p>
      </Form>
    </section>
  )
}
export default Register