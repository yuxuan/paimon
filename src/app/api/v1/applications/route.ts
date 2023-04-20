import {NextRequest, NextResponse} from 'next/server';
import {CreateApplicationDto, saveApplicationToDb} from '@/service/applicaiton';
import {get} from '@/shared/fetch';

export async function GET() {
    const data = await get(`${process.env.SERVICE_BASE_URL}/api/v1/applications/`);
    return NextResponse.json({
        data,
        message: 'success',
    });
}

export async function POST(request: NextRequest) {
    const requestBody = await request.json() as CreateApplicationDto;
    const data = await saveApplicationToDb(requestBody);
    return NextResponse.json({data});
}
