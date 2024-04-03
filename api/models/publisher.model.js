import mongoose from 'mongoose';

// Esquema para a tabela 'user'
const publisherSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    designation: { type: String, required: true },
    secondName: { type: String, required: true },
  },
  { timestamps: true, dropDups: true }
);

publisherSchema.index({ firstName: 1, secondName: 1, phone: 1 }, { unique: true });

const Publisher = mongoose.model('Publisher', publisherSchema);
export default Publisher;
