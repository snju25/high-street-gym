import { Form, Link } from "react-router-dom"
import SubmitBtn from "../components/SubmitBtn"
import InputForm from "../components/inputForm"

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form method="post" className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"> 
      <h4 className="text-center text-3xl font-bold">Register</h4>
      <InputForm type="text" label="username" name="username" errorMessage="Invalid input...."/>
      <InputForm type="email" label="email" name="email" errorMessage="Invalid input..." />
      <InputForm type="password" label="password" name="password" errorMessage="invalid input...." />
      <div className="mt-4">
        <SubmitBtn  text='LOGIN'/>
      </div>
      <p className="text-center">Already a member? <Link to="/login" className="ml-2 link link-hover link-primary capitalize text-center" >
            Login
          </Link></p>
      </Form>
    </section>
  )
}
export default Register