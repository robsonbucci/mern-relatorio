import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userType: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/mern-relatorio.appspot.com/o/user-128.png?alt=media&token=cb057f95-2b74-4a4f-ad91-f03a890317ef",
    },
    congregationIdentity: { type: Number, required: true },
    congregationName: { type: String, required: true },
    congregationGroup: { type: String, required: true },
    isSecretary: { type: Boolean, default: false },
    privilege: { type: String, default: 0 },
    superintendent: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      superintendentName: { type: String },
    },
  },
  { timestamps: true, dropDups: true }
);
userSchema.index({ username: 1, email: 1 }, { unique: true });
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
  }
);

const User = mongoose.model("User", userSchema);
export default User;
