import { getMessagesByConversationId, saveMessageToDb } from "@/service/message";
import { chat } from "@/service/yiyan/chat";
import { chat as gptChat } from "@/service/chatgpt";
import { ServerResponse } from "@/shared/basicTypes";
import { Role } from "@/shared/structure";
import { Logger, getConversationsFromStore, createMessagesToConversation, updateMessageToConversation } from "@/store/message";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import queryString from "query-string";

export const GET = async (request: NextRequest) => {
    const {query} = queryString.parseUrl(request.url);
    const conversationId = query.conversationId as string;
    if (!conversationId) {
        return NextResponse.json({
            data: [],
            message: 'no conversation id'
        })
    }
    const data = await getMessagesByConversationId(conversationId)

    createMessagesToConversation(conversationId, data);

    Logger.printAllConversations()

    const response: ServerResponse = {data};
    return NextResponse.json(response);
}

export const POST = async (request: NextRequest) => {
    const token = request.cookies.get('token')?.value;
    console.log(token);

    if (!token) {
        redirect('/no-token')
    }

    const requestBody = await request.json();
    const {content, conversationId, role} = requestBody;
    const message = {content, role, conversationId}
    const applicationType = requestBody.applicationType;

    updateMessageToConversation(conversationId, message)

    saveMessageToDb(message);

    let data, replyMessage;

    if (applicationType === "gpt") {
        data = await gptChat({token, messages: getConversationsFromStore(conversationId)}) as any;
        replyMessage = {content: data.choices[0].message.content, role: Role.ASSISTANT, conversationId};
    }
    else {
        data = await chat({token, messages: getConversationsFromStore(conversationId)});
        replyMessage = {content: data.result, role: Role.ASSISTANT, conversationId};
    }

    console.log('reply data', data);
    updateMessageToConversation(conversationId, replyMessage)

    saveMessageToDb(replyMessage)

    const response: ServerResponse = {data: replyMessage};
    return NextResponse.json(response);
}