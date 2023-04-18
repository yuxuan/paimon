import { Message } from "@/shared/structure";

interface ConversationStore {
    [conversationId: string] : Message[];
}

// 这个应该用queue做

let conversations: ConversationStore = {};

export const getConversationsFromStore = (conversationId: string) => {
    return conversations[conversationId];
}

export const createMessagesToConversation = (conversationId: string, messages: Message[]) => {
    conversations[conversationId] = messages;
}

export const updateMessageToConversation = (conversationId: string, message: Message) => {
    if (!conversations[conversationId]) {
        createMessagesToConversation(conversationId, [message]);
    }
    else {
        conversations[conversationId].push(message);
    }
}

export const cleanMessagesFromConversation = (conversationId: string) => {
    delete conversations[conversationId];
}

export const Logger = {
    printAllConversations(){
        console.log(conversations);
    }
}