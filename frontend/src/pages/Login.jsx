import { Form, Link, redirect } from "react-router-dom";
import InputForm from "../components/inputForm";
import SubmitBtn from "../components/SubmitBtn";
import customFetch from "../utils/axios/axios"
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";


export const action = (store) => async ({request}) =>{
  const formData = await request.formData()
  const loginData = Object.fromEntries(formData)

  try{
    const response = await customFetch.post("/login",loginData)

    // Pass the data to login action for userSlice reducer
    const {user_id, firstName,lastName,email,address,role,authenticationKey} = response.data
    store.dispatch(loginUser({user_id,firstName,lastName,email,address,role,authenticationKey}));
    toast.success(response.data.message)
    return redirect("/")
  }
  catch (error){
    toast.error(error?.response?.data?.message || "Login Failed, Please provide correct credentials")
    return null
  }
}

const Login = () => {
  return (
    <section className='h-screen grid place-items-center'>
      <Form method="post" className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
      <h4 className="text-3xl text-center font-bold">Login</h4>
        <InputForm
          label="email"
          type="email"
          placeholder="email"
          name="email"
          errorMessage="This field ...."
          defaultValue="bhandaro1211@gmail.com"
        />
        <InputForm
          label="password"
          type="password"
          placeholder="password"
          name="password"
          // pattern=".{7,}"
          errorMessage = "This field is required"
          defaultValue="1234"
        />
        <SubmitBtn text={"Login"} />
        <p className='text-center'>
          Not a member yet?
          <Link
            to='/register'
            className='ml-2 link link-hover link-primary capitalize'
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
