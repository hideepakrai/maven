import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ICollection extends Document {
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  mediaItems: string[]; // IDs of Media items in order
  status: "published" | "draft";
  showOn: ("homepage" | "portfolio" | "services" | "about")[];
  tags: string[];
  seo: {
    title?: string;
    description?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema = new Schema<ICollection>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  coverImage: { type: String },
  mediaItems: { type: [String], default: [] }, // Preserves order
  status: { type: String, enum: ["published", "draft"], default: "draft", index: true },
  showOn: { 
    type: [String], 
    enum: ["homepage", "portfolio", "services", "about"],
    default: [] 
  },
  tags: { type: [String], default: [] },
  seo: {
    title: { type: String },
    description: { type: String }
  }
}, {
  timestamps: true
});

export default models.Collection || model<ICollection>('Collection', CollectionSchema);
