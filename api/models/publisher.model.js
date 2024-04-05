import mongoose from "mongoose";

// Esquema para a tabela 'user'
const publisherSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    status: { type: String, default: "ativo" },
    gender: { type: String, required: true },
    privilege: { type: String, require: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    userType: { type: String, default: "publicador" },
    superintendent: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      superintendentName: { type: String },
    },
  },
  { timestamps: true, dropDups: true },
);

publisherSchema.index({ firstName: 1, lastName: 1, phone: 1 }, { unique: true });

const Publisher = mongoose.model("Publisher", publisherSchema);
export default Publisher;
