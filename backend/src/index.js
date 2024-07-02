import connectDB from "./db/connectDB.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongo DB connection failed", error);
  });

app.get("/", (req, res) => {
  res.status(200).json("ok");
});
