import { useForm } from "react-hook-form";
import { classNames } from "../Nav";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password)
  }
`;

export const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [loginUser] = useMutation(LOGIN_USER);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (value) => {
    try {
      const response = await loginUser({
        variables: {
          username: value.username,
          password: value.password,
        },
      });
      const token = response.data.loginUser;
      const { sub, role } = jwtDecode(token);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("username", sub);
      sessionStorage.setItem("role", role);

      navigate("/exams");
    } catch (err) {
      setInvalidCredentials(true);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register("username", { required: "Required" })}
                  id="username"
                  name="username"
                  type="username"
                  required
                  autoComplete="username"
                  className={classNames(
                    errors.username || invalidCredentials
                      ? "ring-red-700"
                      : "ring-gray-300",
                    "block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  )}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("password", { required: "Required" })}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className={classNames(
                    errors.password || invalidCredentials
                      ? "ring-red-700"
                      : "ring-gray-300",
                    "block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  )}
                />
              </div>
            </div>
            {invalidCredentials && (
              <p className="text-red-600 font-bold"> Invalid Credentials!</p>
            )}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <span
              onClick={() => navigate("/registration")}
              className="font-semibold hover:cursor-pointer text-indigo-600 hover:text-indigo-500"
            >
              Sign Up!
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
