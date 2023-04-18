import { CreateApplicaitonDto, saveApplicationToDb } from "@/service/applicaiton";
import { get } from "@/shared/fetch";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const data = await get(`http://localhost:3002/api/v1/applications/`)
    return NextResponse.json({
        data,
        message: 'success'
    });
}

export async function POST(request: NextRequest) {
    const requestBody = await request.json() as CreateApplicaitonDto;
    const data = await saveApplicationToDb(requestBody)
    return NextResponse.json({data});
}