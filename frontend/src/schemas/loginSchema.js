import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required(" username is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});
