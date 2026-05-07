import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Collection from '@/models/Collection';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const query = status && status !== "All" ? { status: status.toLowerCase() } : {};
    
    const collections = await Collection.find(query).sort({ updatedAt: -1 });
    return NextResponse.json({ success: true, data: collections });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    
    if (!body.name) return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
    
    // Generate slug
    const slug = body.name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    
    const newCollection = await Collection.create({
      ...body,
      slug
    });
    
    return NextResponse.json({ success: true, data: newCollection }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
