import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userType: { type: String, default: "superintendente" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, unique: true },
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    avatar: { type: String },
    congregationIdentity: { type: Number, required: true },
    congregationName: { type: String, required: true },
    congregationGroup: { type: String, required: true },
    isSecretary: { type: Boolean },
    privilege: { type: String, default: 0 },
    superintendent: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      superintendentName: { type: String },
    },
  },
  { timestamps: true, dropDups: true },
);
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ firstName: 1, lastName: 1 }, { unique: true });
userSchema.index(
  {
    congregationIdentity: 1,
    isSecretary: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      isSecretary: true,
    },
  },
);

const User = mongoose.model("User", userSchema);
export default User;
