import { get } from "@/shared/fetch";
import { Application } from "@/shared/structure";
import {initOpenAi} from '@/service/chatgpt';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, params: {params: {id: string}}) {
    const {id} = params.params;
    const data = await get(`http://localhost:3002/api/v1/applications/${id}`) as Application
    const response = NextResponse.json({data})

    if (data.type === 'gpt') {
        initOpenAi(data.accessToken);
    }

    response.cookies.set('token', data.accessToken);
    return response;
}