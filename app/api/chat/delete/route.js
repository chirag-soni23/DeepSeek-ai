import connectDB from "@/config/db.js";
import Chat from "@/models/chat.js";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const { chatId } = await req.json();

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    // connect databse and delete the chat
    await connectDB();
    await Chat.deleteOne({_id:chatId,userId});
    return NextResponse.json({success:true,message:"Chat Deleted"})

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
