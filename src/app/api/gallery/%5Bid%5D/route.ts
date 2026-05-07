import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import cloudinary from '@/lib/cloudinary';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const updatedItem = await Gallery.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return NextResponse.json({ success: false, error: 'Asset not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const item = await Gallery.findById(id);
    if (!item) {
      return NextResponse.json({ success: false, error: 'Asset not found' }, { status: 404 });
    }

    // Delete from Cloudinary
    if (item.publicId) {
      console.log('=> Deleting from Cloudinary:', item.publicId);
      await cloudinary.uploader.destroy(item.publicId);
    }

    // Delete from MongoDB
    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Asset deleted successfully' });
  } catch (error: any) {
    console.error('=> Delete Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
