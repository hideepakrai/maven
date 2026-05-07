import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Media from '@/models/Media';
import Folder from '@/models/Folder';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const name = formData.get('name') as string || file.name;
    const folderName = formData.get('folder') as string || "Projects";
    
    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    // Generate Slug
    let slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    const existing = await Media.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
    }

    // Convert file to base64 for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
      folder: `maven-studio-media/${folderName}`,
      resource_type: 'auto',
    });

    // Format Size
    const formatSize = (bytes: number) => {
      const kb = bytes / 1024;
      if (kb < 1024) return `${kb.toFixed(1)} KB`;
      return `${(kb / 1024).toFixed(1)} MB`;
    };

    // Determine type
    let type: any = "document";
    if (file.type.startsWith("image/")) type = "image";
    else if (file.type.startsWith("video/")) type = "video";
    else if (file.type === "application/pdf") type = "pdf";
    else if (name.toLowerCase().endsWith(".blueprint") || name.toLowerCase().includes("plan")) type = "blueprint";

    const newItem = await Media.create({
      name,
      slug,
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      type,
      size: formatSize(file.size),
      folder: folderName,
      dimensions: uploadResponse.width ? `${uploadResponse.width} x ${uploadResponse.height}` : undefined,
      uploadedBy: "Admin"
    });

    // Update folder count
    await Folder.findOneAndUpdate(
      { name: folderName },
      { $inc: { itemCount: 1 }, lastUpdated: new Date() },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error: any) {
    console.error('=> Media Upload Failure:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get('folder');
    const query = folder && folder !== "All" ? { folder } : {};
    
    const items = await Media.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
