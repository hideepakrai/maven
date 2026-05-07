import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IFolder extends Document {
  name: string;
  itemCount: number;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const FolderSchema = new Schema<IFolder>({
  name: { type: String, required: true, unique: true },
  itemCount: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
}, {
  timestamps: true
});

export default models.Folder || model<IFolder>('Folder', FolderSchema);
