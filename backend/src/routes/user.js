const express = require("express");
const User = require("../models/user");
const userRouter = express.Router();

userRouter.post("/user", async (req, res) => {
  try {
    const { firstName, lastName, interest, age, email, mobile } = req.body;

    const user = new User({
      firstName,
      lastName,
      interest,
      age,
      email,
      mobile,
    });
    await user.save();
    res.json({ message: "User added successfully", data: user });
  } catch (error) {
    res.status(400).send("Errror:" + error.message);
  }
});
module.exports = userRouter;
