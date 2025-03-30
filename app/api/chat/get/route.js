import connectDB from "@/config/db.js";
import Chat from "@/models/chat.js";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        const {userId} = getAuth(req);
        if(!userId){
            return NextResponse.json({success:false,message:"User not authenticated"})
        }

        // connect database and fetch all chats for the user
        await connectDB();
        const data = await Chat.find({userId});


        return NextResponse.json({success:true,data});
    } catch (error) {
        return NextResponse.json({success:false,message:error.message});
    }
}