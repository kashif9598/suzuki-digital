require('dotenv').config()
const express = require("express");
const app = express();
const connectDB = require("./config/database");
const userRouter = require("./Routes/user");

app.use(express.json())
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(process.env.PORT, () => {
      console.log("Server listening on port", +process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(`Error occured in connecting to database ${err}`);
  });
