import {Conversation} from '@/shared/structure';
import {get, post, doDelete} from '@/shared/fetch';

interface GetConversationsDto {
    applicationId: string;
}

export const getConversation = (id: string) => get<unknown, Conversation>(
    `/api/v1/conversations/${id}`
);

export const getConversationsByApplicationId = (applicationId: string) => get<GetConversationsDto, Conversation[]>(
    '/api/v1/conversations',
    {applicationId}
);

interface CreateConversationDto {
    applicationId: string;
    prompt?: string;
    user?: string;
}

export const createConversation = ({applicationId, prompt}: CreateConversationDto) => post<CreateConversationDto, any>(
    '/api/v1/conversations',
    {applicationId, prompt}
);

export const deleteConversation = (conversationId: string) => doDelete(
    `/api/v1/conversations/${conversationId}`
);
