import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    privilege: { type: String, default: 0 },
    congregationIdentity: { type: Number, required: true },
    congregationName: { type: String, required: true },
    congregationGroup: { type: String, required: true },
    superintendent: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Superintendent",
      },
      name: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
