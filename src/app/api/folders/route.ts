import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Folder from '@/models/Folder';
import Media from '@/models/Media';

export async function GET() {
  try {
    await connectDB();
    
    // Ensure default folders exist if none found
    const count = await Folder.countDocuments();
    if (count === 0) {
      const defaults = [
        "Projects", "Gallery Assets", "Blueprints", "Studio Documents", 
        "Client Presentations", "Team Assets", "Temporary Uploads"
      ];
      await Folder.insertMany(defaults.map(name => ({ name, itemCount: 0 })));
    }

    const folders = await Folder.find({}).sort({ name: 1 });
    return NextResponse.json({ success: true, data: folders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name } = await req.json();
    
    if (!name) return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });

    const newFolder = await Folder.create({ name });
    return NextResponse.json({ success: true, data: newFolder }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
