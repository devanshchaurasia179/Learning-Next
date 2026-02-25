import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(request:NextRequest){
    try{
       const {email,password}=await request.json();

       if(!email || !password){
        return NextResponse.json(
            {error:"Email and password are Required"},
            {status:400}
        )
       }

       await connectToDatabase();

       const existingUser = await User.findOne({email})
       if(existingUser){
        return NextResponse.json(
            {error:"User Already Exist"},
            {status:400}
        )
       }

       await User.create({
        email,
        password
       })
       return NextResponse.json(
            {error:"User registered Successfully"},
            {status:201}
        )
    }catch(error){
        console.error("Registration error",error)
        return NextResponse.json(
            {error:"Failed to Register User"},
            {status:400}
        )
    }
}