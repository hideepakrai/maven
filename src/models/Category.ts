import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  color?: string;
  description?: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  color: { type: String },
  description: { type: String }
});

export default models.Category || model<ICategory>('Category', CategorySchema);
