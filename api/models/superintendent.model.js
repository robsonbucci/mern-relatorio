import mongoose from "mongoose";
import User from "./user.model.js";

const superintendentSchema = new mongoose.Schema(
  {
    isSecretary: { type: Boolean },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    avatar: { type: String },
    congregationIdentity: { type: Number, required: true },
  },
  { timestamps: true },
);

const Superintendent = User.discriminator(
  "superintendent",
  superintendentSchema,
);

export default Superintendent;
