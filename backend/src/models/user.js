const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 1,
      maxLength: 50,
    },
    interest: {
      type: [String],
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 100,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      maxLength: 70,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
