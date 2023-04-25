import {NextRequest, NextResponse} from 'next/server';
import queryString from 'query-string';
import {getMessagesByConversationId, saveMessageToDb} from '@/service/message';
import {chat} from '@/service/yiyan/chat';
import {chat as gptChat} from '@/service/chatgpt';
import {ServerResponse} from '@/shared/basicTypes';
import {RoleConst} from '@/shared/structure';
import {
    Logger,
    getConversationsFromStore,
    createMessagesToConversation,
    updateMessageToConversation,
} from '@/store/message';

export const GET = async (request: NextRequest) => {
    const {query} = queryString.parseUrl(request.url);
    const conversationId = query.conversationId as string;
    if (!conversationId) {
        return NextResponse.json({
            data: [],
            message: 'no conversation id',
        });
    }
    const data = await getMessagesByConversationId(conversationId);

    createMessagesToConversation(conversationId, data);

    Logger.printAllConversations();

    const response: ServerResponse = {data};
    return NextResponse.json(response);
};

export const POST = async (request: NextRequest) => {
    const token = request.cookies.get('token')?.value;
    const requestBody = await request.json();
    const {content, conversationId, role, applicationId, applicationType} = requestBody;

    if (!token) {
        return NextResponse.json({message: `no token ${applicationId}`}, {
            status: 401,
        });
    }

    const message = {content, role, conversationId};

    updateMessageToConversation(conversationId, message);

    saveMessageToDb(message);

    let data = null;
    let replyMessage = null;

    if (applicationType === 'gpt') {
        data = await gptChat({token, messages: getConversationsFromStore(conversationId)});
        replyMessage = {content: data.choices[0].message.content, role: RoleConst.ASSISTANT, conversationId};
    }
    else {
        data = await chat({token, messages: getConversationsFromStore(conversationId)});
        replyMessage = {content: data.result, role: RoleConst.ASSISTANT, conversationId};
    }

    // eslint-disable-next-line no-console
    console.log('reply data', data);
    updateMessageToConversation(conversationId, replyMessage);

    saveMessageToDb(replyMessage);

    const response: ServerResponse = {data: replyMessage};
    return NextResponse.json(response);
};
