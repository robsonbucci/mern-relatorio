import mongoose from 'mongoose';
// Esquema para a tabela 'admin'
const adminSchema = new mongoose.Schema(
  {
    adminMaster: { type: Boolean, required: true },
    adminFirstName: { type: String, required: true },
    adminSecondName: { type: String, required: true },
    adminCongregationId: { type: Number, required: true },
    adminPhone: { type: Number, required: true, unique: true },
  },
  { timestamps: true }
);

adminSchema.index({ adminCongregationId: 1, adminMaster: 1 }, { unique: true });

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
