import {Message} from '@/shared/structure';
import {get, post} from '@/shared/fetch';
import {CreateMessageDto} from '@/service/message';

export const getMessagesByConversationId = async (conversationId: string | null) => {

    if (!conversationId) {
        return [];
    }
    return get<unknown, Message[]>('/api/v1/messages', {conversationId});
};

export const createMessage = (message: CreateMessageDto) =>
    post<CreateMessageDto, {content: string}>('/api/v1/messages', message);
