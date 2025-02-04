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
    if (error.code === 11000) {
      return res
        .status(400)
        .json({error: "User already exists with this email/phone number"});
    }
    res
      .status(500)
      .json({error: "Something went wrong when creating a user"});
  }
});

//fetch all users
userRouter.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    if (users.length == 0) {
      return res.json({ message: "No users found" });
    }
    res.json(users);
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

userRouter.patch("/user/:userId", validateUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.params.userId;
    const existingUser = await User.findById(userId);
    if(!existingUser){
      return res.status(404).json({error: "No User Found"})
    }
    Object.keys(req.body).forEach(
      (field) => (existingUser[field] = req.body[field])
    );
    const updatedUser = await User.findByIdAndUpdate(
      existingUser._id,
      existingUser,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
    res.status(200).json({ message: "Update successfull", data: updatedUser });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

userRouter.delete("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    if (!deletedUser) {
      return res.status(404).json({ message: "User does not exist" });
    }
    res.json(deletedUser);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong when deleting the user", error });
  }
});

module.exports = userRouter;
