import mongoose from 'mongoose';

// Esquema para a tabela 'user'
const publisherSchema = new mongoose.Schema(
  {
    publisherFirstName: { type: String, required: true },
    publisherSecondName: { type: String, required: true },
    publisherDesignation: { type: String, required: true },
    publisherPhone: { type: Number, required: true, unique: true },
    publisherAdminId: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  },
  { timestamps: true }
);

const Publisher = mongoose.model('Publisher', publisherSchema);
export default Publisher;
