import { HttpMethod } from "@/app/Const/HttpMethod";
import { BaseConnection } from "@/app/Functions/Connection/BaseConnection";
import { NextResponse } from "next/server";

export async function POST(Request: Request) {
    try {
        const { email, password } = await Request.json();

    if(!email || !password){
         throw new Error("Invalid email or password");
    }

    const response = await BaseConnection({
        method: HttpMethod.POST,
        route: '/api/auth/login',
        data: { email, password},
        useAuth: false
    })

    return NextResponse.json(response, {status: 200})
    } catch (error) {
        NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}