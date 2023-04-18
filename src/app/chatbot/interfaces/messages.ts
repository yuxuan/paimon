import {Message} from '@/shared/structure';
import {get, post} from '@/shared/fetch';
import {CreateMessageDto} from '@/service/message';

export const getMessagesByConversationId = async (conversationId: string | null) => {

    if (!conversationId) {
        return [];
    }
    return get<unknown, Message[]>('http://localhost:3000/api/v1/messages', {conversationId});
};

export const createMessage = (message: CreateMessageDto) => post<CreateMessageDto, {content: string}>('http://localhost:3000/api/v1/messages', message);
