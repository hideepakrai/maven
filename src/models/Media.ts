import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IMedia extends Document {
  name: string;
  slug: string;
  url: string;
  publicId: string;
  type: "image" | "video" | "pdf" | "blueprint" | "document";
  size: string;
  folder: string; // Folder name or ID
  dimensions?: string;
  altText?: string;
  tags: string[];
  description?: string;
  uploadedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMedia>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["image", "video", "pdf", "blueprint", "document"], 
    required: true,
    index: true
  },
  size: { type: String, required: true },
  folder: { type: String, default: "Projects", index: true },
  dimensions: { type: String },
  altText: { type: String },
  tags: { type: [String], default: [] },
  description: { type: String },
  uploadedBy: { type: String, default: "Admin" },
}, {
  timestamps: true
});

export default models.Media || model<IMedia>('Media', MediaSchema);
