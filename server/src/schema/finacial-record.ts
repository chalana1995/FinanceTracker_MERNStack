import mongoose from "mongoose";

interface FinacialRecord {
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}

const financialRecordSchema = new mongoose.Schema<FinacialRecord>({
   userId: {type: String},
   date: {type: Date, required: true},
   description: {type: String, required: true},
   amount: {type: Number, required: true},
   category: {type: String, required: true},
   paymentMethod: {type: String, required: true},
});

const FinancialRecordModel = mongoose.model<FinacialRecord>("FinancialRecord",financialRecordSchema);

export default FinancialRecordModel;