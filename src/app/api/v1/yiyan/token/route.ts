import { NextResponse } from "next/server";
import { getYiyanToken } from '@/service/yiyan/token';

function updateYiyanTokenDB(accessToken: string) {
    const payload = {
        accessToken,
        description: '文心一言'
    }
    fetch(`http://localhost:3002/api/v1/applications/`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// GET 如果能从db获取就不需要新建了
export async function GET(request: Request) {
    const {accessToken} =  await getYiyanToken()
    updateYiyanTokenDB(accessToken)
    return NextResponse.json({data: accessToken});
}

// 需要一个更新token的逻辑