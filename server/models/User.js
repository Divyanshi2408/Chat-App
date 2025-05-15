import mongoose from "mongoose";
import {genSalt, hash, compare} from "bcryptjs";

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
   lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
   image: {
    type: String,
    required: "false",
    },
    color: {
      type: Number,
      required: "false",
    },
    profileSetup: {
      type: Boolean,
      default: false,
    },
});

User.pre("save", async function (next) {
 const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

const UserSchema = mongoose.model("User", User);

export default UserSchema;
