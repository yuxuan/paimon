import {Message} from '@/shared/structure';

interface ConversationStore {
    [conversationId: string]: Message[];
}

// 这个应该用queue做

const conversations: ConversationStore = {};

export const getConversationsFromStore = (conversationId: string) => {
    return conversations[conversationId];
};

export const createMessagesToConversation = (conversationId: string, messages: Message[]) => {
    conversations[conversationId] = messages;
};

export const updateMessageToConversation = (conversationId: string, message: Message) => {
    if (conversations[conversationId]) {
        conversations[conversationId].push(message);
    }
    else {
        createMessagesToConversation(conversationId, [message]);
    }
};

export const cleanMessagesFromConversation = (conversationId: string) => {
    delete conversations[conversationId];
};

export const Logger = {
    printAllConversations() {
        // eslint-disable-next-line no-console
        console.log(conversations);
    },
};
