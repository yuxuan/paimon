import {NextRequest, NextResponse} from 'next/server';
import {get} from '@/shared/fetch';
import {initOpenAi} from '@/service/chatgpt';

export async function GET(request: NextRequest, params: {params: {id: string}}) {
    const {id} = params.params;
    const data = await get(`${process.env.SERVICE_BASE_URL}/api/v1/applications/${id}`) as any;
    const response = NextResponse.json({data});

    if (data.type === 'gpt') {
        initOpenAi(data.accessToken);
    }

    response.cookies.set('token', data.accessToken);
    return response;
}
