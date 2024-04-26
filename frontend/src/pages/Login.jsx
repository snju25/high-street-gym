import { Form, Link, redirect } from "react-router-dom";
import InputForm from "../components/InputForm";
import SubmitBtn from "../components/SubmitBtn";
import customFetch from "../utils/axios/axios";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const loginData = Object.fromEntries(formData);

    try {
      const response = await customFetch.post("/login", loginData);

      // Pass the data to login action for userSlice reducer
      const { user } = response.data;
      store.dispatch(loginUser(user));
      toast.success(response.data.message);
      return redirect("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Login Failed, Please provide correct credentials"
      );
      return null;
    }
  };

const Login = () => {
  return (
    <div className="flex md:justify-evenly md:gap-y-15 md:items-center flex-col md:flex-row">
      <section className="md:h-screen grid place-items-center my-4">
        <Form
          method="post"
          className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
        >
          <h4 className="text-3xl text-center font-bold">Login</h4>
          <InputForm
            label="email"
            type="email"
            placeholder="email"
            name="email"
            errorMessage="This field ...."
            defaultValue="member21@gmail.com"
          />
          <InputForm
            label="password"
            type="password"
            placeholder="password"
            name="password"
            // pattern=".{7,}"
            errorMessage="This field is required"
            defaultValue="abc123"
          />
          <SubmitBtn text={"Login"} />
          <p className="text-center">
            Not a member yet?
            <Link
              to="/register"
              className="ml-2 link link-hover link-primary capitalize"
            >
              register
            </Link>
          </p>
        </Form>
      </section>

      <div className="overflow-x-auto max-w-[100%] self-center">
        <table className="table">
          {/* head */}
          <caption className="bg-neutral-200 rounded-lg py-2 font-semibold">Hey tester these are the credentials to access the site's features</caption>
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>member21@gmail.com</td>
              <td>abc123</td>
              <td>member</td>
            </tr>
            {/* row 2 */}
            <tr className="hover">
              <th>2</th>
              <td>trainer2@gmail.com</td>
              <td>abc123</td>
              <td>trainer</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>admin@gmail.com</td>
              <td>abc123</td>
              <td>manager</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Login;
