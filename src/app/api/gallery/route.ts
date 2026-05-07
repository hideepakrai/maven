import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import cloudinary from '@/lib/cloudinary';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};

const formatSize = (bytes: number) => {
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const altText = formData.get('altText') as string;
    const description = formData.get('description') as string;
    const tagsStr = formData.get('tags') as string;
    const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(t => t !== "") : [];

    if (!file) {
      console.error("=> Upload Failed: No file found in FormData");
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    // Generate Slug
    let slug = title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    
    // Check if slug exists, if so append random string
    const existing = await Gallery.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
    }

    // Convert file to base64 for Cloudinary server-side upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    console.log(`=> Deploying [${title}] to Cloudinary...`);
    const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
      folder: 'maven-production-gallery',
      resource_type: 'auto',
    });

    console.log(`=> Saving [${title}] to MongoDB...`);
    const newItem = await Gallery.create({
      title,
      slug,
      imageUrl: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      category,
      altText: altText || title,
      tags,
      description,
      size: formatSize(file.size),
      uploadedBy: "Studio Admin"
    });

    console.log("=> Asset successfully committed:", newItem._id);
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error: any) {
    console.error('=> Critical Upload Failure:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Server error during asset deployment' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const items = await Gallery.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    console.error('=> Fetch Failure:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
