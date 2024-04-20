import mongoose from "mongoose";

// Esquema para a tabela ''
const ministrySchema = new mongoose.Schema(
  {
    observation: { type: String },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    hour: { type: Number },
    ldcHour: { type: Number },
    study: { type: Number },
    participated: { type: Boolean, required: true },
    publisher: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      publisherName: { type: String },
    },
  },
  { timestamps: true, collection: "ministry" },
);

ministrySchema.index(
  { "Publisher._id": 1, year: 1, month: 1 },
  { unique: true },
);

const Ministry = mongoose.model("Ministry", ministrySchema);
export default Ministry;
