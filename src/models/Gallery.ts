import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  slug: string;
  imageUrl: string;
  publicId: string;
  category: string;
  tags: string[];
  description?: string;
  altText?: string;
  size?: string;
  uploadedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema<IGallery>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  category: { type: String, required: true, index: true },
  tags: { type: [String], default: [] },
  description: { type: String },
  altText: { type: String },
  size: { type: String },
  uploadedBy: { type: String, default: "Admin" },
}, {
  timestamps: true
});

export default models.Gallery || model<IGallery>('Gallery', GallerySchema);
