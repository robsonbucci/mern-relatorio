import mongoose from 'mongoose';

// Esquema para a tabela 'ministery'
const ministerySchema = new mongoose.Schema(
  {
    ministeryObservation: { type: String },
    ministeryAno: { type: Number, required: true },
    ministeryMes: { type: Number, required: true },
    ministeryHour: { type: Number, required: true },
    ministeryStudy: { type: Number, required: true },
    ministeryParticipation: { type: Boolean, required: true },
    ministeryUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Ministery = mongoose.model('Ministery', ministerySchema);
export default Ministery;
