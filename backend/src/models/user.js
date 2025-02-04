const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      minLength: 1,
      maxLength: 50,
      trim: true,
      required: true,
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
      validate: {
        validator: function(value) {
          return /^\d{10}$/.test(value)
        },
        message : "Invalid phone number"
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      maxLength: 70,
      validate: {
        validator: function(value) {
          return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)
        },
        message : "Invalid Email Id"
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
