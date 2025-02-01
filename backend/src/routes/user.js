const express = require("express");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const validateUser = require("../utils/validation");
const userRouter = express.Router();

//create a user
userRouter.post("/user", validateUser, async (req, res) => {
  //payload validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
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
    res
      .status(400)
      .send("Something went wrong when creating a user:" + error.message);
  }
});

//fetch all users
userRouter.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ data: users });
  } catch (error) {
    res.status(400).send("Something went wrong when fetching all users");
  }
});

//fetch one user
userRouter.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status((404).json({ message: "User not found" }));
    }
    res.json(user);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong when fetching the user", error });
  }
});

module.exports = userRouter;
