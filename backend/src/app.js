const express = require("express");
const app = express();
const connectDB = require("./config/database");
const userRouter = require("./Routes/user");
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json())
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(PORT, () => {
      console.log("Server listening on port", +PORT);
    });
  })
  .catch((err) => {
    console.log(`Error occured in connecting to database ${err}`);
  });
