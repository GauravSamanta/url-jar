import * as yup from "yup";

const urlRegex =
  /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|\d{1,3}(\.\d{1,3}){3})(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-zA-Z\d%_.~+=-]*)?(\#[-a-zA-Z\d_]*)?$/;

export const linkSchema = yup.object().shape({
  longUrl: yup.string().min(4, "Invalid Url").matches(urlRegex, "Invalid Url"),
});
