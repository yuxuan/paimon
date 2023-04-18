import {NextRequest, NextResponse} from 'next/server';
import queryString from 'query-string';
import {SaveConversationDto, saveConversationToDb} from '@/service/conversation';
import {ServerResponse} from '@/shared/basicTypes';
import {get} from '@/shared/fetch';
import {createMessagesToConversation} from '@/store/message';

export const GET = async (request: NextRequest) => {
    const {query} = queryString.parseUrl(request.url);
    const queryUrl = query ? `?${queryString.stringify(query)}` : '';
    const data = await get(
        `http://localhost:3002/api/v1/conversations${queryUrl}`,
        {},
        {next: {revalidate: 0}}
    );
    const response: ServerResponse = {data};
    return NextResponse.json(response);
};

export const POST = async (request: NextRequest) => {
    const requestBody = await request.json() as SaveConversationDto;

    const data = await saveConversationToDb(requestBody);

    createMessagesToConversation(data.conversationId, []);

    const response: ServerResponse = {data};
    return NextResponse.json(response);
};
