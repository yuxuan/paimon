import { ServerResponse } from "@/shared/basicTypes";
import { doDelete, get } from "@/shared/fetch";
import { cleanMessagesFromConversation } from "@/store/message";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, params: {params: {id: string}}) {
    const {id} = params.params;
    const data = await get(`http://localhost:3002/api/v1/conversations`, {id})
    const response: ServerResponse = {data};
    return NextResponse.json(response);
}

export async function DELETE(request: NextRequest, params: {params: {id: string}}) {
    const {id} = params.params;

    cleanMessagesFromConversation(id)

    const data = await doDelete(`http://localhost:3002/api/v1/conversations/${id}`)

    const response: ServerResponse = {data};
    return NextResponse.json(response);
}