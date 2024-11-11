import { useForm } from "react-hook-form";

export const Registration = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleRegister = (value) => {
    console.log(value);
  };

  return (
    <section className="bg-white flex">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Username"
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