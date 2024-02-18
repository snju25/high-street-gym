import { Form, Link } from "react-router-dom";
import InputForm from "../components/inputForm";
import SubmitBtn from "../components/SubmitBtn";
const Login = () => {
  return (
    <section className='h-screen grid place-items-center'>
      <Form method="post" className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
      <h4 className="text-3xl text-center font-bold">Login</h4>
        <InputForm
          label="username"
          type="text"
          placeholder="username"
          name="username"
          errorMessage="This field ...."
        />
        <InputForm
          label="password"
          type="password"
          placeholder="password"
          name="password"
          pattern=".{7,}"
          errorMessage = "This field is required"
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
