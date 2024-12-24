import mongoose, { Schema, Document } from 'mongoose';

interface URL extends Document {
  original_url: string;
  slug: string;
  visits: number;
  visitTimestamps: [Date];
  created_at: Date;
}

const URLSchema = new Schema<URL>({
  original_url: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  visits: { type: Number, default: 0 },
  visitTimestamps: { type: [Date], defalt: [] },
  created_at: { type: Date, default: Date.now },
});

const URLModel = mongoose.model('URL', URLSchema);
export default URLModel;
