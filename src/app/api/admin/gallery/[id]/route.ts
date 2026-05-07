import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    const updatedItem = await Gallery.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    
    if (!updatedItem) {
      return NextResponse.json({ success: false, error: "Asset not found" }, { status: 404 });
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
    await dbConnect();
    const { id } = await params;
    const deletedItem = await Gallery.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return NextResponse.json({ success: false, error: "Asset not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: deletedItem });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
