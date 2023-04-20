import {Message} from '@/shared/structure';
import {get, post} from '@/shared/fetch';
import {CreateMessageDto} from '@/service/message';

export const getMessagesByConversationId = async (conversationId: string | null) => {

    if (!conversationId) {
        return [];
    }
    return get<unknown, Message[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/messages`, {conversationId});
};

export const createMessage = (message: CreateMessageDto) =>
    post<CreateMessageDto, {content: string}>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/messages`, message);
