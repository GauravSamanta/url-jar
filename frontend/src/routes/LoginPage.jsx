import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas/loginSchema.js";
import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { UserContext } from "../utils/AuthContext.jsx";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/v1/users/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);
      if (response.data.success) {
        console.log(user);
        navigate("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error Login user:", error);
      // Handle error, show error message, etc.
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex justify-center ">
      <Card
        color="transparent"
        shadow={true}
        className="max-w-[40rem] items-center p-10"
      >
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your credentials to login.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Username
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("username")}
            />
            {errors.username && <p>{errors.username.message}</p>}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("email")}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="current-password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("password")}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <Button className="mt-6" fullWidth type="submit">
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link className="font-medium text-gray-900">Register</Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
