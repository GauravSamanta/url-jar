import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas/loginSchema.js";
export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/v1/users/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);
      if (response.data.success) {
        navigate("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error Login user:", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
            {...register("username")}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="john.doe@company.com"
          required
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="•••••••••"
          required
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}
