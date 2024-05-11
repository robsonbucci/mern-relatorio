import mongoose from "mongoose";
import User from "./user.model.js";

const publisherSchema = new mongoose.Schema(
  {
    phone: { type: Number, unique: true },
  },
  { timestamps: true },
);

const Publisher = User.discriminator("publisher", publisherSchema);

export default Publisher;
