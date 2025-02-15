import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import { isAuthenticate } from "../../utils/isAuthenticate";
import { debounce } from "lodash";
import { classNames } from "../../components/Nav";

const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $role: String!
    $password: String!
    $fullName: String!
    $regNo: String!
    $department: String!
  ) {
    registerUser(
      username: $username
      email: $email
      role: $role
      password: $password
      fullName: $fullName
      regNo: $regNo
      department: $department
    ) {
      id
    }
  }
`;

const IS_USERNAME_EXISTS = gql`
  query IsUserNameExists($username: String!) {
    isUserNameExists(username: $username)
  }
`;

export const Registration = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm();
  const [registerUser] = useMutation(REGISTER_USER);
  const [showModal, setShowModal] = useState(false);
  const authentic = isAuthenticate();
  const [IsUserNameExists] = useLazyQuery(IS_USERNAME_EXISTS);

  const navigate = useNavigate();

  useEffect(() => {
    if (authentic) {
      navigate("/exams");
    }
  });

  const debouncedCheckUsername = debounce(async (username) => {
    const { data } = await IsUserNameExists({ variables: { username } });

    if (data?.isUserNameExists) {
      setError("username", {
        type: "manual",
        message: "Username already exists.",
      });
    } else {
      clearErrors("username");
    }
  }, 500);

  const handleUsernameChange = (e) => {
    const username = e.target.value;
    debouncedCheckUsername(username);
  };

  const handleRegister = async (value) => {
    console.log(value);
    try {
      await registerUser({
        variables: {
          username: value.username,
          email: value.email,
          role: value.role,
          password: value.password,
          fullName: value.fullName,
          regNo: value.regNo,
          department: value.department,
        },
      });
      reset();
      setShowModal(true);
    } catch (err) {
      console.error("Error on user registration:", err);
    }
  };

  return (
    <section className="bg-white flex">
      <Modal
        open={showModal}
        setOpen={setShowModal}
        info={{
          title: "Congratulations!",
          details: `🎉 You're with us now!  🎉`,
        }}
        buttons={[
          {
            title: "Okay",
            onClick: () => setShowModal(false),
            textColor: "#fff",
            bgColor: "#33cc66",
          },
        ]}
      />
      <div className="w-full bg-gray-100 rounded-lg shadow sm:max-w-md xl:p-0 m-auto mt-20">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 m-auto">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Create an account
          </h1>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="space-y-4 md:space-y-6"
            action="#"
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                {...register("username", { required: "Username is required" })}
                type="username"
                name="username"
                id="username"
                className={classNames(
                  errors.username ? "border-red-300" : "border-gray-300",
                  "bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                )}
                placeholder="Username"
                required
                onChange={(e) => handleUsernameChange(e)}
              />
              {errors.username && (
                <p className="text-red-500">Username already exists</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Full Name
              </label>
              <input
                {...register("fullName", { required: "Full Name is required" })}
                type="fullName"
                name="fullName"
                id="fullName"
                className={classNames(
                  errors.fullName ? "border-red-300" : "border-gray-300",
                  "bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                )}
                placeholder="Full Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Registration No
              </label>
              <input
                {...register("regNo", {
                  required: "Registration no is required",
                })}
                type="regNo"
                name="regNo"
                id="regNo"
                className={classNames(
                  errors.regNo ? "border-red-300" : "border-gray-300",
                  "bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                )}
                placeholder="000000"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Department
              </label>
              <input
                {...register("department", {
                  required: "Department no is required",
                })}
                type="department"
                name="department"
                id="department"
                className={classNames(
                  errors.department ? "border-red-300" : "border-gray-300",
                  "bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                )}
                placeholder="SWE"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                {...register("email", { required: "email is required" })}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-90"
              >
                Password
              </label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Role
              </label>
              <select
                {...register("role")}
                defaultValue={"student"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                href="#"
                className="font-medium text-primary-600 hover:cursor-pointer text-indigo-600"
              >
                Login here
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
